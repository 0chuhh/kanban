import { IBoard } from 'models/IBoard'
import axios from 'services/api/axios'

const endpoints = {
    getBoards: ()=>axios.get<IBoard[]>('boards/').then(response=>response.data),
    getBoardById: (id:string)=>axios.get<IBoard>(`boards/${id}/`).then(response=>response.data),
    deleteBoardById: (id:string | number)=>axios.delete<IBoard>(`boards/${id}/`).then(response=>response.data),
    postBoard: (title:string, description:string)=>axios.post<IBoard>('boards/',{
        title,
        description
    }).then(response=>response.data),
    changeBoardById: (board:IBoard)=>axios.patch<IBoard>(`boards/${board.id}/`,{
        title:board.title,
        description:board.description,
        members:board.members,
    }).then(response=>response.data),

}
export default endpoints