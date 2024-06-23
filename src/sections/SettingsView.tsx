"use client";

import React, { useEffect, useState } from "react";
import AdminSettingsView from "./AdminSettingsView";
import ProfileView from "./ProfileView";
import { Cookies } from "react-cookie";

function SettingsView() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    const role = cookies.get("role");
    setUserRole(role);
  }, []);

  if (userRole === "admin") {
    return <AdminSettingsView />;
  } else {
    return <ProfileView />;
  }
}

export default SettingsView;
