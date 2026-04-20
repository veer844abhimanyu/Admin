"use client";

import Toggle from "./Toggle";
import { FaqItem } from "./types";

type FaqTabProps = {
  showFaq: boolean;
  toggleFaq: () => void;
  faqs: FaqItem[];
  addFaq: () => void;
  updateFaq: (id: number, field: "title" | "content", value: string) => void;
  removeFaq: (id: number) => void;
};

export function FaqTab({ showFaq, toggleFaq, faqs, addFaq, updateFaq, removeFaq }: FaqTabProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
          <label className="text-sm text-slate-700">Show FAQ</label>
          <Toggle checked={showFaq} onChange={toggleFaq} />
        </div>

        {showFaq && (
          <>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="overflow-hidden rounded border border-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <span>⋮⋮</span>
                      <span>{faq.title || "Untitled"}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFaq(faq.id)}
                      className="text-sm text-slate-500 hover:text-red-600"
                    >
                      🗑
                    </button>
                  </div>

                  <div className="space-y-5 p-4">
                    <div>
                      <label className="mb-2 block text-sm text-slate-700">Title</label>
                      <input
                        type="text"
                        value={faq.title}
                        onChange={(e) => updateFaq(faq.id, "title", e.target.value)}
                        className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-slate-700">Content</label>

                      <div className="overflow-hidden rounded border border-slate-300">
                        <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                          <select className="rounded border border-slate-200 bg-white px-2 py-1 text-xs outline-none">
                            <option>Paragraph</option>
                          </select>
                          <button type="button" className="font-bold">B</button>
                          <button type="button" className="italic">I</button>
                          <button type="button" className="underline">U</button>
                          <button type="button">≡</button>
                          <button type="button">❝</button>
                          <button type="button">🔗</button>
                          <button type="button">🖼</button>
                          <button type="button">☰</button>
                        </div>

                        <textarea
                          value={faq.content}
                          onChange={(e) => updateFaq(faq.id, "content", e.target.value)}
                          rows={10}
                          className="w-full resize-none px-3 py-3 text-sm outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => alert("FAQ updated")}
                        className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={addFaq}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                ⊕ Add New FAQ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}