interface IRole {
    name:string
}
export interface IUser {
    username?: string;
    firstname:string;
    middlename:string;
    lastname:string;
    fullname:string;
    email?: string;
    token?: string;
    isStaff:boolean;
    roles?: IRole[];
    avatar?:string
}