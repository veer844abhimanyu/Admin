

"use client";

import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminTopbar({
  setOpen,
  collapsed,
  setCollapsed,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-md p-2 hover:bg-slate-100"
        >
          <Menu className="h-6 w-6 text-slate-700" />
        </button>

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="hidden rounded-md p-2 hover:bg-slate-100 lg:inline-flex"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-6 w-6 text-slate-700" />
          ) : (
            <PanelLeftClose className="h-6 w-6 text-slate-700" />
          )}
        </button>

        <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="Admin"
          className="h-10 w-10 rounded-full object-cover"
        />
        <span className="hidden font-medium text-slate-700 sm:inline">Admin</span>
      </div>
    </div>
  );
}