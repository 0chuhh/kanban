import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IColumn } from "models/IColumn";
import React, { FC, useMemo } from "react";
import Column from "./column";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface ColumnListProps {
  columns: IColumn[];
}
const ColumnList: FC<ColumnListProps> = ({ columns }) => {
  const columnIds = useMemo(
    () => columns.map((column) => column.title),
    [columns]
  );
  return (
    <SortableContext strategy={horizontalListSortingStrategy} items={columnIds}>
      <div className="column-list" style={{ gap: "10px", minWidth:'1200px', alignItems:'flex-start', height: "100%" }}>
      
      <div className="add-column column h-center v-center">
      <div className="h-center v-center" style={{
        color:'#fff'
      }}><AddIcon/> Добавить раздел</div>
      </div>
        
        {columns.map((column) => (
          <Column key={column.title} column={column} />
        ))}
      </div>
    </SortableContext>
  );
};

export default React.memo(ColumnList);
