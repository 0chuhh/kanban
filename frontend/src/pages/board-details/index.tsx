import { IBoard } from "models/IBoard";
import { IColumn } from "models/IColumn";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import api from "services/api";
import {
  Active,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  Over,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "./column";
import { Arguments } from "@dnd-kit/core/dist/components/Accessibility/types";
import { ITask } from "models/ITask";
import Task from "./task";

const BoardDetails = () => {
  const id = useParams().id;
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [activeId, setActiveId] = useState<{
    id: number;
    type: "container" | "task";
  }>();
  const [selectedColumn, setSelectedColumn] = useState<IColumn>();
  const [selectedTask, setSelectedTask] = useState<ITask>();
  const columnIds = useMemo(
    () => columns.map((column) => column.position),
    [columns]
  );
  const getColumnsByBoardId = async (id: string) => {
    const columns: IColumn[] = await api.columns.getColumnsByBoard(id);
    setColumns(columns);
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (selectedColumn && selectedTask) {
      if (typeof over?.id === "string" && typeof active.id === "string") {
        const overId = over.id.split(" ")[2];
        const activeId = active.id.split(" ")[2];

        if (active.id !== over.id) {
          setColumns((prevColumns) =>
            prevColumns.map((column) => {
              if (column.id === selectedColumn.id) {
                const oldIndex = column.tasks.findIndex(
                  (t) => t.id === Number(activeId)
                );
                const newIndex = column.tasks.findIndex(
                  (t) => t.id === Number(overId)
                );
                return {
                  ...column,
                  tasks: arrayMove(column.tasks, oldIndex, newIndex),
                };
              }
              return column;
            })
          );
        }
      }
    } else {
      if (active.id !== over?.id) {
        setColumns((columns) => {
          const oldIndex = columns?.findIndex(
            (c) => c.id === Number(active.id)
          );
          const newIndex = columns?.findIndex((c) => c.id === Number(over?.id));

          return arrayMove(columns, oldIndex, newIndex);
        });
      }
    }
  }

  // const defaultAnnouncements = {
  //   onDragStart({ active }: Pick<Arguments, "active">) {
  //     console.log(`Picked up draggable item ${active.id}.`);
  //     return "";
  //   },
  //   onDragOver({ active, over }: Arguments) {
  //     if (over) {
  //       console.log(
  //         `Draggable item ${active.id} was moved over droppable area ${over.id}.`
  //       );
  //       return "";
  //     }

  //     console.log(`Draggable item ${id} is no longer over a droppable area.`);
  //   },
  //   onDragEnd({ active, over }: Arguments) {
  //     if (over) {
  //       console.log(
  //         `Draggable item ${active.id} was dropped over droppable area ${over.id}`
  //       );
  //       return "";
  //     }

  //     console.log(`Draggable item ${active.id} was dropped.`);
  //   },
  //   onDragCancel({ active, over }: Arguments) {
  //     console.log(
  //       `Dragging was cancelled. Draggable item ${active.id} was dropped.`
  //     );
  //     return "";
  //   },
  // };

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId({
      type: "container",
      id: Number(id),
    });

    //==========if column=============//
    if (typeof id === "number") {
      setSelectedTask(undefined);
      setSelectedColumn(columns.find((c) => c.position === id));
    }
    //==========if task=============//

    if (typeof id === "string") {
      const columnId = id.split(" ")[1];
      setSelectedColumn(columns.find((c) => c.id === Number(columnId)));
      const taskId = id.split(" ")[2];
      setSelectedTask(
        columns
          .find((c) => c.id === Number(columnId))
          ?.tasks.find((t) => t.position === Number(taskId))
      );
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    const overId = over?.id;
    const activeId = active.id;

    console.log(overId, active.id);

    //==========if task hovered task=============//
    //*
    if (typeof overId === "string" && typeof activeId === "string") {
      const activeTaskPosition = Number(activeId.split(" ")[2]); //====draggable task====//

      const overColumnID = Number(overId.split(" ")[1]); //====hovered column id====//

      const overTaskPosition = Number(overId.split(" ")[2]); //====hovered task position====//

      //============if dragging in the same column and draggable task is not hovered task==============//
      //*
      if (
        selectedColumn?.id === overColumnID &&
        overTaskPosition !== selectedTask?.position
      ) {
        setColumns((prevColumns) =>
          prevColumns.map((column) => {
            if (column.id === selectedColumn.id) {
              const oldIndex = column.tasks.findIndex(
                (t) => t.position === activeTaskPosition
              );
              const newIndex = column.tasks.findIndex(
                (t) => t.position === overTaskPosition
              );
              return {
                ...column,
                tasks: arrayMove(column.tasks, oldIndex, newIndex),
              };
            }
            return column;
          })
        );
      }
      //*
      //============if dragging in the same column and draggable task is not hovered task==============//

      if(selectedColumn?.id !== overColumnID){
        console.log(over?.id, active.id , 'over')

        if(selectedColumn && selectedTask){
          
          setSelectedColumn(columns[overColumnID])
          setColumns((prevColumns) =>
          prevColumns.map((column) => {
            if (column.id === selectedColumn?.id) {
              return {
                ...column,
                tasks: column.tasks.filter((t) => t.id !== selectedTask?.id),
              };
            }
            if(column.id === overColumnID){
              console.log(column.tasks.slice(0, overTaskPosition-1),column.tasks.slice(overTaskPosition-1, column.tasks.length))
              return{
                ...column,
                tasks:[
                  ...column.tasks.slice(0, overTaskPosition-1), 
                  selectedTask,
                  ...column.tasks.slice(overTaskPosition-1, column.tasks.length)
                ]
              }
            }
            return column;
          }))
          return;
        }
        
      }
    }
    //*
    //==========if task hovered task=============//

    //==========if task hovered column=============//
    //*
    if (typeof overId === "number" && selectedTask) {
      //==========if task hovered same column=============//
      //*
      if (selectedColumn?.position === overId) {

      } else {
        
        // setColumns((prevColumns) =>
        //   prevColumns.map((column) => {
        //     if (column.id === selectedColumn?.id) {
        //       return {
        //         ...column,
        //         tasks: column.tasks.filter((t) => t.id !== selectedTask?.id),
        //       };
        //     }
        //     if(column.id === overId){
        //       return{
        //         ...column,
        //         tasks:[
        //           ...column.tasks.slice(0, selectedTask.position), 
        //           selectedTask]
        //       }
        //     }
        //     return column;
        //   })
        // );
      }
      //*
      //==========if task hovered same column=============//
    }
    //*
    //==========if task hovered column=============//

    // if (active.id !== over?.id && typeof overId === 'number' && overId !== selectedColumn?.id){
    //   setColumns(prevColumns=>prevColumns.map(column=>{
    //     if(column.id === selectedColumn?.id){
    //       return {...column, tasks:column.tasks.filter(t=>t.id !== selectedTask?.id)}
    //     }
    //     return column
    //   }))
    // }
  }
  useEffect(() => {
    if (id) getColumnsByBoardId(id);
  }, [id]);
  return (
    <DndContext
      // accessibility={{ announcements: defaultAnnouncements }}
      // onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <SortableContext
        strategy={horizontalListSortingStrategy}
        items={columnIds}
      >
        <div
          className="container d-flex"
          style={{ gap: "10px", height: "100%" }}
        >
          {columns.map((column) => (
            <Column key={column.position} column={column} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {selectedTask && selectedColumn ? (
          <Task
            key={`task ${selectedColumn.id} ${selectedTask.id}`}
            columnId={selectedColumn.id}
            task={selectedTask}
          />
        ) : selectedColumn ? (
          <Column column={selectedColumn} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardDetails;
