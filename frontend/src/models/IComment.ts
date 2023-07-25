import { IUser } from "./IUser";

export interface IComment {
    id:number,
    task:number,
    owner:IUser,
    date_created:string,
    date_updated:string,
    text:string
    replies:IComment[]
}