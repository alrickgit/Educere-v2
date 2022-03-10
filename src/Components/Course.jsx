import React from "react";
import SidebarWithHeader from "./SidebarWithHeader";

const Course = ({ data }) => {
  return (
    <div>
      {/* <SidebarWithHeader>Course{data.id}</SidebarWithHeader> */}
      Course: {data.title}
    </div>
  );
};

export default Course;
