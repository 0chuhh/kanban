import { Navigate, PathRouteProps, Route, RouteProps } from "react-router"
import React, {FC, PropsWithChildren} from "react"
import { IsAuthentificted } from "services/isAuthentificated"
import { useAppSelector } from "hooks/redux"
interface PrivateRouteProps {
    children?:React.ReactNode
}
const PrivateRoute:FC<PrivateRouteProps> = ({children}) => {
    if(IsAuthentificted() === false) return <Navigate to="/login" replace/>
    return <>{children}</>
}
export default PrivateRoute