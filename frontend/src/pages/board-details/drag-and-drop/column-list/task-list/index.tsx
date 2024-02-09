import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ITask } from "models/ITask";
import React, { FC, useMemo, useRef, useState } from "react";
import Task from "./task";
import TaskDrawer, { CanOpenTaskDrawer } from "./task-drawer";

interface TaskListProps {
  tasks: ITask[];
}
const TaskList: FC<TaskListProps> = ({ tasks }) => {
  const taskIds = useMemo(() => tasks?.map((t) => t.id), [tasks]);
  const [selectedTask, setSelectedTask] = useState<ITask>()
  const drawerRef = useRef<CanOpenTaskDrawer>(null)
  const onTaskClick = (task:ITask) => {
    setSelectedTask(task)
    drawerRef.current?.openDrawer()
  }
  return (
    <SortableContext strategy={verticalListSortingStrategy} items={taskIds}>
      <TaskDrawer task={selectedTask} onSubmit={()=>{}} ref={drawerRef}/>
      <div className="task-list">
        {tasks.map((task) => (
          <Task onClick={onTaskClick} key={task.id} columnId={task.column} task={task} />
        ))}
      </div>
    </SortableContext>
  );
};

export default React.memo(TaskList);
