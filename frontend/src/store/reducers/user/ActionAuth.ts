import { AppDispatch } from "store";
import { IUser } from "models/IUser";
import api from 'services/api'
import { userSlice } from "./UserSlice";
import Cookies from "js-cookie";

export const signInUser = (username:string, password:string) => async (dispatch:AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const {data:token} = await api.auth.signIn(username, password)
        Cookies.set('token', token?.token)
        dispatch(getUser())
    } catch (error) {
        dispatch(userSlice.actions.userFetchingError((error as Error).message))
    }
}

export const getUser = () => async (dispatch:AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        const user:IUser = await api.auth.getMe()
        dispatch(userSlice.actions.userFetchingSuccess(user))
    } catch (error) {
        dispatch(userSlice.actions.userFetchingError((error as Error).message))
    }
}

export const logOutUser = () => async (dispatch:AppDispatch) => {
    try {
        dispatch(userSlice.actions.userFetching())
        Cookies.remove('token')
        dispatch(userSlice.actions.userFetchingSuccess(null))
    } catch (error) {
        dispatch(userSlice.actions.userFetchingError((error as Error).message))
    }
}