import React from "react";
import { ImBooks } from "react-icons/im";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdMeetingRoom } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
      <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-dark400 text-white shadow-lg z-40 xl:z-50">
      <Link to="/">
        <SidebarIcon icon={<FaSchool size="36" />} text="Home" />
      </Link>
        <Divider />
        <div className="space-y-4 my-2">
          <Link to="/">
            <SidebarIcon
              icon={<RiDashboard2Fill size="40" />}
              text="Dashboard"
            />
          </Link>
          <Link to="courses">
            <SidebarIcon icon={<ImBooks size="36" />} text="Courses" />
          </Link>
          <Link to="meeting">
            <SidebarIcon icon={<MdMeetingRoom size="40" />} text="Meeting" />
          </Link>
          <Link to="notifications">
            <SidebarIcon
              icon={<MdNotifications size="38" />}
              text="Notifications"
            />
          </Link>
          <Link to="account">
            <SidebarIcon icon={<MdAccountCircle size="38" />} text="Account" />
          </Link>
        </div>
      </div>
  );
};

const SidebarIcon = ({ icon, text }) => (
  <div className="">
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-text group-hover:scale-100">{text}</span>
    </div>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default Sidebar;
