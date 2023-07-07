import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ITask } from "models/ITask";
import React, { FC, useMemo } from "react";
import Task from "./task";

interface TaskListProps {
  tasks: ITask[];
}
const TaskList: FC<TaskListProps> = ({ tasks }) => {
  const taskIds = useMemo(() => tasks?.map((t) => t.id), [tasks]);

  return (
    <SortableContext strategy={verticalListSortingStrategy} items={taskIds}>
      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task.id} columnId={task.column} task={task} />
        ))}
      </div>
    </SortableContext>
  );
};

export default React.memo(TaskList);
