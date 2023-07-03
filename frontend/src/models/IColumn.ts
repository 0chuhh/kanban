import { DateString } from "types/date";
import { ITask } from "./ITask";

type HEX = `#${string}`;

export interface IColumn {
    id:number,
    tasks:ITask[],
    title:string,
    color:HEX,
    position:number;
    date_created:DateString;
    board:number;
    default_task_status:string;
}