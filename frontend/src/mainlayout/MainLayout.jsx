import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <aside>
        <Sidebar />
      </aside>
      <main className="bg-(--color-bg)  min-h-screen overflow-hidden  flex-2">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
