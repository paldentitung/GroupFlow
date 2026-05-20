import React from "react";
import Sidebar from "../components/Sidebar";
const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <aside>
        <Sidebar />
      </aside>
      <main className="bg-(--color-bg)  min-h-screen  ml-62 flex-1">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
