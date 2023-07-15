import React from "react";
import Sidebar from "../../components/Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
};

export default DefaultLayout;
