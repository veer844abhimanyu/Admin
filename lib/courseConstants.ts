import { Course, CourseStatus, StatusConfig } from "@/types/course";

export const initialCourses: Course[] = [
  {
    id: 1,
    title: "abhi",
    category: "customer",
    instructor: "",
    priceType: "free",
    students: 0,
    date: "2026-04-04 04:38 PM",
    status: "draft",
  },
  {
    id: 2,
    title: "Untitled Course",
    category: "Uncategorized",
    instructor: "Masteriyo Team",
    priceType: "free",
    students: 0,
    date: "2026-04-04 04:30 PM",
    status: "draft",
  },
  {
    id: 3,
    title: "Untitled Course",
    category: "Uncategorized",
    instructor: "Masteriyo Team",
    priceType: "free",
    students: 0,
    date: "2026-04-04 04:29 PM",
    status: "draft",
  },
  {
    id: 4,
    title: "Cohort bring structure, community, and accountability",
    category: "Uncategorized",
    instructor: "Masteriyo Team",
    priceType: "free",
    students: 0,
    date: "2025-12-19 08:32 AM",
    status: "published",
  },
  {
    id: 5,
    title: "React Basics",
    category: "Web Development",
    instructor: "Admin Team",
    priceType: "paid",
    students: 42,
    date: "2026-03-11 10:20 AM",
    status: "published",
  },
  {
    id: 6,
    title: "Ayurveda Learning Intro",
    category: "Ayurveda",
    instructor: "Admin Team",
    priceType: "free",
    students: 18,
    date: "2026-03-25 03:15 PM",
    status: "private",
  },
];

export const COURSE_TABS = [
  { key: "all", label: "All Courses" },
  { key: "published", label: "Published" },
  { key: "draft", label: "Draft" },
  { key: "trash", label: "Trash" },
  { key: "private", label: "Private" },
] as const;

export const STATUS_CONFIG: Record<CourseStatus, StatusConfig> = {
  published: { label: "Published", color: "bg-green-50 text-green-700" },
  draft: { label: "Draft", color: "bg-blue-50 text-blue-700" },
  private: { label: "Private", color: "bg-amber-50 text-amber-700" },
  trash: { label: "Trash", color: "bg-red-50 text-red-700" },
};

export const CSV_HEADERS = [
  "Title",
  "Category",
  "Instructor",
  "Price",
  "Students",
  "Date",
  "Status",
] as const;
