"use client";

import { Search, ChevronDown, Download } from "lucide-react";
import { exportCoursesToCSV } from "@/lib/courseUtils";
import { Course } from "@/types/course";

interface CourseFilterBarProps {
  search: string;
  setSearch: (search: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPricing: string;
  setSelectedPricing: (pricing: string) => void;
  categories: string[];
  filteredCourses: Course[];
  selectedRows: number[];
  courses: Course[];
}

export default function CourseFilterBar({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedPricing,
  setSelectedPricing,
  categories,
  filteredCourses,
  selectedRows,
  courses,
}: CourseFilterBarProps) {
  const handleExport = () => {
    const coursesToExport =
      selectedRows.length > 0
        ? courses.filter((c) => selectedRows.includes(c.id))
        : filteredCourses;

    exportCoursesToCSV(coursesToExport);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="relative lg:col-span-5">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search courses"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-500"
        />
      </div>

      <div className="relative lg:col-span-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          {categories
            .filter((category) => category !== "all")
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>

      <div className="relative lg:col-span-2">
        <select
          value={selectedPricing}
          onChange={(e) => setSelectedPricing(e.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="all">Pricing</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>

      <div className="lg:col-span-1">
        <button
          onClick={handleExport}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-blue-300 bg-white text-sm font-medium text-blue-600 transition hover:bg-blue-50"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </div>
  );
}
