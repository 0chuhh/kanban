import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { IColumn } from "models/IColumn";
import { ITask } from "models/ITask";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import api from "services/api";
import Task from "./column-list/task-list/task";
import Column from "./column-list/column";
import ColumnList from "./column-list";
import Overlay from "./overlay";

const DragAndDrop = () => {
  const id = useParams<string>().id;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const [columns, setColumns] = useState<IColumn[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<IColumn>();
  const [selectedTask, setSelectedTask] = useState<ITask>();

  const getColumnsByBoardId = async (id: string) => {
    const columns: IColumn[] = await api.columns.getColumnsByBoard(id);
    setColumns(columns);
  };

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
      changeTaskPosition(
        Number(selectedTask?.id),
        overColumnID,
        Number(overIndex)
      );
    }
  }

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
          changeTaskPosition(
            selectedTask.id,
            Number(overColumnID),
            Number(overIndex)
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
        const oldIndex = columns?.findIndex((c) => c.title === active.id);
        const newIndex = columns?.findIndex((c) => c.title === over?.id);
        setColumns((columns) => {
          return arrayMove(columns, oldIndex, newIndex);
        });
        if (selectedColumn) {
          console.log(selectedColumn?.id, newIndex);
          changeColumnPosition(Number(selectedColumn?.id), newIndex);
        }
      }
    }
    //*
    //====if dropped column====//
  }

  const changeColumnPosition = async (
    id: string | number,
    position: number
  ) => {
    await api.columns.changeColumnPositionById(id, position);
  };

  const changeTaskPosition = async (
    id: string | number,
    columnId: string | number,
    position: number
  ) => {
    await api.tasks.changeTaskPositionById(id, columnId, position);
  };

  const onChangeColumn = (column: IColumn) => {
    setColumns((prev) =>
      prev.map((c) =>
        c.id === column.id
          ? { ...c, color: column.color, title: column.title }
          : c
      )
    );
  };
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
      <ColumnList
        onEditColumn={onChangeColumn}
        onCreateColumn={(column) => setColumns((prev) => [...prev, column])}
        onDeleteColumn={(id)=> setColumns(prev=>prev.filter(c=>c.id !== id))}
        boardId={id}
        columns={columns}
      />
      <Overlay selectedColumn={selectedColumn} selectedTask={selectedTask} />
    </DndContext>
  );
};

export default DragAndDrop;
