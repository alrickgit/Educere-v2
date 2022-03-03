import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const LoggedRoute = ({currentUser}) => {
  return currentUser ? <Navigate to="/"/> : <Outlet/>;
};

export default LoggedRoute;
