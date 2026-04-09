"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

type CouponStatus = "published" | "draft" | "trash";

type Coupon = {
  id: number;
  code: string;
  status: CouponStatus;
};

const initialCoupons: Coupon[] = [];

const tabs = [
  { key: "all", label: "All Coupons" },
  { key: "draft", label: "Draft" },
  { key: "trash", label: "Trash" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function CouponsPage() {
  const [coupons] = useState<Coupon[]>(initialCoupons);
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    return {
      all: coupons.length,
      draft: coupons.filter((item) => item.status === "draft").length,
      trash: coupons.filter((item) => item.status === "trash").length,
    };
  }, [coupons]);

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const matchesTab =
        activeTab === "all" ? true : coupon.status === activeTab;

      const matchesSearch = coupon.code
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [coupons, activeTab, search]);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`border-b-2 pb-3 transition ${
                      activeTab === tab.key
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-600 hover:text-blue-600"
                    }`}
                  >
                    {tab.label}
                    <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                      {counts[tab.key]}
                    </span>
                  </button>
                ))}
              </div>

              <Link
                href="/coupons/new"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add New Coupon
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
            <div className="relative max-w-full">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Coupons"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-blue-500"
              />
            </div>

            <div className="mt-6">
              {filteredCoupons.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-200 px-4 py-16 text-center text-sm text-slate-500">
                  No coupons found.
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full min-w-[700px]">
                    <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-700">
                      <tr>
                        <th className="px-4 py-3">Code</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                      {filteredCoupons.map((coupon) => (
                        <tr key={coupon.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3">{coupon.code}</td>
                          <td className="px-4 py-3 capitalize">
                            {coupon.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}