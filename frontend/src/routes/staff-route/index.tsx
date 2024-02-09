import React, { FC, PropsWithChildren } from "react";
import useStaffStatus from "hooks/useStaffStatus";
import { Navigate } from "react-router";
import { useAppSelector } from "hooks/redux";

const StaffRoute: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAppSelector((state) => state.userReducer);
  const isStaff = useStaffStatus();

  if(user){
    if (isStaff) return <>{children}</>;
    return <Navigate to="/404" replace />;
  }
  return null
};

export default StaffRoute;

