import { DateString } from "types/date";
import { IColumn } from "./IColumn";

export interface ITask {
    column:IColumn;
    title: string,
    description: string,
    date_created:DateString;
    date_updated:DateString;
    deadline:string;
    position:number;
    subtasks:ITask[];
    status:number;
    performers:number;
}