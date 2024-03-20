import React from "react";

function Navbar() {
  return (
    <nav className="px-[116px] py-4 flex items-center justify-between">
      <div className="flex gap-14 items-center">
        <img
          className="w-14 h-14"
          src="/assets/logo.png"
          alt="Micro Monitor logo"
        />
        <div className="flex gap-10">
          <p className="text-base">Dashboard</p>
          <p className="text-base">Products</p>
          <p className="text-base">Transactions</p>
          <p className="text-base">Expenses</p>
          <p className="text-base">Target</p>
        </div>
      </div>
      <button className="w-10 h-10 rounded-full">
        <img className="w-10 h-10 rounded-full" src="/assets/dummy.png" />
      </button>
    </nav>
  );
}

export default Navbar;
