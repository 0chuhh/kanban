import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IconCheckbox from "component/ui/icon-checkbox";
import { ITask } from "models/ITask";
import React, { FC, useContext } from "react";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import api from "services/api";
import { ColumnsContext } from "../..";
interface TaskProps {
  task: ITask;
  columnId: number;
  onClick?:(task:ITask)=>void;
}
const Task: FC<TaskProps> = ({ task, columnId, onClick=()=>{}}) => {
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

  const [columns, setColumns] = useContext(ColumnsContext)
  
  const completeTask = () => {
    api.tasks.completeTask(task.id)
    setColumns(prev=>prev.map(c=>
        c.id === columnId?
        {...c,tasks:c.tasks.filter(t=>t.id !== task.id)}
        :c
      ))
  }

  return (
    <div ref={setNodeRef} style={style} onClick={()=>{onClick(task)}} {...attributes} {...listeners}>
      <div className="task">
        <span><IconCheckbox onClick={(e)=>{
          e.stopPropagation()
          completeTask()
        }} classes={{
          root:'checkbox'
        }} icon={<CheckCircleOutlineOutlinedIcon fontSize="small"/>}/><span>{task.title}</span></span>
      </div>
    </div>
  );
};

export default React.memo(Task);
