import { IBoard } from 'models/IBoard'
import axios from 'services/api/axios'

const endpoints = {
    addMember:(boardId:number,userId:number)=>axios.post(`boards/${boardId}/members/add/`,{user_id:userId}),
    kickMember:(boardId:number,userId:number)=>axios.post(`boards/${boardId}/members/kick/`,{user_id:userId})
}
export default endpoints