"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { COURSE_TABS } from "@/lib/courseConstants";
import { TabKey, CourseCounts } from "@/types/course";

interface CourseTabNavigationProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  counts: CourseCounts;
}

export default function CourseTabNavigation({
  activeTab,
  setActiveTab,
  counts,
}: CourseTabNavigationProps) {
  return (
    <div className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            {COURSE_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as TabKey)}
                className={`border-b-2 pb-3 transition ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600 hover:text-blue-600"
                }`}
              >
                {tab.label}
                <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                  {counts[tab.key]}
                </span>
              </button>
            ))}

            <Link
              href="/courses/settings"
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>

          <Link
            href="/courses/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Course
          </Link>
        </div>
      </div>
    </div>
  );
}
