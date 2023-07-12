import { IMember } from "./IMember";
import { IUser } from "./IUser";

export interface IBoard {
    id:number,
    title: string,
    description: string,
    members: IMember[]
    owner?: IUser
}