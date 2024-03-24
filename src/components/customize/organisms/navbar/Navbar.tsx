"use client";

import { paths } from "@/routes/paths";
import { LogOut, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function Navbar() {
  const push = useRouter().push;
  const path = usePathname();

  return (
    <nav className="px-[116px] py-4 w-full fixed backdrop-blur-2xl flex items-center justify-between">
      <div className="flex gap-14 items-center">
        <img
          className="w-14 h-14"
          src="/assets/logo.png"
          alt="Micro Monitor logo"
        />
        <div className="flex gap-10">
          <button
            className={
              path === paths.dashboard
                ? "px-4 py-2 bg-gradient-to-t from-slate-100 border-b-2 border-slate-950 transition-all"
                : "px-4 py-2 hover:text-slate-400 transition-all"
            }
            onClick={() => push(paths.dashboard)}
          >
            Dashboard
          </button>
          <button
            className={
              path === paths.products
                ? "px-4 py-2 bg-gradient-to-t from-slate-100 border-b-2 border-slate-950 transition-all"
                : "px-4 py-2 hover:text-slate-400 transition-all"
            }
            onClick={() => push(paths.products)}
          >
            Products
          </button>
          <button
            className={
              path === paths.transactions
                ? "px-4 py-2 bg-gradient-to-t from-slate-100 border-b-2 border-slate-950 transition-all"
                : "px-4 py-2 hover:text-slate-400 transition-all"
            }
            onClick={() => push(paths.transactions)}
          >
            Transactions
          </button>
          <button
            className={
              path === paths.expenses
                ? "px-4 py-2 bg-gradient-to-t from-slate-100 border-b-2 border-slate-950 transition-all"
                : "px-4 py-2 hover:text-slate-400 transition-all"
            }
            onClick={() => push(paths.expenses)}
          >
            Expenses
          </button>
          <button
            className={
              path === paths.tagrets
                ? "px-4 py-2 bg-gradient-to-t from-slate-100 border-b-2 border-slate-950 transition-all"
                : "px-4 py-2 hover:text-slate-400 transition-all"
            }
            onClick={() => push(paths.tagrets)}
          >
            Targets
          </button>
        </div>
      </div>

      <div className="group w-10 h-10 cursor-pointer">
        <img
          className="w-10 h-10 rounded-full bg-cover bg-no-repeat bg-center hover:brightness-50 transition-all"
          src="/assets/image-placeholder.png"
        />
        <div className="invisible group-hover:visible duration-300 absolute mt-2 right-[116px] p-4 w-[212px] gap-2 flex flex-col bg-slate-white border-2 rounded-lg shadow-md">
          <button
            className="flex items-center gap-2 bg-transparent hover:bg-[#1C1C1C] text-sm text-[#1C1C1C] hover:text-white font-medium py-2 px-4 rounded-md transition ease-in"
            onClick={() => push(paths.profile)}
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
