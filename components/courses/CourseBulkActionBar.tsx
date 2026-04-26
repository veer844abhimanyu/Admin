"use client";

import { confirmDelete } from "@/lib/courseUtils";

interface CourseBulkActionBarProps {
  selectedCount: number;
  onPublish: () => void;
  onDraft: () => void;
  onPrivate: () => void;
  onTrash: () => void;
  onDeletePermanently: () => void;
  onCancel: () => void;
}

export default function CourseBulkActionBar({
  selectedCount,
  onPublish,
  onDraft,
  onPrivate,
  onTrash,
  onDeletePermanently,
  onCancel,
}: CourseBulkActionBarProps) {
  const handleDeletePermanently = () => {
    if (
      confirmDelete(
        `Are you sure you want to delete ${selectedCount} courses permanently? This action cannot be undone.`
      )
    ) {
      onDeletePermanently();
    }
  };

  return (
    <div className="mb-4 mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 shadow-sm">
      <span className="text-sm font-semibold text-blue-700">
        {selectedCount} courses selected
      </span>

      <div className="hidden h-4 w-px bg-blue-200 sm:block" />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={onPublish}
          className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm transition hover:bg-blue-100"
        >
          Publish
        </button>
        <button
          onClick={onDraft}
          className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          Draft
        </button>
        <button
          onClick={onPrivate}
          className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          Private
        </button>
        <button
          onClick={onTrash}
          className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-amber-700 shadow-sm transition hover:bg-amber-100"
        >
          Trash
        </button>
        <button
          onClick={handleDeletePermanently}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-red-700"
        >
          Delete Permanently
        </button>
      </div>

      <button
        onClick={onCancel}
        className="ml-auto text-xs font-bold text-slate-500 hover:text-slate-700"
      >
        Cancel Selection
      </button>
    </div>
  );
}
