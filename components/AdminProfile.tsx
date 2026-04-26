"use client";

import { ChangeEvent, useState } from "react";

function getStoredAdminImage() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminImage");
}

export default function AdminProfile() {
  const [image, setImage] = useState<string | null>(getStoredAdminImage);

  // Handle upload
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImage(base64);
      localStorage.setItem("adminImage", base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="cursor-pointer">
        <img
          src={image || "https://i.pravatar.cc/100"}
          alt="Admin profile"
          className="w-10 h-10 rounded-full object-cover border"
        />
        <input type="file" className="hidden" onChange={handleChange} />
      </label>
      <span className="text-sm font-medium">Admin</span>
    </div>
  );
}
