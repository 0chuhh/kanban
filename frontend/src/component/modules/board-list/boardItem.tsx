import { Avatar, AvatarGroup, Tooltip, Typography } from '@mui/material'
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
            <Tooltip title='sss' enterDelay={600} arrow>
            <AvatarGroup max={5} classes={{
                avatar:'members-avatar'
            }}>
            {
            board?.members?.map(member=>{
                console.log(member.is_owner)
                return(
                    <Avatar style={{
                    }} src={member.user.avatar}>{member.user.lastname[0].toUpperCase()}{member.user.firstname[0].toUpperCase()} </Avatar>
                )
            }
                )
        }
            </AvatarGroup>
            </Tooltip>
            
        
        </div>
    </div>
  )
}

export default BoardItem