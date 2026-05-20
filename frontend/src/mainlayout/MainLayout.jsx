import React from "react";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <aside>
        <Sidebar />
      </aside>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
