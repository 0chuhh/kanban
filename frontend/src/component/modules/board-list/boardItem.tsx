import { Typography } from '@mui/material'
import MembersList from 'component/ui/members-list'
import { IBoard } from 'models/IBoard'
import React, { FC } from 'react'

interface BoardItemProps {
    board:IBoard
}
const BoardItem:FC<BoardItemProps> = ({board}) => {
  return (
    <div className='board'>
        <Typography align='center'>
            {board.title}
        </Typography>
        <div style={{
            height:'100%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            alignItems:'end',
            padding:'0 0 20px 0',
            boxSizing:'border-box'
        }}>
            <Typography>{board.description}</Typography>
            
            
            <MembersList members={board.members}/>
        </div>
    </div>
  )
}

export default BoardItem