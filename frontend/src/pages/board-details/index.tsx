import { IBoard } from "models/IBoard";
import { IColumn } from "models/IColumn";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "services/api";
import {DndContext} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';

const BoardDetails = () => {
  const id = useParams().id;
  const [items] = useState([1, 2, 3]);
  const getColumnsByBoardId = async (id: string) => {
    const columns: IColumn[] = await api.columns.getColumnsByBoard(id);
  };

  useEffect(() => {
    if (id) getColumnsByBoardId(id);
  }, [id]);
  return <DndContext>
  <SortableContext items={items}>
    {/* ... */}
  </SortableContext>
</DndContext>;
};

export default BoardDetails;
