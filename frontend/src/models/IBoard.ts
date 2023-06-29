import { IMember } from "./IMember";

export interface IBoard {
    title: string,
    description: string,
    members: IMember[]
}