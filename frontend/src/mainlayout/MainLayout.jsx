import React from "react";
import Sidebar from "../components/Sidebar";
const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <aside className="w-64 ">
        <Sidebar />
      </aside>
      <main className="bg-(--color-bg)  min-h-screen  flex-2">{children}</main>
    </div>
  );
};

export default MainLayout;
