import { IComment } from 'models/IComment'
import axios from 'services/api/axios'

const endpoints = {
    getCommentsByTaskId:(taskId:number)=>axios.get<IComment[]>(`comments/${taskId}/by-task/`).then(response=>response.data),
    postCommentsByTaskId:(taskId:number,comment:string, reply?:number)=>axios.post(`comments/${taskId}/by-task/`,{
        text:comment,
        reply
    })
}
export default endpoints