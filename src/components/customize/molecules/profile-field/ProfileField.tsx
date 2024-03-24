"use client";

import React, { useState } from "react";

function ProfileField() {
  const [profile, setProfile] = useState("");

  const handleUploadProfile = (e: any) => {
    setProfile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div
      className="w-20 h-20 rounded-full bg-cover bg-no-repeat bg-center hover:brightness-50"
      style={{
        backgroundImage: profile
          ? `url(${profile})`
          : 'url("/assets/image-placeholder.png")',
      }}
    >
      <input
        type="file"
        name=""
        id=""
        className="opacity-0 w-full h-full cursor-pointer"
        onChange={handleUploadProfile}
      />
    </div>
  );
}

export default ProfileField;
