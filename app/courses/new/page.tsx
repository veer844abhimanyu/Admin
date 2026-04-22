
"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Eye,
  FileText,
  ImageIcon,
  Info,
  Lock,
  Plus,
  Save,
  Settings,
  Upload,
} from "lucide-react";

const CkEditorField = dynamic(() => import("@/components/CkEditorField"), {
  ssr: false,
});

type Category = {
  id: number;
  name: string;
  checked: boolean;
};

export default function NewCoursePage() {
  const router = useRouter();
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseHighlights, setCourseHighlights] = useState(".");
  const [featured, setFeatured] = useState(false);
  const [slug, setSlug] = useState("");

  const [categories, setCategories] = useState<Category[]>([
    // { id: 1, name: "class", checked: false },
    // { id: 2, name: "Build Your First Course", checked: false },
    // { id: 3, name: "Monetize & Grow Your Academy", checked: false },
    // { id: 4, name: "Engage & Retain Your Learners", checked: false },
    // { id: 5, name: "Customize & Automate Your", checked: true },
  ]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddCategoryInput, setShowAddCategoryInput] = useState(false);

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredVideo, setFeaturedVideo] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const toggleCategory = (id: number) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();

    if (!trimmed) return;

    const alreadyExists = categories.some(
      (item) => item.name.toLowerCase() === trimmed.toLowerCase(),
    );

    if (alreadyExists) {
      alert("Category already exists");
      return;
    }

    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: trimmed,
        checked: true,
      },
    ]);

    setNewCategoryName("");
    setShowAddCategoryInput(false);
  };

  const removeCategory = (id: number) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFeaturedImage(file);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFeaturedVideo(file);
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setAttachments((prev) => [...prev, ...files]);
    }
  };

  const handlePreview = () => {
    alert("Preview clicked");
  };

  const handlePublish = () => {
    const selectedCategories = categories
      .filter((item) => item.checked)
      .map((item) => item.name);

    if (!courseName.trim()) {
      alert("Please enter a course name");
      return;
    }

    const newCourse = {
      id: Date.now(),
      title: courseName,
      category: selectedCategories[0] || "Uncategorized",
      instructor: "Admin Team",
      priceType: "free" as const,
      students: 0,
      date: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      status: "published" as const,
    };

    try {
      const existingCoursesRaw = localStorage.getItem("admin_courses");
      const existingCourses = existingCoursesRaw
        ? JSON.parse(existingCoursesRaw)
        : [];
      const updatedCourses = [newCourse, ...existingCourses];
      localStorage.setItem("admin_courses", JSON.stringify(updatedCourses));

      alert("Course published successfully!");
      router.push("/courses");
    } catch (e) {
      console.error("Failed to publish course", e);
      alert("Failed to publish course. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <div className="border-b border-slate-200 bg-white">
        <div className="flex flex-col gap-4 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                <FileText className="h-4 w-4" />
              </div>
              <span className="font-medium text-slate-700">Overview</span>
            </div>

            <div className="h-px w-8 bg-slate-300" />

            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Lock className="h-4 w-4" />
              </div>
              <span>Builder</span>
            </div>

            <div className="h-px w-8 bg-slate-300" />

            <Link
              href="/courses/settings"
              className="flex cursor-pointer items-center gap-2 hover:text-blue-600"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Settings className="h-4 w-4" />
              </div>
              <span>Settings</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Reports
            </button>

            <button
              onClick={handlePreview}
              className="rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
            >
              Preview
            </button>

            <button
              onClick={handlePublish}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              Publish
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_280px] lg:p-6">
        <div className="rounded-sm bg-white p-4">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Course Name
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="h-10 w-full rounded-sm border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Course Description
              </label>

              <CkEditorField
                value={courseDescription}
                onChange={setCourseDescription}
                placeholder="Write your course description here..."
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-600">
                Course Highlights
              </label>
              <textarea
                value={courseHighlights}
                onChange={(e) => setCourseHighlights(e.target.value)}
                rows={3}
                className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Back to Courses
              </Link>

              <button
                onClick={handlePublish}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Course
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-sm bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">Featured</span>
            <button
              onClick={() => setFeatured((prev) => !prev)}
              className={`relative h-6 w-11 rounded-full transition ${
                featured ? "bg-blue-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                  featured ? "left-5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Categories
            </label>

            <div className="rounded-sm border border-slate-300 p-2">
              <div className="mb-2 flex items-center gap-2 rounded border border-slate-200 px-2 py-2">
                <input
                  type="text"
                  placeholder="Search Categories"
                  className="w-full text-xs outline-none"
                />
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </div>

              <div className="max-h-36 space-y-2 overflow-y-auto pr-1">
                {categories.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 text-xs text-slate-600"
                  >
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleCategory(item.id)}
                        className="h-3.5 w-3.5"
                      />
                      {item.name}
                    </label>

                    <button
                      type="button"
                      onClick={() => removeCategory(item.id)}
                      className="text-[11px] text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {showAddCategoryInput && (
                <div className="mt-3 space-y-2">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Enter category name"
                    className="h-9 w-full rounded border border-slate-300 px-3 text-xs outline-none focus:border-blue-500"
                  />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowAddCategoryInput(false);
                        setNewCategoryName("");
                      }}
                      className="rounded border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {!showAddCategoryInput && (
                <button
                  type="button"
                  onClick={() => setShowAddCategoryInput(true)}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add New Category
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Course Slug"
              className="h-10 w-full rounded-sm border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Featured Image
            </label>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <button
              onClick={() => imageInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center rounded-sm border border-dashed border-slate-300 px-4 py-8 text-center hover:bg-slate-50"
            >
              <ImageIcon className="mb-2 h-5 w-5 text-slate-500" />
              <span className="text-xs font-medium text-blue-600">
                Upload Image
              </span>
              <span className="mt-2 text-[11px] text-slate-500">
                JPG and PNG formats, Max size 64 MB
              </span>
              {featuredImage && (
                <span className="mt-2 text-[11px] text-slate-700">
                  {featuredImage.name}
                </span>
              )}
            </button>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-slate-600">
              Featured Video
            </label>

            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
            />

            <button
              onClick={() => videoInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center rounded-sm border border-dashed border-slate-300 px-4 py-8 text-center hover:bg-slate-50"
            >
              <Upload className="mb-2 h-5 w-5 text-slate-500" />
              <span className="text-xs font-medium text-blue-600">
                Upload Video
              </span>
              <span className="mt-2 text-[11px] text-slate-500">
                MP4 and WebM formats, Max size 64 MB
              </span>
              {featuredVideo && (
                <span className="mt-2 text-[11px] text-slate-700">
                  {featuredVideo.name}
                </span>
              )}
            </button>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-1">
              <label className="text-xs font-medium text-slate-600">
                Attachments
              </label>
              <Info className="h-3.5 w-3.5 text-slate-400" />
            </div>

            <input
              ref={attachmentInputRef}
              type="file"
              multiple
              onChange={handleAttachmentChange}
              className="hidden"
            />

            <button
              onClick={() => attachmentInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center rounded-sm border border-dashed border-slate-300 px-4 py-8 text-center hover:bg-slate-50"
            >
              <Upload className="mb-2 h-5 w-5 text-slate-500" />
              <span className="text-[11px] text-slate-600">
                Drop documents or click here to upload
              </span>
              <span className="mt-3 rounded border border-blue-300 px-3 py-1 text-[11px] font-medium text-blue-600">
                WP Media Library
              </span>
            </button>

            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="rounded border border-slate-200 px-3 py-2 text-xs text-slate-700"
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={handlePreview}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Eye className="h-4 w-4" />
              Preview Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
