import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IColumn } from "models/IColumn";
import React, { FC, useMemo, useRef, useState } from "react";
import Column from "./column";
import AddIcon from '@mui/icons-material/Add';
import ColumnDrawer, { CanOpenColumnDrawer } from "./create-column-drawer";
import api from "services/api";

interface ColumnListProps {
  columns: IColumn[];
  boardId?: string;
  onCreateColumn?:(column:IColumn)=>void;
}
const ColumnList: FC<ColumnListProps> = ({ columns, boardId, onCreateColumn }) => {
  const [selectedColumnTitle,setSelectedColumnTitle] = useState<string>('')
  const drawerRef = useRef<CanOpenColumnDrawer>(null)
  const columnIds = useMemo(
    () => columns.map((column) => column.title),
    [columns]
  );

  const openColumnDrawer = () => {
    drawerRef.current?.openDrawer()
    
  }

  const createColumn = async (title:string, color:string) => {
    if(columns.find(c=>c.title === title)){
      window.alert('Такой раздел уже существует')
    }else{
      let columnMaxPosition = 0;
      if (columns.length > 0) {
        columnMaxPosition = columns.reduce((prev, current) => (prev.position > current.position) ? prev : current).position;
        columnMaxPosition += 1
      }
      const newColumn:Omit<IColumn, 'tasks'> = {
        board:Number(boardId),
        title:title,
        color:color,
        position: columnMaxPosition
      }
      const response:IColumn = await api.columns.postColumn(newColumn)
      onCreateColumn && onCreateColumn({...response, tasks:[]})
      drawerRef.current?.closeDrawer()
    }
  }
  return (
    <SortableContext strategy={horizontalListSortingStrategy} items={columnIds}>

      <ColumnDrawer onSubmit={createColumn} ref={drawerRef} />
      <div className="column-list" style={{ gap: "10px", alignItems: 'flex-start', height: "100%" }}>

        <div onClick={openColumnDrawer} className="add-column column h-center v-center">
          <div className="h-center v-center" style={{
            color: '#fff'
          }}><AddIcon /> Добавить раздел</div>
        </div>

        {columns.map((column) => (
          <Column key={column.title} column={column} />
        ))}
      </div>
    </SortableContext>
  );
};

export default ColumnList;
