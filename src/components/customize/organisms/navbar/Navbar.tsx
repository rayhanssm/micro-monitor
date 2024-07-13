"use client";

import useClickOutsideElement from "@/hooks/useClickOutsideElement";
import { AuthRepository } from "@/repositories/AuthRepository";
import { paths } from "@/routes/paths";
import { IProfileResponse } from "@/types/responses/AuthResponse";
import { Bolt, LogOut, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

function Navbar() {
  const push = useRouter().push;
  const currPath = usePathname();

  const cookies = new Cookies();

  const [filteredNavItems, setFilteredNavItems] = useState<any[]>([]);
  const [profile, setProfile] = useState<IProfileResponse | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNavMobile, setIsOpenNavMobile] = useState(false);

  const menuRef = useClickOutsideElement(setIsOpen);
  const navMobileRef = useClickOutsideElement(setIsOpenNavMobile);

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("role");
    cookies.remove("expiresAt");
    cookies.remove("flagTarget");
    cookies.remove("flagExpense");
    cookies.remove("flagProduct");

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("flagTarget");
    localStorage.removeItem("flagExpense");
    localStorage.removeItem("flagProduct");

    push(paths.auth.login);
  };

  useEffect(() => {
    const navItems = [
      {
        menu: "Dashboard",
        path: paths.dashboard,
        flag: null,
        role: cookies.get("role") === "admin" ? null : false,
      },
      {
        menu: "Produk",
        path: paths.product,
        flag: cookies.get("flagProduct") === true ? null : false,
        role: cookies.get("role") === "admin" ? null : false,
      },
      {
        menu: "Transaksi",
        path: paths.transaction,
        flag: null,
        role: null,
      },
      {
        menu: "Pengeluaran",
        path: paths.expense,
        flag: cookies.get("flagExpense") === true ? null : false,
        role: null,
      },
      {
        menu: "Target",
        path: paths.target,
        flag: cookies.get("flagTarget") === true ? null : false,
        role: cookies.get("role") === "admin" ? null : false,
      },
    ];
    const filteredItems = navItems.filter(
      (item) => item.flag || item.role === null
    );

    setFilteredNavItems(filteredItems);
  }, []);

  const getProfile = async () => {
    try {
      const res = await AuthRepository.GetProfile();
      setProfile(res.data);
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <nav className="px-4 lg:px-[116px] py-4 w-full bg-white fixed backdrop-blur-2xl flex items-center justify-between z-10">
      <div className="flex gap-14 items-center">
        <img
          className="w-14 h-14"
          src="/assets/logo.png"
          alt="Micro Monitor logo"
        />
        <div className="hidden lg:flex gap-10">
          {filteredNavItems.map((item, index) => (
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

      <div className="hidden lg:block w-10 h-10 cursor-pointer">
        <div
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 flex justify-center items-center rounded-full bg-teal-500 transition-all"
        >
          <p className="text-white font-bold text-xl">
            {profile?.userName ? profile?.userName[0] : "-"}
          </p>
        </div>
        <div
          ref={menuRef}
          className={`${
            isOpen ? "scale-100 opacity-100" : "scale-90 invisible"
          } absolute z-50 mt-2 right-[116px] p-4 w-[212px] gap-2 flex flex-col bg-white border-2 rounded-lg shadow-md transition-all`}
        >
          <p className="font-bold text-center">
            {profile?.userName ? profile.userName : "User"}
          </p>
          <button
            className="flex items-center gap-2 bg-transparent hover:bg-[#1C1C1C] text-sm text-[#1C1C1C] hover:text-white font-medium py-2 px-4 rounded-md transition ease-in"
            onClick={() => {
              push(paths.settings);
              setIsOpen(false);
            }}
          >
            <Bolt />
            <span>Pengaturan</span>
          </button>
          <button
            className="flex items-center gap-2 bg-transparent border-red-600 text-red-600 hover:bg-red-600 text-sm text-red-bg-red-600 hover:text-white font-medium border py-2 px-4 rounded-md transition ease-in"
            onClick={handleLogout}
          >
            <LogOut />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      <div className={`block lg:hidden`}>
        <button className={``} onClick={() => setIsOpenNavMobile(true)}>
          <Menu color="#0F766E" />
        </button>
        <div
          ref={navMobileRef}
          className={`
            ${
              isOpenNavMobile ? `bg-white lg:hidden` : `hidden`
            } absolute border-2 mt-2 right-4 p-4 w-[212px] gap-2 flex flex-col rounded-lg shadow-md transition-colors z-50
          `}
        >
          {filteredNavItems.map((item, index) => (
            <button
              key={index}
              className={
                currPath === item.path
                  ? "px-4 py-2 font-bold text-teal-700 transition-all"
                  : "px-4 py-2 hover:text-slate-400 transition-all"
              }
              onClick={() => push(item.path)}
            >
              {item.menu}
            </button>
          ))}
          <button
            className={
              currPath === paths.settings
                ? "bg-slate-800 text-white px-4 py-2 rounded-md"
                : "border px-4 py-2 transition-all"
            }
            onClick={() => {
              push(paths.settings);
              setIsOpen(false);
            }}
          >
            Pengaturan
          </button>
          <button
            className={
              "border border-red-600 px-4 py-2 text-red-600 rounded-md"
            }
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
