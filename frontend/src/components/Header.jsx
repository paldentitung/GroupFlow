import React from "react";
import { Search, Bell, Menu } from "lucide-react";
import MainButton from "./MainButton";

const Header = ({ title, buttonName, onClick }) => {
  return (
    <header className="flex justify-between items-center p-6">
      <div className="flex items-center gap-4">
        <span className="block md:hidden">
          <Menu />
        </span>
        <h1 className="text-lg font-semibold ">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="bg-white p-2 rounded-md shadow">
          <Search />
        </span>

        <span className="bg-white p-2 rounded-md shadow">
          <Bell />
        </span>

        <MainButton onClick={onClick}>{buttonName}</MainButton>
      </div>
    </header>
  );
};

export default Header;
