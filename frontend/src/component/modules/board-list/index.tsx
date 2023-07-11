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

  const onCreateBoard = async(title:string, description:string)=>{
    const board: IBoard = await api.boards.postBoard(title, description);
    setBoards(prev=>[board, ...prev])
    ref.current?.closeModal()
  }

  const onDeleteBoard = async (id:number) => {
    await api.boards.deleteBoardById(id)
    setBoards(prev=>prev.filter(b=>b.id !== id))
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
            <BoardItem onDelete={onDeleteBoard} board={board}/>
          )
      }
    </div>
  )
}

export default BoardList