import React from "react"
import Cookies from 'js-cookie'
export const IsAuthentificted = () =>{
    try {
        const token = Cookies.get('token')
        if(token != undefined) return true
        return false
    } catch (error) {
        return false;
    }
}