"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Eye, Pencil, Search, Trash2, X } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

type Blog = {
  id: number;
  image: string;
  title: string;
  status: "Published" | "Draft";
  updatedOn: string;
};

type ModalType = null | "addBlog" | "viewBlog" | "editBlog" | "deleteBlog";

const initialBlogs: Blog[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=200&auto=format&fit=crop",
    title:
      "Ayurvedic Agni and Ama: अग्नि व अमा कैसे समझें | अग्नि व रोगों सम्बन्ध",
    status: "Published",
    updatedOn: "21 Feb, 2026",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200&auto=format&fit=crop",
    title: "Learn Telepathy Online from Home - Step-by-Step Video Call Training Course",
    status: "Published",
    updatedOn: "13 Feb, 2026",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=200&auto=format&fit=crop",
    title: "सर्दी नजला: सिर दर्द नाकाम गर्दन दर्द से जुड़े और सरल घरेलू उपाय",
    status: "Published",
    updatedOn: "11 Jan, 2026",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=200&auto=format&fit=crop",
    title: "क्या vaccination के कारण autism हो सकता है |",
    status: "Published",
    updatedOn: "09 Jan, 2026",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=200&auto=format&fit=crop",
    title: "चरक संहिता अनुसार पित्त दोष उपचार के मुख्य आयाम",
    status: "Published",
    updatedOn: "05 Jan, 2026",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop",
    title: "नाड़ी द्वारा रोग पहचान - आयुर्वेद के वैज्ञानिक आधार व आधुनिक विश्लेषण",
    status: "Published",
    updatedOn: "15 Nov, 2025",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=200&auto=format&fit=crop",
    title: "Pitta ke prakar aur unke कार्य क्षेत्र | Five Types of Pitta Dosha",
    status: "Published",
    updatedOn: "29 Oct, 2025",
  },
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const [blogForm, setBlogForm] = useState({
    title: "",
    image: "",
    status: "Published" as "Published" | "Draft",
  });

  const filteredBlogs = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return blogs;

    return blogs.filter((blog) =>
      [blog.title, blog.status, blog.updatedOn].join(" ").toLowerCase().includes(q)
    );
  }, [blogs, search]);

  const resetForm = () => {
    setBlogForm({
      title: "",
      image: "",
      status: "Published",
    });
  };

  const openViewModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setModal("viewBlog");
  };

  const openEditModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setBlogForm({
      title: blog.title,
      image: blog.image,
      status: blog.status,
    });
    setModal("editBlog");
  };

  const openDeleteModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setModal("deleteBlog");
  };

  const handleAddBlog = () => {
    if (!blogForm.title.trim()) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newBlog: Blog = {
      id: Date.now(),
      title: blogForm.title,
      image:
        blogForm.image.trim() ||
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=200&auto=format&fit=crop",
      status: blogForm.status,
      updatedOn: today,
    };

    console.log("Blog Added:", newBlog);
    setBlogs((prev) => [newBlog, ...prev]);
    resetForm();
    setModal(null);
  };

  const handleUpdateBlog = () => {
    if (!selectedBlog || !blogForm.title.trim()) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const updatedBlog: Blog = {
      ...selectedBlog,
      title: blogForm.title,
      image: blogForm.image.trim() || selectedBlog.image,
      status: blogForm.status,
      updatedOn: today,
    };

    console.log("Blog Updated:", updatedBlog);
    setBlogs((prev) =>
      prev.map((blog) => (blog.id === selectedBlog.id ? updatedBlog : blog))
    );

    resetForm();
    setSelectedBlog(null);
    setModal(null);
  };

  const handleDeleteBlog = () => {
    if (!selectedBlog) return;

    setBlogs((prev) => prev.filter((blog) => blog.id !== selectedBlog.id));
    setSelectedBlog(null);
    setModal(null);
  };

  return (
    <AdminLayout>
      <div className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">List of Blogs</h1>
            <p className="mt-1 text-sm text-gray-500">Home / Blogs</p>
          </div>

          <Link
            href="/addblog"
            className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
          >
            Add Blog
          </Link>
        </div>

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm outline-none transition focus:border-blue-500"
            />
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="text-sm text-gray-500">
            Total:
            <span className="ml-1 font-semibold text-gray-700">{filteredBlogs.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-[1000px] w-full">
            <thead className="bg-gray-50 text-left text-sm text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Img</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Updated on</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-800">
                    <p className="max-w-[620px] line-clamp-2">{blog.title}</p>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium ${
                        blog.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-700">{blog.updatedOn}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openViewModal(blog)}
                        className="text-slate-500 hover:text-blue-600"
                        type="button"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => openEditModal(blog)}
                        className="text-slate-500 hover:text-green-600"
                        type="button"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => openDeleteModal(blog)}
                        className="text-slate-500 hover:text-red-600"
                        type="button"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredBlogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-500">
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal
          open={modal === "addBlog"}
          title="Add Blog"
          onClose={() => {
            setModal(null);
            resetForm();
          }}
        >
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Blog title"
              value={blogForm.title}
              onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value }))}
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={blogForm.image}
              onChange={(e) => setBlogForm((prev) => ({ ...prev, image: e.target.value }))}
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <select
              value={blogForm.status}
              onChange={(e) =>
                setBlogForm((prev) => ({
                  ...prev,
                  status: e.target.value as "Published" | "Draft",
                }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>

            <button
              onClick={handleAddBlog}
              className="mt-2 rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              type="button"
            >
              Add Blog
            </button>
          </div>
        </Modal>

        <Modal
          open={modal === "viewBlog"}
          title="View Blog"
          onClose={() => {
            setModal(null);
            setSelectedBlog(null);
          }}
        >
          {selectedBlog && (
            <div className="space-y-4">
              <div className="relative h-52 w-full overflow-hidden rounded-xl border border-gray-200">
                <Image
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800">{selectedBlog.title}</h3>
                <p className="mt-2 text-sm text-gray-500">Status: {selectedBlog.status}</p>
                <p className="mt-1 text-sm text-gray-500">Updated on: {selectedBlog.updatedOn}</p>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          open={modal === "editBlog"}
          title="Edit Blog"
          onClose={() => {
            setModal(null);
            setSelectedBlog(null);
            resetForm();
          }}
        >
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Blog title"
              value={blogForm.title}
              onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value }))}
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={blogForm.image}
              onChange={(e) => setBlogForm((prev) => ({ ...prev, image: e.target.value }))}
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <select
              value={blogForm.status}
              onChange={(e) =>
                setBlogForm((prev) => ({
                  ...prev,
                  status: e.target.value as "Published" | "Draft",
                }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>

            <button
              onClick={handleUpdateBlog}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              type="button"
            >
              Update Blog
            </button>
          </div>
        </Modal>

        <Modal
          open={modal === "deleteBlog"}
          title="Delete Blog"
          onClose={() => {
            setModal(null);
            setSelectedBlog(null);
          }}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this blog?
            </p>

            {selectedBlog && (
              <div className="rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
                {selectedBlog.title}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleDeleteBlog}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                type="button"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setModal(null);
                  setSelectedBlog(null);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
}

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}
