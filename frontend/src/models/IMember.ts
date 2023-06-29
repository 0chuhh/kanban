import { IUser } from "./IUser";

export interface IMember {
    user: IUser,
    board:number,
    is_owner: boolean
}