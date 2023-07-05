import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ITask } from "models/ITask";
import React, { FC } from "react";

interface TaskProps {
  task: ITask;
  columnId: number;
}
const Task: FC<TaskProps> = ({ task, columnId }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ background: "red", padding: "30px", marginTop: "20px" }}>
        {task.title}
      </div>
    </div>
  );
};

export default Task;
