interface IRole {
    name:string
}
export interface IUser {
    username?: string;
    fullname:string;
    email?: string;
    token?: string;
    isStaff:boolean;
    roles?: IRole[];
    avatar?:string
}