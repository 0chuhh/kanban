import { IBoard } from "models/IBoard";
import { IColumn } from "models/IColumn";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import api from "services/api";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "./column";
import { ITask } from "models/ITask";
import Task from "./task";

const BoardDetails = () => {
  const id = useParams().id;
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<IColumn>();
  const [selectedTask, setSelectedTask] = useState<ITask>();
  const columnIds = useMemo(
    () => columns.map((column) => column.title),
    [columns]
  );
  const getColumnsByBoardId = async (id: string) => {
    const columns: IColumn[] = await api.columns.getColumnsByBoard(id);
    setColumns(columns);
  };
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (selectedColumn && selectedTask) {
      //====if dropped task====//
      //*
      if (typeof over?.id !== "string" && typeof active.id !== "string") {
        const activeColumnID = findColumn(active.id);
        const overColumnID = findColumn(over?.id);
        const activeColumn = columns.find((c) => c.id === activeColumnID);
        const overColumn = columns.find((c) => c.id === overColumnID);

        let activeIndex = activeColumn?.tasks.findIndex(
          (t) => t.id === active.id
        );

        let overIndex = overColumn?.tasks.findIndex((t) => t.id === over?.id);

        if (overIndex === -1) overIndex = overColumn?.tasks.length;

        if (active.id !== over?.id && activeColumnID === overColumnID) {
          setColumns((prevColumns) =>
            prevColumns.map((column) => {
              if (column.id === overColumnID) {
                return {
                  ...column,
                  tasks: arrayMove(
                    column.tasks,
                    Number(activeIndex),
                    Number(overIndex)
                  ),
                };
              }
              return column;
            })
          );
        }
      }
      //*
      //====if dropped task====//
    }
    //====if dropped column====//
    //*
    else {
      if (active.id !== over?.id) {
        setColumns((columns) => {
          const oldIndex = columns?.findIndex((c) => c.title === active.id);
          const newIndex = columns?.findIndex((c) => c.title === over?.id);

          return arrayMove(columns, oldIndex, newIndex);
        });
      }
    }
    //*
    //====if dropped column====//
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

  const findColumn = (id: string | number | undefined) => {
    //====if column id in params===//
    if (typeof id === "string") {
      return columns.find((c) => c.title === id)?.id;
    }

    //====if task id in params===//
    else if (typeof id === "number") {
      return columns.find((c) => c.tasks.find((t) => t.id === id))?.id;
    }
  };

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    //==========if dragging column=============//
    //*
    if (typeof id === "number") {
      var tempSelectedColumn = columns.find((c) =>
        c.tasks.find((t) => t.id === id)
      );
      setSelectedTask(tempSelectedColumn?.tasks.find((t) => t.id === id));
      setSelectedColumn(tempSelectedColumn);
    }
    //*
    //==========if dragging column=============//

    //==========if dragging task=============//
    //*
    if (typeof id === "string") {
      setSelectedColumn(columns.find((c) => c.title === id));
      setSelectedTask(undefined);
    }
    //*
    //==========if dragging task=============//
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    const overId = over?.id;
    const activeId = active.id;

    const activeColumnID = findColumn(activeId);
    const overColumnID = findColumn(overId);

    if (!activeColumnID || !overColumnID || activeColumnID === overColumnID)
      return;

    if (typeof overId !== "number" && typeof activeId !== "number") return;

    const activeColumn = columns.find((c) => c.id === activeColumnID);
    const overColumn = columns.find((c) => c.id === overColumnID);

    const activeIndex = activeColumn?.tasks.findIndex((t) => t.id === activeId);
    let overIndex = overColumn?.tasks.findIndex((t) => t.id === overId);

    if (overIndex === -1) overIndex = overColumn?.tasks.length;

    if (activeIndex !== undefined && overIndex !== undefined) {
      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          //===remove task from active column====//
          if (column.id === activeColumnID) {
            return {
              ...column,
              tasks: column.tasks.filter((t) => t.id !== activeId),
            };
          }

          //===add task to hovered column in hovered position====//
          if (column.id === overColumnID && activeColumn?.tasks) {
            return {
              ...column,
              tasks: [
                ...column.tasks.slice(0, Number(overIndex)),
                activeColumn.tasks[activeIndex],
                ...column.tasks.slice(
                  Number(overIndex),
                  overColumn?.tasks.length
                ),
              ],
            };
          }
          return column;
        })
      );
    }
  }

  useEffect(() => {
    if (id) getColumnsByBoardId(id);
  }, [id]);

  
  return (
    <DndContext
      // accessibility={{ announcements: defaultAnnouncements }}
      onDragEnd={handleDragEnd}
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
            <Column key={column.title} column={column} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {selectedTask && selectedColumn ? (
          <Task columnId={selectedColumn.id} task={selectedTask} />
        ) : selectedColumn ? (
          <Column column={selectedColumn} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardDetails;
