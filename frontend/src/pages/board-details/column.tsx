import React, { FC } from 'react'
import {SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { IColumn } from 'models/IColumn';
import { useContrastColor } from 'hooks/useContrastColor';
import Task from './task';


interface ColumnProps{
    column:IColumn
}
const Column:FC<ColumnProps> = ({column}) => {
    const contrastColor = useContrastColor(column?.color)
    const {
      setNodeRef,
      attributes,
      listeners,
      transition,
      transform,
      isDragging,
  } = useSortable({ id: column.id, data:{type:'container'} })

  const style = {
      transition,
      transform: CSS.Transform.toString(transform),
      opacity: isDragging ? 0.5 : 1,
  }
  return (
    <div ref={setNodeRef} style={style}>
      <div className='column'>
        <div className='column-head'  {...attributes} {...listeners} style={{backgroundColor:column.color, color:contrastColor}}>{column.title}</div>
        <div className="items" style={{
          height:'100%',
          width:'100%',
          marginTop:'50px'
        }}>
          <SortableContext strategy={verticalListSortingStrategy} items={column.tasks.map(task=>`task ${column.id} ${task.id}`)}>
            {
              column.tasks.map(task=><Task key={`task ${column.id} ${task.id}`} columnId={column.id} task={task}/>)
            }
          </SortableContext>
        </div>
      </div>
    </div>
  )
}

export default Column