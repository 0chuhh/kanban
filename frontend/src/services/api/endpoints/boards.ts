import { IBoard } from 'models/IBoard'
import axios from 'services/api/axios'

const endpoints = {
    getBoards: ()=>axios.get<IBoard[]>('boards/').then(response=>response.data),
    getBoardById: (id:string)=>axios.get<IBoard>(`boards/${id}/`).then(response=>response.data)
}
export default endpoints