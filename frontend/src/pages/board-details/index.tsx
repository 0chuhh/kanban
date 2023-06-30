import { IBoard } from "models/IBoard";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import api from "services/api";

const BoardDetails = () => {
  const id = useParams().id;
  const getBoard = async (id: string) => {
    const board: IBoard = await api.boards.getBoardById(id);
  };

  useEffect(() => {
    if (id) getBoard(id);
  }, [id]);
  return <div>BoardDetails</div>;
};

export default BoardDetails;
