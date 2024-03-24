"use client";

import { Pencil } from "lucide-react";
import React, { useState } from "react";

function ProfileField() {
  const [profile, setProfile] = useState("");

  const handleUploadProfile = (e: any) => {
    setProfile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div
      className="relative w-20 h-20 rounded-full bg-cover bg-no-repeat bg-center hover:brightness-50 transition-all"
      style={{
        backgroundImage: profile
          ? `url(${profile})`
          : 'url("/assets/image-placeholder.png")',
      }}
    >
      <div className="absolute w-8 h-8 rounded-full p-2 -bottom-1 -right-1 bg-teal-500">
        <Pencil color="white" size={16} />
      </div>
      <input
        type="file"
        name=""
        id=""
        className="opacity-0 w-full h-full rounded-full cursor-pointer"
        onChange={handleUploadProfile}
      />
    </div>
  );
}

export default ProfileField;
