import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { IColumn } from "models/IColumn";
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Column from "./column";
import AddIcon from '@mui/icons-material/Add';
import ColumnDrawer, { CanOpenColumnDrawer } from "./column-drawer";
import api from "services/api";

interface ColumnListProps {
  columns: IColumn[];
  boardId?: string;
  onCreateColumn?:(column:IColumn)=>void;
  onEditColumn?:(column:IColumn)=>void;
  onDeleteColumn?:(id:number|string)=>void;
  onCreateTask:(title:string, column:IColumn)=>void;
}
const ColumnList: FC<ColumnListProps> = ({ columns, boardId, onCreateColumn, onEditColumn, onDeleteColumn, onCreateTask }) => {
  const [selectedColumnTitle,setSelectedColumnTitle] = useState<string>('')
  const [selectedColumnColor,setSelectedColumnColor] = useState<string>('#fff')
 

  const drawerRef = useRef<CanOpenColumnDrawer>(null)
  const columnIds = useMemo(
    () => columns.map((column) => column.title),
    [columns]
  );

  const openCreateColumnDrawer = () => {
    drawerRef.current?.openDrawer()
    setSelectedColumnColor('#fff')
    setSelectedColumnTitle('')
  }

  const openEditColumnDrawer = (column:IColumn) => {
    drawerRef.current?.openDrawer()
    setSelectedColumnColor(column.color)
    setSelectedColumnTitle(column.title)
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

  const editColumn = async (title:string, color:string, initTitle:string) => {
    let newColumn = columns.find(c=>c.title===initTitle)
    if(newColumn){
      newColumn.title = title
      newColumn.color = color
      await api.columns.changeColumn(newColumn)
      onEditColumn && onEditColumn(newColumn)
    }
    drawerRef.current?.closeDrawer()
  }
  
  

  const drawerSubmit = useCallback((title:string, color:string, initTitle?:string)=>{
    if(selectedColumnColor.length && selectedColumnTitle.length && initTitle?.length) editColumn(title, color, initTitle)
    else createColumn(title, color)
    
  },[selectedColumnColor, selectedColumnTitle])


  return (
    <SortableContext strategy={horizontalListSortingStrategy} items={columnIds}>

      <ColumnDrawer initTitle={selectedColumnTitle} initColor={selectedColumnColor} onSubmit={drawerSubmit} ref={drawerRef} />
      <div className="column-list" style={{ gap: "10px", alignItems: 'flex-start', height: "100%" }}>

        <div onClick={openCreateColumnDrawer} className="add-column column h-center v-center">
          <div className="h-center v-center" style={{
            color: '#fff'
          }}><AddIcon /> Добавить раздел</div>
        </div>

        {columns.map((column) => (
          <Column onCreateTask={onCreateTask} onDelete={onDeleteColumn} onEditClick={openEditColumnDrawer} key={column.title} column={column} />
        ))}
      </div>
    </SortableContext>
  );
};

export default React.memo(ColumnList);
