import { IUser } from "./IUser";

export interface IBoard {
    id:number,
    title: string,
    description: string,
    members: IUser[]
    owner?: IUser
}