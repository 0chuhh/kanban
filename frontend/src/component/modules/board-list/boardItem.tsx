import { IconButton, Tooltip, Typography } from "@mui/material";
import MembersList from "component/ui/members-list";
import { IBoard } from "models/IBoard";
import React, { FC } from "react";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "hooks/redux";

interface BoardItemProps {
  board: IBoard;
  onDelete?: (id: number) => void;
}
const BoardItem: FC<BoardItemProps> = ({ board, onDelete }) => {
  const { user } = useAppSelector((state) => state.userReducer);

  const navigate = useNavigate();

  const onBoardClick = (id: number) => {
    navigate(`/board/${id}`);
  };

  return (
    <div className="board" onClick={() => onBoardClick(board.id)}>
      <Typography align="center">{board.title}</Typography>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "end",
          padding: "0 0 20px 0",
          boxSizing: "border-box",
        }}
      >
        <Typography>{board.description}</Typography>
        <div className="jc-between w-100">
          {user?.isStaff && (
            <Tooltip title="удалить">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete && onDelete(board.id);
                }}
              >
                <DeleteIcon htmlColor="red" />
              </IconButton>
            </Tooltip>
          )}
          <MembersList members={board.members} />
        </div>
      </div>
    </div>
  );
};

export default BoardItem;
