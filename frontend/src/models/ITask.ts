import { DateString } from "types/date";
import { IColumn } from "./IColumn";
import { IUser } from "./IUser";

export interface ITask {
    id:number;
    column:number;
    title: string,
    description: string,
    date_created:DateString;
    date_updated:DateString;
    deadline:string;
    position:number;
    subtasks:ITask[];
    status:number;
    performers:IUser[];
}