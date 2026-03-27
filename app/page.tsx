"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import HomeTopbar from "@/components/admin/HomeTopbar";
import {
  Users,
  UserRound,
  GraduationCap,
  CalendarDays,
  Share2,
  ShoppingCart,
} from "lucide-react";

const stats = [
  { title: "Customers", value: 1022, icon: Users, box: "bg-sky-500" },
  { title: "Experts", value: 4, icon: UserRound, box: "bg-green-600" },
  { title: "Enroll", value: 289, icon: GraduationCap, box: "bg-red-500" },
  { title: "Appointments", value: 266, icon: CalendarDays, box: "bg-blue-600" },
  { title: "Share & Earn", value: 98, icon: Share2, box: "bg-yellow-500" },
  { title: "Products", value: 10, icon: ShoppingCart, box: "bg-slate-500" },
];

const enrollments = [
  {
    id: 886,
    name: "Pradeep shastri",
    enrolledFor: "Medical astrology specialist",
    status: "In-progress",
    date: "24 Mar, 2026",
  },
  {
    id: 885,
    name: "Kumar Mittal",
    enrolledFor: "Medical astrology specialist",
    status: "In-progress",
    date: "16 Feb, 2026",
  },
  {
    id: 884,
    name: "Raman sharma",
    enrolledFor: "Nadi parikshan",
    status: "In-progress",
    date: "09 Feb, 2026",
  },
];

const orders = [
  {
    id: 16,
    item: "learn one year ayurveda course for beginner - Affiliated by NIOS",
    customer: "Sonal Deolikar",
    status: "In-progress",
    date: "2 Mar, 2026",
  },
  {
    id: 16,
    item: "Pulse diagnosis certificate course - new session class 10-2-25",
    customer: "Siddhant Bali",
    status: "In-progress",
    date: "21 Mar, 2026",
  },
  {
    id: 13,
    item: "learn one year",
    customer: "Siddhant Bali",
    status: "In-progress",
    date: "19 Mar, 2026",
  },
];

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3f5f9]">
      <div className="flex">
        <AdminSidebar open={open} setOpen={setOpen} />

        <main className="flex-1">
          <HomeTopbar setOpen={setOpen} />

          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.slice(0, 4).map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-lg ${item.box}`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="text-[15px] font-medium text-slate-700">
                          {item.title}
                        </p>
                        <h3 className="mt-1 text-[18px] font-bold text-blue-600">
                          {item.value}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.slice(4).map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-lg ${item.box}`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="text-[15px] font-medium text-slate-700">
                          {item.title}
                        </p>
                        <h3 className="mt-1 text-[18px] font-bold text-blue-600">
                          {item.value}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="hidden xl:block" />
              <div className="hidden xl:block" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <h2 className="text-[18px] font-semibold text-slate-800">
                    Latest Enrollment
                  </h2>
                  <span className="text-slate-400">—</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-slate-200 text-left text-[14px] font-semibold text-slate-700">
                        <th className="px-5 py-4">#ID</th>
                        <th className="px-5 py-4">Name</th>
                        <th className="px-5 py-4">Enrolled/Appt for</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollments.map((item) => (
                        <tr key={item.id} className="border-b border-slate-100">
                          <td className="px-5 py-4">{item.id}</td>
                          <td className="px-5 py-4">{item.name}</td>
                          <td className="px-5 py-4">{item.enrolledFor}</td>
                          <td className="px-5 py-4">
                            <span className="rounded-md bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <h2 className="text-[18px] font-semibold text-slate-800">
                    Latest Orders
                  </h2>
                  <span className="text-slate-400">—</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-slate-200 text-left text-[14px] font-semibold text-slate-700">
                        <th className="px-5 py-4">#ID</th>
                        <th className="px-5 py-4">Item</th>
                        <th className="px-5 py-4">Customer</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((item, index) => (
                        <tr key={`${item.id}-${index}`} className="border-b border-slate-100">
                          <td className="px-5 py-4">{item.id}</td>
                          <td className="px-5 py-4">{item.item}</td>
                          <td className="px-5 py-4 font-semibold">{item.customer}</td>
                          <td className="px-5 py-4">
                            <span className="rounded-md bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}