"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users } from "lucide-react";
import { Course } from "@/types/course";
import { STATUS_CONFIG } from "@/lib/courseConstants";
import { confirmDelete } from "@/lib/courseUtils";

interface CourseCardProps {
  course: Course;
  selected: boolean;
  onToggleSelect: () => void;
  onPublish: (id: number) => void;
  onMoveToTrash: (id: number) => void;
  onMoveToDraft: (id: number) => void;
  onMakePrivate: (id: number) => void;
  onDeletePermanently: (id: number) => void;
}

export default function CourseCard({
  course,
  selected,
  onToggleSelect,
  onPublish,
  onMoveToTrash,
  onMoveToDraft,
  onMakePrivate,
  onDeletePermanently,
}: CourseCardProps) {
  const router = useRouter();

  const handleDeleteClick = () => {
    if (
      confirmDelete(
        "Are you sure you want to delete this course permanently? This action cannot be undone."
      )
    ) {
      onDeletePermanently(course.id);
    }
  };

  return (
    <div className="space-y-4 md:hidden">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggleSelect}
          className="mt-1 h-4 w-4 rounded border-slate-300"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-slate-800">{course.title}</h3>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATUS_CONFIG[course.status].color}`}
            >
              {STATUS_CONFIG[course.status].label}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <p>
              <span className="font-medium text-slate-700">Category:</span>{" "}
              {course.category}
            </p>
            <p>
              <span className="font-medium text-slate-700">Instructor:</span>{" "}
              {course.instructor}
            </p>
            <p>
              <span className="font-medium text-slate-700">Price:</span>{" "}
              <span className="capitalize">{course.priceType}</span>
            </p>
            <p>
              <span className="font-medium text-slate-700">Students:</span>{" "}
              <Link
                href={`/courses/${course.id}/students`}
                aria-label={`View enrolled students for ${course.title}`}
                className="ml-1 inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
              >
                <Users className="h-4 w-4" />
                {course.students}
              </Link>
            </p>
            <p className="sm:col-span-2">
              <span className="font-medium text-slate-700">Date:</span>{" "}
              {course.date}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() =>
                router.push("/courses/editcourse?id=" + course.id)
              }
              className="inline-flex items-center gap-2 rounded-lg border border-blue-500 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>

            <Link
              href={`/courses/${course.id}/builder`}
              className="inline-flex items-center gap-2 rounded-lg border border-purple-500 px-3 py-2 text-sm font-medium text-purple-600 transition hover:bg-purple-50"
            >
              Builder
            </Link>

            {course.status !== "published" && (
              <button
                onClick={() => onPublish(course.id)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Publish
              </button>
            )}

            {course.status === "trash" ? (
              <button
                onClick={() => onMoveToDraft(course.id)}
                className="rounded-lg border border-blue-300 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50"
              >
                Restore
              </button>
            ) : (
              <button
                onClick={() => onMoveToTrash(course.id)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Trash
              </button>
            )}

            {course.status !== "private" && course.status !== "trash" && (
              <button
                onClick={() => onMakePrivate(course.id)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Private
              </button>
            )}

            <button
              onClick={handleDeleteClick}
              className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
