import { IBoard } from 'models/IBoard'
import { IColumn } from 'models/IColumn'
import axios from 'services/api/axios'

const endpoints = {
    getColumnsByBoard: (id:string)=>axios.get<IColumn[]>(`column/${id}/`).then(response=>response.data),
    changeColumnPositionById: (id:string, position:number)=>axios.patch<IColumn[]>(`column/${id}/`,{position}).then(response=>response.data),
}
export default endpoints