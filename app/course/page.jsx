"use client";
// import AdminTopbar from "@/components/Admin/AdminTopbar";
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { BookOpen, Plus, Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CoursePage() {
  const [courses, setCourses] = useState([
    { id: 1, title: "Ayurvedic Basics", category: "Yoga and Meditation", price: "₹1999", status: "Active" },
    { id: 2, title: "Advanced Nutrition", category: "Healthy Diet", price: "₹2499", status: "Draft" },
    { id: 3, title: "Meditation Techniques", category: "Yoga and Meditation", price: "₹999", status: "Active" },
  ]);

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl space-y-4 pb-12">
        {/* Breadcrumb */}
        <div className="flex justify-between items-center text-[13px] font-medium">
          <div className="text-gray-500">
            <Link href="/" className="hover:text-blue-500">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Courses</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#ffc107] px-5 py-3 text-gray-900">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-[17px] font-semibold">Courses List</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="h-9 rounded-md border-0 px-3 pr-8 text-sm outline-none ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-black text-gray-800 bg-white/90 placeholder:text-gray-500 w-[200px]"
                />
                <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-500" />
              </div>
              <Link
                href="/addcourse"
                className="flex items-center gap-1.5 rounded-md bg-gray-900 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Course
              </Link>
            </div>
          </div>

          {/* Course List / Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold">Course Title</th>
                  <th scope="col" className="px-6 py-4 font-bold">Category</th>
                  <th scope="col" className="px-6 py-4 font-bold">Price</th>
                  <th scope="col" className="px-6 py-4 font-bold">Status</th>
                  <th scope="col" className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{course.title}</td>
                    <td className="px-6 py-4">{course.category}</td>
                    <td className="px-6 py-4 font-medium">{course.price}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <button className="hover:text-blue-600 transition-colors p-1" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="hover:text-red-600 transition-colors p-1" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {courses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      No courses found. Click "Add Course" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-3">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">3</span> of <span className="font-medium text-gray-900">3</span> results
            </div>
            <div className="flex gap-2">
              <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}