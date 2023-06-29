import { IType } from "models/IType"
import axios from "../axios"

const endpoints = {
    getTypes: () => axios.get<IType[]>('types/').then(response=>response.data),
    postType: (name:string) => axios.post<IType>('types/',{name}).then(response=>response.data),
}
export default endpoints