"use client";
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  ChevronDown,
  Download,
  Calendar,
  Users,
  MoreVertical,
  Pencil,
  Settings,
} from "lucide-react";

type CourseStatus = "published" | "draft" | "trash" | "private";

type Course = {
  id: number;
  title: string;
  category: string;
  instructor: string;
  priceType: "free" | "paid";
  students: number;
  date: string;
  status: CourseStatus;
};

const initialCourses: Course[] = [
  // {
  //   id: 1,
  //   title: "Untitled Course",
  //   category: "Uncategorized",
  //   instructor: "Masteriyo Team",
  //   priceType: "free",
  //   students: 0,
  //   date: "2026-04-04 04:38 PM",
  //   status: "draft",
  // },
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

const tabs = [
  { key: "all", label: "All Courses" },
  { key: "published", label: "Published" },
  { key: "draft", label: "Draft" },
  { key: "trash", label: "Trash" },
  { key: "private", label: "Private" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.category)));
    return ["all", ...unique];
  }, [courses]);

  const counts = useMemo(() => {
    return {
      all: courses.length,
      published: courses.filter((c) => c.status === "published").length,
      draft: courses.filter((c) => c.status === "draft").length,
      trash: courses.filter((c) => c.status === "trash").length,
      private: courses.filter((c) => c.status === "private").length,
    };
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesTab =
        activeTab === "all" ? true : course.status === activeTab;

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

  const allVisibleSelected =
    filteredCourses.length > 0 &&
    filteredCourses.every((course) => selectedRows.includes(course.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedRows((prev) =>
        prev.filter(
          (id) => !filteredCourses.some((course) => course.id === id),
        ),
      );
    } else {
      const visibleIds = filteredCourses.map((course) => course.id);
      setSelectedRows((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const toggleSelectRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // const handleEdit = (id: number) => {
  //   const newTitle = window.prompt("Enter new course title:");
  //   if (!newTitle?.trim()) return;

  //   setCourses((prev) =>
  //     prev.map((course) =>
  //       course.id === id ? { ...course, title: newTitle.trim() } : course,
  //     ),
  //   );
  //   setOpenMenuId(null);
  // };

  const moveToTrash = (id: number) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, status: "trash" } : course,
      ),
    );
    setOpenMenuId(null);
  };

  const makePrivate = (id: number) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, status: "private" } : course,
      ),
    );
    setOpenMenuId(null);
  };

  const publishCourse = (id: number) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, status: "published" } : course,
      ),
    );
    setOpenMenuId(null);
  };

  const deletePermanently = (id: number) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
    setSelectedRows((prev) => prev.filter((item) => item !== id));
    setOpenMenuId(null);
  };

  const exportVisibleCourses = () => {
    const headers = [
      "Title",
      "Category",
      "Instructor",
      "Price",
      "Students",
      "Date",
      "Status",
    ];

    const rows = filteredCourses.map((course) => [
      `"${course.title.replace(/"/g, '""')}"`,
      `"${course.category}"`,
      `"${course.instructor}"`,
      `"${course.priceType}"`,
      `"${course.students}"`,
      `"${course.date}"`,
      `"${course.status}"`,
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n",
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "courses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
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
              <Plus className="h-4 w-4" />
              Add New Course
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
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
                onClick={exportVisibleCourses}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-blue-300 bg-white text-sm font-medium text-blue-600 transition hover:bg-blue-50"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <div className="hidden md:grid md:grid-cols-[50px_2fr_1.6fr_1.6fr_1fr_1fr_1.4fr_130px] md:items-center md:bg-slate-50 md:px-4 md:py-4 md:text-xs md:font-semibold md:uppercase md:text-slate-700">
              <div>
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-slate-300"
                />
              </div>
              <div>Title</div>
              <div>Categories</div>
              <div>Instructors</div>
              <div>Price</div>
              <div>Students</div>
              <div>Date</div>
              <div className="text-right">Actions</div>
            </div>

            <div className="divide-y divide-slate-200">
              {filteredCourses.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-slate-500">
                  No courses found.
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white px-4 py-4 transition hover:bg-slate-50"
                  >
                    <div className="hidden md:grid md:grid-cols-[50px_2fr_1.6fr_1.6fr_1fr_1fr_1.4fr_130px] md:items-center md:gap-3">
                      <div>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(course.id)}
                          onChange={() => toggleSelectRow(course.id)}
                          className="h-4 w-4 rounded border-slate-300"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-semibold text-slate-800">
                            {course.title}
                          </p>
                          {course.status === "draft" && (
                            <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                              DRAFT
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-slate-600">
                        {course.category}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                        {course.instructor}
                      </div>

                      <div className="text-sm font-medium capitalize text-slate-700">
                        {course.priceType}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="h-4 w-4" />
                        {course.date}
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            router.push("/courses/editcourse?id=" + course.id)
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-blue-500 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                        >
                          <Pencil className="h-4 w-4" />
                          Edit
                        </button>

                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenMenuId((prev) =>
                                prev === course.id ? null : course.id,
                              )
                            }
                            className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>

                          {openMenuId === course.id && (
                            <div className="absolute right-0 top-11 z-20 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                              <button
                                onClick={() => publishCourse(course.id)}
                                className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100"
                              >
                                Publish
                              </button>
                              <button
                                onClick={() => makePrivate(course.id)}
                                className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100"
                              >
                                Make Private
                              </button>
                              <button
                                onClick={() => moveToTrash(course.id)}
                                className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100"
                              >
                                Move to Trash
                              </button>
                              <button
                                onClick={() => deletePermanently(course.id)}
                                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                              >
                                Delete Permanently
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 md:hidden">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(course.id)}
                          onChange={() => toggleSelectRow(course.id)}
                          className="mt-1 h-4 w-4 rounded border-slate-300"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-slate-800">
                              {course.title}
                            </h3>
                            {course.status === "draft" && (
                              <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                                DRAFT
                              </span>
                            )}
                          </div>

                          <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
                            <p>
                              <span className="font-medium text-slate-700">
                                Category:
                              </span>{" "}
                              {course.category}
                            </p>
                            <p>
                              <span className="font-medium text-slate-700">
                                Instructor:
                              </span>{" "}
                              {course.instructor}
                            </p>
                            <p>
                              <span className="font-medium text-slate-700">
                                Price:
                              </span>{" "}
                              <span className="capitalize">
                                {course.priceType}
                              </span>
                            </p>
                            <p>
                              <span className="font-medium text-slate-700">
                                Students:
                              </span>{" "}
                              {course.students}
                            </p>
                            <p className="sm:col-span-2">
                              <span className="font-medium text-slate-700">
                                Date:
                              </span>{" "}
                              {course.date}
                            </p>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              onClick={() =>
                                router.push(
                                  "/courses/editcourse?id=" + course.id,
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-lg border border-blue-500 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                            >
                              <Pencil className="h-4 w-4" />
                              Edit
                            </button>

                            <button
                              onClick={() => publishCourse(course.id)}
                              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                            >
                              Publish
                            </button>

                            <button
                              onClick={() => makePrivate(course.id)}
                              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                            >
                              Private
                            </button>

                            <button
                              onClick={() => moveToTrash(course.id)}
                              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                            >
                              Trash
                            </button>

                            <button
                              onClick={() => deletePermanently(course.id)}
                              className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
