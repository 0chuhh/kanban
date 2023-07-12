import { IBoard } from "models/IBoard";
import React, { useEffect, useRef, useState } from "react";
import api from "services/api";
import BoardItem from "./boardItem";
import AddIcon from "@mui/icons-material/Add";
import CustomModal from "component/ui/custom-modal";
import BoardModal, { CanOpenBoardModal } from "./board-modal";

const BoardList = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);

  const ref = useRef<CanOpenBoardModal>(null);

  const getBoards = async () => {
    const Boards: IBoard[] = await api.boards.getBoards();
    setBoards(Boards);
  };

  const onCreateBoard = async (title: string, description: string) => {
    const board: IBoard = await api.boards.postBoard(title, description);
    setBoards((prev) => [board, ...prev]);
    ref.current?.closeModal();
  };
  const onEditBoard = async (board:IBoard) => {
    setBoards((prev) => {
      const tempBoards = [...prev]
      tempBoards[prev.findIndex(b=>b.id===board.id)]=board
      return tempBoards
    });
    await api.boards.changeBoardById(board);
    
  };

  const onDeleteBoard = async (id: number) => {
    await api.boards.deleteBoardById(id);
    setBoards((prev) => prev.filter((b) => b.id !== id));
  };
  useEffect(() => {
    getBoards();
  }, []);

  return (
    <div className="board-list">
      <BoardModal method="create" onSubmit={onCreateBoard} ref={ref} />
      <div
        onClick={() => {
          ref.current?.openModal();
        }}
        className="create-board v-center h-center"
      >
        <AddIcon
          fontSize="large"
          style={{
            color: "#ff4057",
          }}
        />
      </div>
      {boards.map((board) => (
        <BoardItem onEdit={onEditBoard} onDelete={onDeleteBoard} board={board} />
      ))}
    </div>
  );
};

export default BoardList;
