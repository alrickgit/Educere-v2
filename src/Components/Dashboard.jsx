import React from 'react'
import { useAuth } from "../contexts/AuthContext";
import SidebarWithHeader from "./SidebarWithHeader";


const Dashboard = () => {
    const {currentUser}=useAuth();
    return (
        <div>
            <SidebarWithHeader>{currentUser && currentUser.email}</SidebarWithHeader>
            
        </div>
    )
}

export default Dashboard
