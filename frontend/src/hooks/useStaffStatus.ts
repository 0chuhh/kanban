import React from 'react'
import { useAppSelector } from "hooks/redux";
const useStaffStatus = () => {
const { user } = useAppSelector((state) => state.userReducer);
const isStaff = user?.isStaff
return isStaff  
}

export default useStaffStatus