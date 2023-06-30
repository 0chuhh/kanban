import { IBoard } from 'models/IBoard'
import React, { useEffect, useState } from 'react'
import api from 'services/api'
import BoardItem from './boardItem'
import { Link } from 'react-router-dom'

const BoardList = () => {
  const [boards, setBoards] = useState<IBoard[]>([])


  const getBoards = async () => {
    const Boards:IBoard[] = await api.boards.getBoards()
    setBoards(Boards)
  }
  useEffect(()=>{
    getBoards()
  },[])

  return (
    <div className='board-list'>
      {
        boards.map(board=>
            <BoardItem board={board}/>
          )
      }
    </div>
  )
}

export default BoardList