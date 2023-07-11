import { IBoard } from 'models/IBoard'
import React, { useEffect, useRef, useState } from 'react'
import api from 'services/api'
import BoardItem from './boardItem'
import AddIcon from '@mui/icons-material/Add';
import CustomModal from 'component/ui/custom-modal';
import CreateBoardModal, { CanOpenCreateBoardModal } from './create-board-modal';

const BoardList = () => {
  const [boards, setBoards] = useState<IBoard[]>([])
  const ref = useRef<CanOpenCreateBoardModal>(null)

  const getBoards = async () => {
    const Boards:IBoard[] = await api.boards.getBoards()
    setBoards(Boards)
  }

  const onCreateBoard=(board:IBoard)=>{
    setBoards(prev=>[board, ...prev])
    ref.current?.closeModal()
  }
  useEffect(()=>{
    getBoards()
  },[])

  return (
    <div className='board-list'>
      <CreateBoardModal onCreate={onCreateBoard} ref={ref}/>
    <div onClick={()=>ref.current?.openModal()} className='create-board v-center h-center'>
      <AddIcon fontSize='large' style={{
        color:'#ff4057'
      }}/>
    </div>
      {
        boards.map(board=>
            <BoardItem board={board}/>
          )
      }
    </div>
  )
}

export default BoardList