"use client";

import { useState, useEffect } from "react";

export default function AdminProfile() {
  const [image, setImage] = useState<string | null>(null);

  // Load saved image
  useEffect(() => {
    const saved = localStorage.getItem("adminImage");
    if (saved) setImage(saved);
  }, []);

  // Handle upload
  const handleChange = (e: any) => {
    const file = e.target.files[0];
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
          className="w-10 h-10 rounded-full object-cover border"
        />
        <input type="file" className="hidden" onChange={handleChange} />
      </label>
      <span className="text-sm font-medium">Admin</span>
    </div>
  );
}