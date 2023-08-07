import { IBoard } from 'models/IBoard'
import { IColumn } from 'models/IColumn'
import axios from 'services/api/axios'


const endpoints = {
    changeTaskPositionById: (id: string | number, columnId: string | number, position: number) =>
     axios.patch<IColumn[]>(`tasks/${id}/swap/`, { 
        column:columnId,
        position:position
      }).then(response => response.data),
    postTask:(title:string, column:IColumn,)=>axios.post('tasks/',{
      title, 
      column:column.id,
      position:0,
    }).then((response)=>response.data),
    completeTask: (id: number | string) => axios.post(`tasks/${id}/complete/`)
}
export default endpoints