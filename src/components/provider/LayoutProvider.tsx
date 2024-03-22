"use client";

import Navbar from "@/components/navbar/Navbar";
import { usePathname } from "next/dist/client/components/navigation";
import React from "react";

type IProps = {
  children: React.ReactNode;
};

function LayoutProvider({ children }: IProps) {
  const path = usePathname();

  return (
    <html lang="en">
      <body>
        {path !== "/login" && path !== "/register" && <Navbar />}
        {children}
      </body>
    </html>
  );
}

export default LayoutProvider;
