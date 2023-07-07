import React, { FC, useMemo } from "react";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IColumn } from "models/IColumn";
import { useContrastColor } from "hooks/useContrastColor";
import Task from "./task-list/task";
import TaskList from "./task-list";

interface ColumnProps {
  column: IColumn;
}
const Column: FC<ColumnProps> = ({ column }) => {
  const contrastColor = useContrastColor(column?.color);
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: column.title, data: { type: "container" } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };


  return (
    <div ref={setNodeRef} style={style}>
      <div className="column" {...attributes}>
        <div
          className="column-head"
          {...listeners}
          style={{ backgroundColor: column.color, color: contrastColor }}
        >
          {column.title}
        </div>
        <div
          className="items"
          style={{
            height: "100%",
            width: "100%",
            paddingTop: "50px",
          }}
        >
          <TaskList tasks={column.tasks}/>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Column);
