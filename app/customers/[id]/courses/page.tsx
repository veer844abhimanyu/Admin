"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { Customer, getCustomers, initialCustomers } from "@/lib/customersStorage";
import { initialCourses } from "@/lib/courseConstants";
import { getCustomerCourseEnrollments } from "@/lib/customerCourseEnrollments";
import { Course } from "@/types/course";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  Mail,
  Phone,
  Search,
  WalletCards,
} from "lucide-react";

function loadCustomers(): Customer[] {
  if (typeof window === "undefined") return initialCustomers;
  return getCustomers();
}

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

export default function CustomerCoursesPage() {
  const params = useParams();
  const customerId = Number(params.id);
  const [search, setSearch] = useState("");
  const [customers] = useState<Customer[]>(loadCustomers);
  const [courses] = useState<Course[]>(loadCourses);

  const customer = useMemo(
    () => customers.find((item) => item.id === customerId) || null,
    [customerId, customers]
  );

  const enrollments = useMemo(
    () => (customer ? getCustomerCourseEnrollments(customer.id, courses) : []),
    [courses, customer]
  );

  const filteredEnrollments = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return enrollments;

    return enrollments.filter((enrollment) =>
      [
        enrollment.courseTitle,
        enrollment.category,
        enrollment.instructor,
        enrollment.plan,
        enrollment.paymentStatus,
        enrollment.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [enrollments, search]);

  const paidCount = enrollments.filter(
    (enrollment) => enrollment.paymentStatus === "paid"
  ).length;
  const completedCount = enrollments.filter(
    (enrollment) => enrollment.status === "completed"
  ).length;
  const certificateCount = enrollments.filter(
    (enrollment) => enrollment.certificateIssued
  ).length;
  const averageProgress =
    enrollments.length === 0
      ? 0
      : Math.round(
          enrollments.reduce(
            (sum, enrollment) => sum + enrollment.progress,
            0
          ) / enrollments.length
        );

  if (!customer) {
    return (
      <AdminLayout>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">
            Customer not found
          </h1>
          <Link
            href="/customers"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Customers
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
              href="/customers"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Customers
            </Link>

            <div className="mt-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Enrolled Courses
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Complete course details for {customer.name}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm shadow-sm">
            <p className="font-semibold text-gray-900">{customer.name}</p>
            <p className="mt-1 flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4 text-gray-400" />
              {customer.phone}
            </p>
            <p className="mt-1 flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4 text-gray-400" />
              {customer.email || customer.address || "-"}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Courses"
            value={enrollments.length}
            icon={BookOpen}
            className="bg-blue-50 text-blue-600"
          />
          <SummaryCard
            title="Paid Courses"
            value={paidCount}
            icon={WalletCards}
            className="bg-green-50 text-green-600"
          />
          <SummaryCard
            title="Completed"
            value={completedCount}
            icon={CheckCircle2}
            className="bg-purple-50 text-purple-600"
          />
          <SummaryCard
            title="Avg Progress"
            value={`${averageProgress}%`}
            icon={GraduationCap}
            className="bg-amber-50 text-amber-600"
          />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <DetailItem label="Joined" value={customer.joined} />
            <DetailItem label="Last Login" value={customer.lastLogin} />
            <DetailItem label="PIN Code" value={customer.pinCode} />
            <DetailItem label="Certificates" value={String(certificateCount)} />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-200 p-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Complete Course Details
            </h2>

            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search courses"
                className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {filteredEnrollments.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              No enrolled courses found for this customer.
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[1120px] text-left text-sm">
                  <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-600">
                    <tr>
                      <th className="px-4 py-3">Course</th>
                      <th className="px-4 py-3">Instructor</th>
                      <th className="px-4 py-3">Plan</th>
                      <th className="px-4 py-3">Payment</th>
                      <th className="px-4 py-3">Progress</th>
                      <th className="px-4 py-3">Enrollment</th>
                      <th className="px-4 py-3">Validity</th>
                      <th className="px-4 py-3">Last Accessed</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <p className="font-semibold text-gray-900">
                            {enrollment.courseTitle}
                          </p>
                          <p className="text-xs text-gray-500">
                            {enrollment.category} | Course #{enrollment.courseId}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {enrollment.instructor}
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-800">
                            {enrollment.plan}
                          </p>
                          <p className="text-xs capitalize text-gray-500">
                            {enrollment.priceType}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-800">
                            INR {enrollment.amountPaid}
                          </p>
                          <p className="text-xs capitalize text-gray-500">
                            {enrollment.paymentStatus}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-800">
                            {enrollment.progress}%
                          </p>
                          <p className="text-xs text-gray-500">
                            {enrollment.completedLessons}/{enrollment.totalLessons} lessons
                          </p>
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          <span className="inline-flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {enrollment.enrollmentDate}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          <span className="inline-flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            {enrollment.validTill}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-700">
                          {enrollment.lastAccessed}
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold capitalize text-gray-700">
                            {enrollment.status}
                          </span>
                          {enrollment.certificateIssued && (
                            <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-green-700">
                              <Award className="h-3.5 w-3.5" />
                              Certificate
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-gray-100 lg:hidden">
                {filteredEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="space-y-3 p-4">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {enrollment.courseTitle}
                      </p>
                      <p className="text-xs text-gray-500">
                        {enrollment.category} | Course #{enrollment.courseId}
                      </p>
                    </div>

                    <div className="grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                      <p>Instructor: {enrollment.instructor}</p>
                      <p>Plan: {enrollment.plan}</p>
                      <p>Payment: INR {enrollment.amountPaid}</p>
                      <p>Progress: {enrollment.progress}%</p>
                      <p>Enrolled: {enrollment.enrollmentDate}</p>
                      <p>Valid till: {enrollment.validTill}</p>
                      <p>Last accessed: {enrollment.lastAccessed}</p>
                      <p className="capitalize">Status: {enrollment.status}</p>
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

function SummaryCard({
  title,
  value,
  icon: Icon,
  className,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  className: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${className}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-gray-500">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}
