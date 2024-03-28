"use client";

import useClickOutsideElement from "@/hooks/useClickOutsideElement";
import { paths } from "@/routes/paths";
import { LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const navItems = [
  {
    menu: "Dashboard",
    path: paths.dashboard,
  },
  {
    menu: "Product",
    path: paths.product,
  },
  {
    menu: "Transaction",
    path: paths.transaction,
  },
  {
    menu: "Expense",
    path: paths.expense,
  },
  {
    menu: "Target",
    path: paths.tagret,
  },
];

function Navbar() {
  const push = useRouter().push;
  const currPath = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useClickOutsideElement(setIsOpen);

  return (
    <nav className="px-[116px] py-4 w-full bg-white fixed backdrop-blur-2xl flex items-center justify-between">
      <div className="flex gap-14 items-center">
        <img
          className="w-14 h-14"
          src="/assets/logo.png"
          alt="Micro Monitor logo"
        />
        <div className="flex gap-10">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={
                currPath === item.path
                  ? "px-4 py-2 bg-gradient-to-t from-slate-100 border-b-2 border-slate-950 transition-all"
                  : "px-4 py-2 hover:text-slate-400 transition-all"
              }
              onClick={() => push(item.path)}
            >
              {item.menu}
            </button>
          ))}
        </div>
      </div>

      <div className="w-10 h-10 cursor-pointer">
        <img
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 rounded-full bg-cover bg-no-repeat bg-center hover:brightness-50 transition-all"
          src="/assets/image-placeholder.png"
        />
        <div
          ref={menuRef}
          className={`${
            isOpen ? "scale-100 opacity-100" : "scale-90 invisible"
          } absolute z-50 mt-2 right-[116px] p-4 w-[212px] gap-2 flex flex-col bg-white border-2 rounded-lg shadow-md transition-all`}
        >
          <button
            className="flex items-center gap-2 bg-transparent hover:bg-[#1C1C1C] text-sm text-[#1C1C1C] hover:text-white font-medium py-2 px-4 rounded-md transition ease-in"
            onClick={() => {
              push(paths.profile);
              setIsOpen(false);
            }}
          >
            <User />
            <span>Profile</span>
          </button>
          <button className="flex items-center gap-2 bg-transparent border-red-600 text-red-600 hover:bg-red-600 text-sm text-red-bg-red-600 hover:text-white font-medium border py-2 px-4 rounded-md transition ease-in">
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
