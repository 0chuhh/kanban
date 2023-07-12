import { IconButton, Tooltip, Typography } from "@mui/material";
import MembersList from "component/ui/members-list";
import { IBoard } from "models/IBoard";
import React, { FC, useRef, useState } from "react";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from "hooks/redux";
import DeleteConfirm from "../delete-confirm";
import BoardModal, { CanOpenBoardModal } from "./board-modal";

interface BoardItemProps {
  board: IBoard;
  onDelete?: (id: number) => void;
  onEdit?: (board:IBoard) => void;
}
const BoardItem: FC<BoardItemProps> = ({ board, onDelete, onEdit }) => {

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)

  const ref = useRef<CanOpenBoardModal>(null);


  const openConfirmDialog:React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    setIsOpenDialog(true)
  }
  const openEditModal:React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    ref.current?.openModal()
  }
  const closeDialog = () => {
    setIsOpenDialog(false)
  }

  const onBoardEdit = (title:string, description:string) => {
    const tempBoard:IBoard = {...board}
    tempBoard.title = title;
    tempBoard.description = description;
    onEdit && onEdit(tempBoard)
    ref.current?.closeModal()
  }

  const { user } = useAppSelector((state) => state.userReducer);

  const navigate = useNavigate();

  const onBoardClick = (id: number) => {
    navigate(`/board/${id}`);
  };

  return (
    <div className="board-wrapper w-100">
      <BoardModal method="edit" onSubmit={onBoardEdit} title={board.title} description={board.description} ref={ref} />
      <div className="board h-100" onClick={(e) => {
      onBoardClick(board.id)
    }}>

      <DeleteConfirm
        onConfirm={()=>onDelete && onDelete(board.id)}
        open={isOpenDialog}
        handleClose={closeDialog}
      />
      <Typography align="center">{board.title}</Typography>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0 0 20px 0",
          boxSizing: "border-box",
        }}
      >
        <Typography>{board.description}</Typography>
        <div className="jc-between w-100">
          {(user?.isStaff || (user?.userId == board.owner?.userId)) && (
            <div className="tools jc-between" >
              <Tooltip title="удалить">
              <IconButton
                onClick={openConfirmDialog}
              >
                <DeleteIcon htmlColor="red" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Редактировать">
              <IconButton
                onClick={openEditModal}
              >
                <EditIcon htmlColor="orange" />
              </IconButton>
            </Tooltip>
            </div>
          )}
          <MembersList members={board.members} />
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default BoardItem;
