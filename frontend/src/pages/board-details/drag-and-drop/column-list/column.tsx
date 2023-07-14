import React, { FC, useMemo, useState } from "react";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IColumn } from "models/IColumn";
import { useContrastColor } from "hooks/useContrastColor";
import Task from "./task-list/task";
import TaskList from "./task-list";
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirm from "component/modules/delete-confirm";
import api from "services/api";

interface ColumnProps {
  column: IColumn;
  onEditClick?:(column:IColumn)=>void;
  onDelete?:(id:number|string)=>void;
}
const Column: FC<ColumnProps> = ({ column, onEditClick, onDelete }) => {
  const [openConfim, setOpenConfirm] = useState<boolean>(false)

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
    cursor: isDragging? 'grabbing':'grab'
  };

  const onDeleteClick = () => {
    setOpenConfirm(true)
  }
  const deleteColumn = () => {
    api.columns.deleteColumn(Number(column.id))
    onDelete && onDelete(Number(column.id))
    setOpenConfirm(false)
  }
  return (
    <div ref={setNodeRef} style={style}>
      <DeleteConfirm
        open={openConfim}
        handleClose={()=>setOpenConfirm(false)}
        onConfirm={deleteColumn}
      />
      <div className="column" >
        <div
          className="column-head"
          {...listeners}{...attributes}
          onKeyDown={()=>{console.log('d')}}
          
          style={{ backgroundColor: column.color, color: contrastColor,  }}
        >
          <IconButton onClick={(e)=>{
            e.stopPropagation()
            e.preventDefault()
            onEditClick&&onEditClick(column)
          }}
           style={{color:contrastColor, cursor:'pointer'}}><MoreHorizOutlinedIcon/></IconButton>
          <div style={{marginRight:"25px", width:'100%'}}>{column.title}</div>
          <div><IconButton style={{color:contrastColor, cursor:'pointer'}} onClick={onDeleteClick}><DeleteIcon/></IconButton></div>
        </div>
        <div
          className="items"
          style={{
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
