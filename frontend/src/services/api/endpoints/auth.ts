import { IUser } from 'models/IUser'
import axios from 'services/api/axios'

const endpoints = {
    signIn: (username:string, password:string) => axios.post<{token:string}>('accounts/sign-in/',{
        username,
        password
    },{
        headers:{
            'Content-Type':'application/json'
        }
    }),
    getMe: ()=>axios.get<IUser>('accounts/me/',{
        headers:{
            'Content-Type':'application/json'
        }
    }).then(response=>response.data)
}
export default endpoints