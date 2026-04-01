"use client";

import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";

const DEFAULT_IMAGE = "https://i.pravatar.cc/100?img=12";
const DEFAULT_NAME = "Dronachary Shastri";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HomeTopbar({ setOpen }: Props) {
  const [adminImage, setAdminImage] = useState<string>(DEFAULT_IMAGE);
  const [adminName, setAdminName] = useState<string>(DEFAULT_NAME);

  useEffect(() => {
    const updateImage = () => {
      const savedImage = localStorage.getItem("adminImage");
      setAdminImage(savedImage || DEFAULT_IMAGE);
    };

    const updateName = () => {
      const savedName = localStorage.getItem("adminName");
      setAdminName(savedName || DEFAULT_NAME);
    };

    updateImage();
    updateName();

    window.addEventListener("adminImageUpdated", updateImage);
    window.addEventListener("adminNameUpdated", updateName);

    return () => {
      window.removeEventListener("adminImageUpdated", updateImage);
      window.removeEventListener("adminNameUpdated", updateName);
    };
  }, []);

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-md p-2 hover:bg-slate-100"
          >
            <Menu className="h-6 w-6 text-slate-700" />
          </button>

          <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <img
              src={adminImage}
              alt="Admin"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="hidden text-sm font-medium text-slate-700 sm:inline">
              {adminName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}