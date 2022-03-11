import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const IsNewUser = ({isNewUser}) => {
  console.log(isNewUser)
  return isNewUser ? <Outlet/> :<Navigate to="/courses"/>;
};

export default IsNewUser;