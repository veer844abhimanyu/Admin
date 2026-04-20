"use client";

import React from "react";

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <h2 className="mb-6 text-lg font-semibold text-slate-800">{title}</h2>
      {children}
    </div>
  );
}
