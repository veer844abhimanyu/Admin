"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  Rss,
  FileText,
  ImageIcon,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const CkEditorField = dynamic(() => import("@/components/CkEditorField"), {
  ssr: false,
});

export default function AddBlogPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("blog_image");
  const [blogContent, setBlogContent] = useState("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Blog saved successfully!");
    router.push("/blogs");
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl space-y-4 pb-12">
        {/* Breadcrumb */}
        <div className="flex justify-end text-[13px] text-gray-500 font-medium">
          <Link href="/" className="hover:text-blue-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blogs" className="hover:text-blue-500">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Add Blog</span>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-2 bg-[#ffc107] px-5 py-3 text-gray-900">
            <Rss className="h-5 w-5" />
            <h2 className="text-[17px] font-semibold">Add Blog</h2>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form className="space-y-6" onSubmit={handleSave}>

              {/* Row 1 */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Blog Title */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-800">
                    Blog title<span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center overflow-hidden rounded-md border border-gray-300 focus-within:border-[#ffc107] focus-within:ring-1 focus-within:ring-[#ffc107] transition-shadow">
                    <div className="flex h-10 w-12 items-center justify-center bg-gray-100 text-gray-500 border-r border-gray-300">
                      <FileText className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      required
                      className="h-10 w-full px-3 text-sm outline-none text-gray-700 font-medium"
                      placeholder="Ayurvedic Agni and Ama: आम अच्यु..."
                    />
                  </div>
                </div>

                {/* Select Category */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-800">
                    Select category
                  </label>
                  <div className="relative">
                    <select className="h-10 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 pr-8 text-sm text-gray-700 font-medium outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] transition-shadow">
                      <option value="">Rog aur Ayurvedic Upchar</option>
                      <option value="yoga">Yoga and Meditation</option>
                      <option value="diet">Healthy Diet</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-800">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Upload Image */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-800">
                    Upload Image<span className="text-red-500">*</span>
                  </label>
                  <div
                    className="flex h-10 w-full items-center overflow-hidden rounded-md border border-gray-300 transition-shadow cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex h-full w-12 items-center justify-center bg-gray-100 text-gray-500 border-r border-gray-300">
                      <ImageIcon className="h-4 w-4" />
                    </div>
                    <div className="h-full flex-1 bg-white px-3 flex items-center text-sm font-medium text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
                      {fileName}
                    </div>
                    <div className="flex h-full items-center justify-center bg-gray-100 px-5 text-sm font-medium text-gray-700 border-l border-gray-300 hover:bg-gray-200">
                      Browse
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-800">
                    Meta Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="h-14 w-full rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700 outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] transition-shadow"
                    placeholder="Ayurvedic Agni and Ama: Treatment Principles..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-800">
                    Meta Desc<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    className="w-full rounded-md border border-gray-300 p-3 text-sm font-medium text-gray-700 outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] min-h-[56px] resize-none transition-shadow"
                    rows={2}
                    placeholder="आमा अवनया में पेंकर अझित..."
                  ></textarea>
                </div>
              </div>

              {/* Row 3 */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Slug <span className="text-sm font-semibold text-gray-800">(Etx ayush-yog-jalndhara-pnjah)</span>
                </label>
                <input
                  type="text"
                  className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm font-medium text-gray-700 outline-none focus:border-[#ffc107] focus:ring-1 focus:ring-[#ffc107] transition-shadow"
                  placeholder="aam-avastha-mein-chiktsa-kyon-nahi-karni-karni-chahiye"
                />
              </div>

              {/* Row 4: WYSIWYG */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-800">
                  Blog Content<span className="text-red-500">*</span>
                </label>

                <div className="rounded-md border border-gray-300 overflow-hidden focus-within:ring-1 focus-within:ring-[#ffc107] focus-within:border-[#ffc107] transition-shadow">
                  <CkEditorField
                    value={blogContent}
                    onChange={setBlogContent}
                    placeholder="Enter blog content here..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-[#ffc107] px-8 py-2.5 text-sm font-bold text-gray-900 shadow-sm hover:bg-amber-400 focus:outline-none transition-colors"
                >
                  Save Blog
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}