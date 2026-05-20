import React from "react";
import { Search, Bell, Menu } from "lucide-react";
import MainButton from "./MainButton";

const Header = ({ title, buttonName, onClick }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 ">
      <div className="flex items-center gap-3">
        <span className="block md:hidden p-1.5 rounded-lg text-[#6b7280] hover:bg-[#f7f8fa] cursor-pointer transition-colors">
          <Menu size={20} />
        </span>
        <h1 className="text-[17px] font-semibold tracking-tight text-[#111827]">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg bg-[#f7f8fa] border border-[#e8eaed] text-[#6b7280] hover:bg-[#eef2ff] hover:text-[#4f46e5] hover:border-[#4f46e5] transition-all duration-150 hover:cursor-pointer">
          <Search size={17} />
        </button>

        <button className="relative p-2 rounded-lg bg-[#f7f8fa] border border-[#e8eaed] text-[#6b7280] hover:bg-[#eef2ff] hover:text-[#4f46e5] hover:border-[#4f46e5] transition-all duration-150 hover:cursor-pointer">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#4f46e5]" />
        </button>

        <MainButton onClick={onClick}>{buttonName}</MainButton>
      </div>
    </header>
  );
};

export default Header;
