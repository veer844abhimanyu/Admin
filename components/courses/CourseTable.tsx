"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Users, Pencil } from "lucide-react";
import { Course, CourseStatus, StatusConfig } from "@/types/course";
import { STATUS_CONFIG } from "@/lib/courseConstants";
import { confirmDelete } from "@/lib/courseUtils";

interface CourseTableProps {
  courses: Course[];
  selectedRows: number[];
  onToggleSelectAll: () => void;
  onToggleSelectRow: (id: number) => void;
  onPublish: (id: number) => void;
  onMoveToTrash: (id: number) => void;
  onMoveToDraft: (id: number) => void;
  onMakePrivate: (id: number) => void;
  onDeletePermanently: (id: number) => void;
  allVisibleSelected: boolean;
}

export default function CourseTable({
  courses,
  selectedRows,
  onToggleSelectAll,
  onToggleSelectRow,
  onPublish,
  onMoveToTrash,
  onMoveToDraft,
  onMakePrivate,
  onDeletePermanently,
  allVisibleSelected,
}: CourseTableProps) {
  const router = useRouter();

  const handleDeleteClick = (id: number) => {
    if (
      confirmDelete(
        "Are you sure you want to delete this course permanently? This action cannot be undone."
      )
    ) {
      onDeletePermanently(id);
    }
  };

  if (courses.length === 0) {
    return (
      <div className="px-4 py-10 text-center text-sm text-slate-500">
        No courses found.
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:grid md:grid-cols-[50px_2fr_1.6fr_1.6fr_1fr_1fr_1.4fr_240px] md:items-center md:bg-slate-50 md:px-4 md:py-4 md:text-xs md:font-semibold md:uppercase md:text-slate-700">
        <div>
          <input
            type="checkbox"
            checked={allVisibleSelected}
            onChange={onToggleSelectAll}
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
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white px-4 py-4 transition hover:bg-slate-50"
          >
            <div className="hidden md:grid md:grid-cols-[50px_2fr_1.6fr_1.6fr_1fr_1fr_1.4fr_240px] md:items-center md:gap-3">
              <div>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(course.id)}
                  onChange={() => onToggleSelectRow(course.id)}
                  className="h-4 w-4 rounded border-slate-300"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-semibold text-slate-800">
                    {course.title}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATUS_CONFIG[course.status].color}`}
                  >
                    {STATUS_CONFIG[course.status].label}
                  </span>
                </div>
              </div>

              <div className="text-sm text-slate-600">{course.category}</div>

              <div className="flex items-center gap-2 text-sm text-slate-700">
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

                <Link
                  href={`/courses/${course.id}/builder`}
                  className="inline-flex items-center gap-2 rounded-lg border border-purple-500 px-3 py-2 text-sm font-medium text-purple-600 transition hover:bg-purple-50"
                >
                  Builder
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
