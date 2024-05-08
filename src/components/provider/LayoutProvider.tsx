"use client";

import Navbar from "@/components/customize/organisms/navbar/Navbar";
import { paths } from "@/routes/paths";
import { usePathname, useRouter } from "next/dist/client/components/navigation";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

type IProps = {
  children: React.ReactNode;
};

function LayoutProvider({ children }: IProps) {
  const path = usePathname();
  const redirect = useRouter().push;

  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    redirect(!cookies.token ? paths.auth.login : path!);
  }, [path, cookies.token]);

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
