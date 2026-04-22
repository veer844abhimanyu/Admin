"use client";

import { useMemo, useState } from "react";
import { Course, TabKey, CourseCounts } from "@/types/course";

interface UseCourseFilterReturn {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  search: string;
  setSearch: (search: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPricing: string;
  setSelectedPricing: (pricing: string) => void;
  filteredCourses: Course[];
  categories: string[];
  counts: CourseCounts;
}

export function useCourseFilter(courses: Course[]): UseCourseFilterReturn {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState("all");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.category)));
    return ["all", ...unique];
  }, [courses]);

  const counts = useMemo(() => {
    return {
      all: courses.filter((c) => c.status !== "trash").length,
      published: courses.filter((c) => c.status === "published").length,
      draft: courses.filter((c) => c.status === "draft").length,
      trash: courses.filter((c) => c.status === "trash").length,
      private: courses.filter((c) => c.status === "private").length,
    };
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesTab =
        activeTab === "all"
          ? course.status !== "trash"
          : course.status === activeTab;

      const matchesSearch = course.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all"
          ? true
          : course.category === selectedCategory;

      const matchesPricing =
        selectedPricing === "all" ? true : course.priceType === selectedPricing;

      return matchesTab && matchesSearch && matchesCategory && matchesPricing;
    });
  }, [courses, activeTab, search, selectedCategory, selectedPricing]);

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedPricing,
    setSelectedPricing,
    filteredCourses,
    categories,
    counts,
  };
}
