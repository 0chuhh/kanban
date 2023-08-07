import React, { FC, useMemo, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IColumn } from "models/IColumn";
import { useContrastColor } from "hooks/useContrastColor";
import AddIcon from "@mui/icons-material/Add";
import TaskList from "./task-list";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirm from "component/modules/delete-confirm";
import api from "services/api";
import { Height } from "@mui/icons-material";
import CustomInput from "component/ui/custom-input";

interface ColumnProps {
  column: IColumn;
  onEditClick?: (column: IColumn) => void;
  onDelete?: (id: number | string) => void;
  onCreateTask?:(title:string, column:IColumn)=>void;
}
const Column: FC<ColumnProps> = ({ column, onEditClick, onDelete, onCreateTask=()=>{} }) => {
  const [openConfim, setOpenConfirm] = useState<boolean>(false);

  const contrastColor = useContrastColor(column?.color);
  const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);
  const [creatingTaskValue, setCreatingTaskValue] = useState<string>("");

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
    cursor: isDragging ? "grabbing" : "grab",
  };

  const onDeleteClick = () => {
    setOpenConfirm(true);
  };
  const deleteColumn = () => {
    api.columns.deleteColumn(Number(column.id));
    onDelete && onDelete(Number(column.id));
    setOpenConfirm(false);
  };

  const startCreatingTask = () => {
    setIsCreatingTask(true);
  };

  const createTask = () => {
    setIsCreatingTask(false)
    onCreateTask(creatingTaskValue, column)
    setCreatingTaskValue('')
  }
  
  return (
    <div ref={setNodeRef} style={style}>
      <DeleteConfirm
        open={openConfim}
        handleClose={() => setOpenConfirm(false)}
        onConfirm={deleteColumn}
      />
      <div className="column">
        <div
          className="column-head"
          {...listeners}
          {...attributes}
          onKeyDown={() => {
            console.log("d");
          }}
          style={{ backgroundColor: column.color, color: contrastColor }}
        >
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onEditClick && onEditClick(column);
            }}
            style={{ color: contrastColor, cursor: "pointer" }}
          >
            <MoreHorizOutlinedIcon />
          </IconButton>
          <div style={{ marginRight: "25px", width: "100%" }}>
            {column.title}
          </div>
          <div>
            <IconButton
              style={{ color: contrastColor, cursor: "pointer" }}
              onClick={onDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div
          className="items"
          style={{
            width: "100%",
            paddingTop: "50px",
          }}
        >
          <div
            className="create-task h-center v-center"
            style={{
              boxSizing: "border-box",
              height: "70px",
              padding: "10px",
              color: "gray",
              border: "dashed 2px gray",
              borderRadius: "10px",
              margin: "10px 5px",
            }}
            onClick={startCreatingTask}
          >
            <div className="v-center">
              <AddIcon /> Добавить задачу
            </div>
          </div>
          {isCreatingTask && (
            <div
              className="task"
              style={{
                margin: "10px 5px",
              }}
            >
              <CustomInput
                placeholder="Опишите задачу"
                maxRows={1}
                inputRef={input=>input && input.focus()}
                multiline
                value={creatingTaskValue}
                onChange={(e)=>setCreatingTaskValue(e.target.value)}
                onBlur={createTask}
                htmlColor="#000"
                fullWidth
              />
            </div>
          )}
          <TaskList tasks={column.tasks} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Column);
