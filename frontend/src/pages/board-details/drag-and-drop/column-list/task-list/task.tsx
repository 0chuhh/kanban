import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IconCheckbox from "component/ui/icon-checkbox";
import { ITask } from "models/ITask";
import React, { FC } from "react";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
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
    <div ref={setNodeRef} style={style} onClick={()=>{console.log('hello task')}} {...attributes} {...listeners}>
      <div className="task">
        <span><IconCheckbox classes={{
          root:'checkbox'
        }} icon={<CheckCircleOutlineOutlinedIcon fontSize="small"/>}/><span>{task.title}</span></span>
      </div>
    </div>
  );
};

export default React.memo(Task);
