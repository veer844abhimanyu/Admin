export type CourseStatus = "published" | "draft" | "trash" | "private";

export type Course = {
  id: number;
  title: string;
  category: string;
  instructor: string;
  priceType: "free" | "paid";
  students: number;
  date: string;
  status: CourseStatus;
};

export type TabKey = "all" | "published" | "draft" | "trash" | "private";

export interface StatusConfig {
  label: string;
  color: string;
}

export interface CourseFilterState {
  activeTab: TabKey;
  search: string;
  selectedCategory: string;
  selectedPricing: string;
}

export interface CourseCounts {
  all: number;
  published: number;
  draft: number;
  trash: number;
  private: number;
}
