"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { STATUS_CONFIG, initialCourses } from "@/lib/courseConstants";
import { getCourseEnrollments } from "@/lib/courseEnrollments";
import { Course } from "@/types/course";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Mail,
  Phone,
  Search,
  Users,
  WalletCards,
} from "lucide-react";

function loadCourses(): Course[] {
  if (typeof window === "undefined") return initialCourses;

  const saved = localStorage.getItem("admin_courses");
  if (!saved) return initialCourses;

  try {
    const parsed = JSON.parse(saved) as Course[];
    return Array.isArray(parsed) ? parsed : initialCourses;
  } catch {
    return initialCourses;
  }
}

export default function CourseStudentsPage() {
  const params = useParams();
  const courseId = Number(params.id);
  const [search, setSearch] = useState("");
  const [courses] = useState<Course[]>(loadCourses);

  const course = useMemo(
    () => courses.find((item) => item.id === courseId) || null,
    [courseId, courses]
  );

  const enrollments = useMemo(
    () => (course ? getCourseEnrollments(course.id, course.students) : []),
    [course]
  );

  const filteredEnrollments = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return enrollments;

    return enrollments.filter((student) =>
      [
        student.studentName,
        student.email,
        student.phone,
        student.city,
        student.plan,
        student.paymentStatus,
        student.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [enrollments, search]);

  const paidCount = enrollments.filter(
    (student) => student.paymentStatus === "paid"
  ).length;
  const completedCount = enrollments.filter(
    (student) => student.status === "completed"
  ).length;
  const averageProgress =
    enrollments.length === 0
      ? 0
      : Math.round(
          enrollments.reduce((sum, student) => sum + student.progress, 0) /
            enrollments.length
        );

  if (!course) {
    return (
      <AdminLayout>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-800">
            Course not found
          </h1>
          <Link
            href="/courses"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Link>

            <div className="mt-4">
              <h1 className="text-2xl font-bold text-slate-900">
                Enrolled Students
              </h1>
              <p className="mt-1 text-sm text-slate-500">{course.title}</p>
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${STATUS_CONFIG[course.status].color}`}
          >
            {STATUS_CONFIG[course.status].label}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Total Students
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {enrollments.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <WalletCards className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Paid Students
                </p>
                <p className="text-xl font-bold text-slate-900">{paidCount}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Completed
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {completedCount}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Avg Progress
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {averageProgress}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Category
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800">
                {course.category}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Instructor
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800">
                {course.instructor || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Pricing
              </p>
              <p className="mt-1 text-sm font-medium capitalize text-slate-800">
                {course.priceType}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">
                Created
              </p>
              <p className="mt-1 text-sm font-medium text-slate-800">
                {course.date}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Complete Student Details
            </h2>

            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search students"
                className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {filteredEnrollments.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No enrolled students found for this course.
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1120px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">City</th>
                      <th className="px-4 py-3">Plan</th>
                      <th className="px-4 py-3">Payment</th>
                      <th className="px-4 py-3">Progress</th>
                      <th className="px-4 py-3">Enrollment</th>
                      <th className="px-4 py-3">Last Active</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnrollments.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-900">
                            {student.studentName}
                          </p>
                          <p className="text-xs text-slate-500">
                            ID #{student.id}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="flex items-center gap-2 text-slate-700">
                            <Mail className="h-4 w-4 text-slate-400" />
                            {student.email}
                          </p>
                          <p className="mt-1 flex items-center gap-2 text-slate-700">
                            <Phone className="h-4 w-4 text-slate-400" />
                            {student.phone}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {student.city}
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {student.plan}
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-slate-800">
                            INR {student.amountPaid}
                          </p>
                          <p className="text-xs capitalize text-slate-500">
                            {student.paymentStatus}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-slate-800">
                            {student.progress}%
                          </p>
                          <p className="text-xs text-slate-500">
                            {student.completedLessons}/{student.totalLessons} lessons
                          </p>
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          <span className="inline-flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            {student.enrollmentDate}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {student.lastActive}
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold capitalize text-slate-700">
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-slate-100 lg:hidden">
                {filteredEnrollments.map((student) => (
                  <div key={student.id} className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {student.studentName}
                        </p>
                        <p className="text-xs text-slate-500">ID #{student.id}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold capitalize text-slate-700">
                        {student.status}
                      </span>
                    </div>

                    <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                      <p>{student.email}</p>
                      <p>{student.phone}</p>
                      <p>City: {student.city}</p>
                      <p>Plan: {student.plan}</p>
                      <p>Payment: INR {student.amountPaid}</p>
                      <p>Progress: {student.progress}%</p>
                      <p>Enrolled: {student.enrollmentDate}</p>
                      <p>Last active: {student.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
