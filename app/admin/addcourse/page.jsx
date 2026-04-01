"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Globe, 
  Calendar, 
  Clock, 
  CalendarDays,
  IndianRupee,
  List
} from "lucide-react";

export default function AddCoursePage() {
  const router = useRouter();

  const handleSave = (e) => {
    e.preventDefault();
    alert("Course saved successfully!");
    router.push("/admin/course");
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 pb-12">
      {/* Breadcrumb */}
      <div className="flex justify-end text-[13px] text-gray-500 font-medium">
        <Link href="/admin" className="hover:text-blue-500">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/admin/course" className="hover:text-blue-500">Courses</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">Add Course</span>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2 bg-[#ffc107] px-5 py-3 text-gray-900">
          <BookOpen className="h-5 w-5" />
          <h2 className="text-[17px] font-semibold">Add New Course</h2>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSave}>
            
            {/* Title & Video Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Course Title<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center overflow-hidden rounded-md border border-gray-300 focus-within:border-[#ffc107] focus-within:ring-1 focus-within:ring-[#ffc107] transition-shadow">
                  <div className="flex h-10 w-12 items-center justify-center bg-gray-100 text-gray-500 border-r border-gray-300">
                    <FileText className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    className="h-10 w-full px-3 text-sm outline-none text-gray-700 font-medium"
                    placeholder="Enter course title"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Demo Video URL<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center overflow-hidden rounded-md border border-gray-300 focus-within:border-[#ffc107] focus-within:ring-1 focus-within:ring-[#ffc107] transition-shadow">
                  <div className="flex h-10 w-12 items-center justify-center bg-gray-100 text-gray-500 border-r border-gray-300">
                    <Video className="h-4 w-4" />
                  </div>
                  <input
                    type="url"
                    required
                    className="h-10 w-full px-3 text-sm outline-none text-gray-700 font-medium"
                    placeholder="https://youtube.com/... or Google Drive Link"
                  />
                </div>
              </div>
            </div>

            {/* Properties Row */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Language */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Language<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center overflow-hidden rounded-md border border-gray-300 focus-within:border-[#ffc107] focus-within:ring-1 focus-within:ring-[#ffc107] transition-shadow">
                  <div className="flex h-10 w-12 items-center justify-center bg-gray-100 text-gray-500 border-r border-gray-300">
                    <Globe className="h-4 w-4" />
                  </div>
                  <select required className="h-10 w-full px-3 text-sm outline-none text-gray-700 font-medium bg-white">
                    <option value="">Select Language</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Bilingual">Bilingual (Hindi + English)</option>
                  </select>
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Start Date<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center overflow-hidden rounded-md border border-gray-300 focus-within:border-[#ffc107] focus-within:ring-1 focus-within:ring-[#ffc107] transition-shadow">
                  <div className="flex h-10 w-12 items-center justify-center bg-gray-100 text-gray-500 border-r border-gray-300">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <input
                    type="date"
                    required
                    className="h-10 w-full px-3 text-sm outline-none text-gray-700 font-medium"
                  />
                </div>
              </div>

              {/* Timing */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Timing<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center overflow-hidden rounded-md border border-gray-300 focus-within:border-[#ffc107] focus-within:ring-1 focus-within:ring-[#ffc107] transition-shadow">
                  <div className="flex h-10 w-12 items-center justify-center bg-gray-100 text-gray-500 border-r border-gray-300">
                    <Clock className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    className="h-10 w-full px-3 text-sm outline-none text-gray-700 font-medium"
                    placeholder="e.g. 6:00 PM to 8:00 PM"
                  />
                </div>
              </div>

              {/* Validity */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Validity<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center overflow-hidden rounded-md border border-gray-300 focus-within:border-[#ffc107] focus-within:ring-1 focus-within:ring-[#ffc107] transition-shadow">
                  <div className="flex h-10 w-12 items-center justify-center bg-gray-100 text-gray-500 border-r border-gray-300">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    className="h-10 w-full px-3 text-sm outline-none text-gray-700 font-medium"
                    placeholder="e.g. 6 Months, Lifetime"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Basic Price (₹)<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center overflow-hidden rounded-md border border-gray-300 focus-within:border-[#ffc107] focus-within:ring-1 focus-within:ring-[#ffc107] transition-shadow">
                  <div className="flex h-10 w-12 items-center justify-center bg-gray-100 text-gray-500 border-r border-gray-300">
                    <IndianRupee className="h-4 w-4" />
                  </div>
                  <input
                    type="number"
                    required
                    min="0"
                    className="h-10 w-full px-3 text-sm outline-none text-gray-700 font-medium"
                    placeholder="e.g. 1999"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Premium Price (₹)<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center overflow-hidden rounded-md border border-gray-300 focus-within:border-[#ffc107] focus-within:ring-1 focus-within:ring-[#ffc107] transition-shadow">
                  <div className="flex h-10 w-12 items-center justify-center bg-gray-100 text-gray-500 border-r border-gray-300">
                    <IndianRupee className="h-4 w-4" />
                  </div>
                  <input
                    type="number"
                    required
                    min="0"
                    className="h-10 w-full px-3 text-sm outline-none text-gray-700 font-medium"
                    placeholder="e.g. 3999"
                  />
                </div>
              </div>
            </div>

            {/* Description Row */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-800">
                Course Description<span className="text-red-500">*</span>
              </label>
              <textarea
                required
                className="w-full rounded-md border border-gray-300 p-3 text-sm font-medium text-gray-700 outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] min-h-[120px] resize-y transition-shadow"
                placeholder="Enter comprehensive course description..."
              ></textarea>
            </div>

            {/* Course Curriculum Row */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-800">
                Course Curriculum<span className="text-red-500">*</span>
              </label>
              <div className="rounded-md border border-gray-300 overflow-hidden bg-[#f8f9fa] p-4">
                <p className="text-xs text-gray-500 mb-3 flex items-center gap-1 font-medium">
                  <List className="h-4 w-4" /> Provide syllabus or chapters (one per line)
                </p>
                <textarea
                  required
                  className="w-full rounded-md border border-gray-300 p-3 text-sm font-medium text-gray-700 outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] min-h-[160px] resize-y transition-shadow bg-white"
                  placeholder="Chapter 1: Introduction to Ayurveda&#10;Chapter 2: Agni and Ama&#10;Chapter 3: Body Constitution (Prakriti)"
                ></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex justify-end gap-3">
              <Link
                href="/admin/course"
                className="rounded-md border border-gray-300 bg-white px-6 py-2.5 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-md bg-[#ffc107] px-8 py-2.5 text-sm font-bold text-gray-900 shadow-sm hover:bg-amber-400 focus:outline-none transition-colors"
              >
                Save Course
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}