"use client";

import { useMemo, useState } from "react";
import { Pencil, Search, X } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

type MetaItem = {
  id: number;
  metaTitle: string;
  metaKeywords: string;
  description: string;
  page: string;
};

type ModalType = null | "addMeta" | "editMeta";

const initialMetaItems: MetaItem[] = [
  {
    id: 1,
    metaTitle: "Vaidya Tool Ayurveda Self Diagnosis Practice - Symptom Checker",
    metaKeywords:
      "Vaidya Manager software,Ayurvedic Diagnostic Tool,Symptom Checker,Self diagnosis",
    description:
      "Unlock the Power of Ayurveda with Vaidya Tool for Enhanced Practice! Upgrade Your Ayurveda Skills with Vaidya Tool Self Diagnosis. Try it Now!",
    page: "Self Diagnosis",
  },
  {
    id: 2,
    metaTitle: "Best Online ayurveda courses In India - Ayush Yogi",
    metaKeywords:
      "best ayurveda ,Pulse Diagnosis , Nadi Pariksha - online Certificate Course in india",
    description:
      "Best Ayurveda & pulse diagnosis online certificate course for holistic wellness, Nadi Pariksha course for beginner - ayushyog ayurveda humans",
    page: "humans",
  },
  {
    id: 3,
    metaTitle: "Basic ayurveda,medical astrology & telepathy course for beginner",
    metaKeywords:
      "Nadi Pariksha Course, ayurveda beginner student course, diy & cat course,",
    description:
      "Explore the world of Ayurveda, medical astrology, and telepathy with our beginner-friendly course. Unlock ancient wisdom for holistic well-being. Join now",
    page: "Online Classes",
  },
  {
    id: 4,
    metaTitle: "Consult With Best Online Ayurvedic Doctor,Consult Online Free",
    metaKeywords:
      "Best Online Ayurvedic Doctor, Online Ayurvedic Doctor, Dr booking, quick book doctor,",
    description:
      "Book Appointment for Best Indian Ayurvedic Doctor and Vaidya, Talk To India’s Best Spiritual Guru.",
    page: "Book Appointment",
  },
  {
    id: 5,
    metaTitle:
      "Money Earning Top 10 best Sites,Best Refer And Earn Website In Online,",
    metaKeywords:
      "Money Earning Top 10 Best Sites, Refer And Earn Website, Share and Earn, Ayushyogi",
    description:
      "Share Website Link With Friends And Family. Get A Chance To Buy All Our Products And Enter Ayushyogi Online Class For Free.",
    page: "Share & Earn",
  },
];

export default function MetaDescPage() {
  const [items, setItems] = useState<MetaItem[]>(initialMetaItems);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedItem, setSelectedItem] = useState<MetaItem | null>(null);

  const [form, setForm] = useState({
    metaTitle: "",
    metaKeywords: "",
    description: "",
    page: "",
  });

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return items;

    return items.filter((item) =>
      [item.metaTitle, item.metaKeywords, item.description, item.page]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [items, search]);

  const resetForm = () => {
    setForm({
      metaTitle: "",
      metaKeywords: "",
      description: "",
      page: "",
    });
  };

  const handleAdd = () => {
    if (!form.metaTitle.trim() || !form.metaKeywords.trim() || !form.description.trim()) {
      return;
    }

    const newItem: MetaItem = {
      id: Date.now(),
      metaTitle: form.metaTitle,
      metaKeywords: form.metaKeywords,
      description: form.description,
      page: form.page || "General",
    };

    setItems((prev) => [newItem, ...prev]);
    resetForm();
    setModal(null);
  };

  const openEditModal = (item: MetaItem) => {
    setSelectedItem(item);
    setForm({
      metaTitle: item.metaTitle,
      metaKeywords: item.metaKeywords,
      description: item.description,
      page: item.page,
    });
    setModal("editMeta");
  };

  const handleUpdate = () => {
    if (!selectedItem) return;
    if (!form.metaTitle.trim() || !form.metaKeywords.trim() || !form.description.trim()) {
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              metaTitle: form.metaTitle,
              metaKeywords: form.metaKeywords,
              description: form.description,
              page: form.page,
            }
          : item
      )
    );

    setSelectedItem(null);
    resetForm();
    setModal(null);
  };

  return (
    <AdminLayout>
      <div className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Meta & Description</h1>
            <p className="mt-1 text-sm text-gray-500">Home / Meta & Description</p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setModal("addMeta");
            }}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            type="button"
          >
            Add Meta
          </button>
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
            <span className="ml-1 font-semibold text-gray-700">{filteredItems.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-[1200px] w-full">
            <thead className="bg-gray-50 text-left text-sm text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Meta Title</th>
                <th className="px-4 py-3 font-semibold">Meta Keywords</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Page</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 align-top">
                  <td className="px-4 py-3 text-gray-800">
                    <p className="min-w-[220px] max-w-[260px]">{item.metaTitle}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <p className="min-w-[220px] max-w-[260px]">{item.metaKeywords}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <p className="min-w-[320px] max-w-[380px]">{item.description}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                      {item.page}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-slate-500 hover:text-blue-600"
                      type="button"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-500">
                    No meta records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal
          open={modal === "addMeta"}
          title="Add Meta"
          onClose={() => {
            setModal(null);
            resetForm();
          }}
        >
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Meta title"
              value={form.metaTitle}
              onChange={(e) => setForm((prev) => ({ ...prev, metaTitle: e.target.value }))}
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <textarea
              placeholder="Meta keywords"
              value={form.metaKeywords}
              onChange={(e) => setForm((prev) => ({ ...prev, metaKeywords: e.target.value }))}
              className="min-h-[100px] rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="min-h-[120px] rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Page"
              value={form.page}
              onChange={(e) => setForm((prev) => ({ ...prev, page: e.target.value }))}
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleAdd}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              type="button"
            >
              Add Meta
            </button>
          </div>
        </Modal>

        <Modal
          open={modal === "editMeta"}
          title="Edit Meta"
          onClose={() => {
            setModal(null);
            setSelectedItem(null);
            resetForm();
          }}
        >
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Meta title"
              value={form.metaTitle}
              onChange={(e) => setForm((prev) => ({ ...prev, metaTitle: e.target.value }))}
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <textarea
              placeholder="Meta keywords"
              value={form.metaKeywords}
              onChange={(e) => setForm((prev) => ({ ...prev, metaKeywords: e.target.value }))}
              className="min-h-[100px] rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="min-h-[120px] rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Page"
              value={form.page}
              onChange={(e) => setForm((prev) => ({ ...prev, page: e.target.value }))}
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleUpdate}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              type="button"
            >
              Update Meta
            </button>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}