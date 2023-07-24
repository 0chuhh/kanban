import { IComment } from 'models/IComment'
import axios from 'services/api/axios'

const endpoints = {
    getCommentsByTaskId:(taskId:number)=>axios.get<IComment[]>(`comments/${taskId}/by-task/`).then(response=>response.data)
}
export default endpoints