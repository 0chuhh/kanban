import { IFAQ, IFAQFile } from "models/IFAQ";
import axios from "../axios";

const endpoints = {
    getFAQ: (name?:string) => axios.get<IFAQ[]>('faq/',{
        params:{
            search:name
        }
    }).then(response=>response.data),
    getFAQbyId: (id:number) => axios.get<IFAQ>(`faq/${id}/`).then(response=>response.data),
    postFAQ:(faq:IFAQ) => axios.post<IFAQ>('faq/',faq,{
        headers:{
            'Content-Type':'application/json'
        }
    }).then(response=>response.data),
    deleteFAQbyId: (id:number) => axios.delete<IFAQ>(`faq/${id}/`),

    getFAQfilesByFAQId: (id:number) => axios.get<IFAQFile[]>(`faq-files/${id}/by_faq/`).then(response=>response.data),
    postFAQfilesByFAQId: (id:number, files:FormData) => axios.post<IFAQFile[]>(`faq-files/${id}/by_faq/`,
        files,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(response=>response.data),
}
export default endpoints