"use client";

import { paths } from "@/routes/paths";
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

      {/* TODO: adjust popover later */}
      <div className="w-10 h-10">
        <button onClick={() => {}}>
          <img
            className="w-10 h-10 rounded-full hover:brightness-50 transition-all"
            src="/assets/dummy.png"
          />
        </button>
        <div className="absolute right-[116px] drop-shadow-md"></div>
      </div>
    </nav>
  );
}

export default Navbar;
