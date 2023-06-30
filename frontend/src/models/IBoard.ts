import { IMember } from "./IMember";

export interface IBoard {
    id:number,
    title: string,
    description: string,
    members: IMember[]
}