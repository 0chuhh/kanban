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
    () => columns.map((column) => column.id),
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
    if(selectedColumn && selectedTask){
      let sameColumn = false
      console.log('end',active.id,over?.id)
      let columnId:string|number;
      if(typeof over?.id === 'number'){
         columnId = over?.id
      }
      if(typeof over?.id=== 'string'){
         columnId = over?.id.split(' ')[1]
         sameColumn = true
      }
      console.log('culumnid',over?.id)
      setColumns(prevColumns=>prevColumns.map(column=>{
        if(column.id === Number(columnId)){
          if(sameColumn){
            const oldIndex=column.tasks.findIndex(t=>t.id===Number(active.id.toString().split(' ')[2]))
            const newIndex=column.tasks.findIndex(t=>t.id===Number(over?.id.toString().split(' ')[2]))
            return {...column, tasks: arrayMove(column.tasks, oldIndex, newIndex)}
          }
          return {...column, tasks:[...column.tasks,selectedTask]}
        }
        if(column.id === selectedColumn.id){
          
          return {...column, tasks:column.tasks.filter(t=>t.id !== selectedTask.id)}
        }
        return column
      }))
    }else{
      if (active.id !== over?.id) {
        setColumns((columns) => {
          const oldIndex = columns?.findIndex((c) => c.id === Number(active.id));
          const newIndex = columns?.findIndex((c) => c.id === Number(over?.id));
  
          return arrayMove(columns, oldIndex, newIndex);
        });
      }
    }
    
  }

  const defaultAnnouncements = {
    onDragStart({ active }: Pick<Arguments, "active">) {
      console.log(`Picked up draggable item ${active.id}.`);
      return "";
    },
    onDragOver({ active, over }: Arguments) {
      if (over) {
        console.log(
          `Draggable item ${active.id} was moved over droppable area ${over.id}.`
        );
        return "";
      }

      console.log(`Draggable item ${id} is no longer over a droppable area.`);
    },
    onDragEnd({ active, over }: Arguments) {
      if (over) {
        console.log(
          `Draggable item ${active.id} was dropped over droppable area ${over.id}`
        );
        return "";
      }

      console.log(`Draggable item ${active.id} was dropped.`);
    },
    onDragCancel({ active, over }: Arguments) {
      console.log(
        `Dragging was cancelled. Draggable item ${active.id} was dropped.`
      );
      return "";
    },
  };

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId({
      type: "container",
      id: Number(id),
    });
    if (typeof id === "number") {
      setSelectedTask(undefined);
      setSelectedColumn(columns.find((c) => c.id === id));
    }
    if (typeof id === "string") {
      const columnId = id.split(" ")[1];
      setSelectedColumn(columns.find((c) => c.id === Number(columnId)));
      const taskId = id.split(" ")[2];
      setSelectedTask(
        columns
          .find((c) => c.id === Number(columnId))
          ?.tasks.find((t) => t.id === Number(taskId))
      );
    }
    console.log("start", typeof id, id);
  }

  // function handleDragOver(event: DragOverEvent) {
  //   const { active, over } = event;
  //   const { id } = active;
  //   const overId = over?.id;

  //   console.log(columns.find((c) => c.id == overId));
  // }
  useEffect(() => {
    if (id) getColumnsByBoardId(id);
  }, [id]);
  return (
    <DndContext
      accessibility={{ announcements: defaultAnnouncements }}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      collisionDetection={closestCenter}
      // onDragOver={handleDragOver}
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
            <Column key={column.id} column={column} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {selectedTask && selectedColumn ? (
          <Task key={`task ${selectedColumn.id} ${selectedTask.id}`} columnId={selectedColumn.id} task={selectedTask} />
        ) : selectedColumn ? (
          <Column column={selectedColumn} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardDetails;
