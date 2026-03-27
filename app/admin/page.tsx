// export default function AdminPage() {
//   return (
//     <div className="rounded-2xl bg-white p-6 shadow-sm">
//       <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
//       <p className="mt-2 text-slate-600">Welcome to the admin panel.</p>
//     </div>
//   );
// }



import {
  Users,
  UserRound,
  GraduationCap,
  CalendarDays,
  Share2,
  ShoppingCart,
} from "lucide-react";

const stats = [
  {
    title: "Customers",
    value: "1022",
    icon: Users,
    iconBg: "bg-sky-500",
  },
  {
    title: "Experts",
    value: "4",
    icon: UserRound,
    iconBg: "bg-green-600",
  },
  {
    title: "Enroll",
    value: "289",
    icon: GraduationCap,
    iconBg: "bg-red-500",
  },
  {
    title: "Appointments",
    value: "266",
    icon: CalendarDays,
    iconBg: "bg-blue-600",
  },
  {
    title: "Share & Earn",
    value: "98",
    icon: Share2,
    iconBg: "bg-yellow-500",
  },
  {
    title: "Products",
    value: "10",
    icon: ShoppingCart,
    iconBg: "bg-slate-500",
  },
];

const enrollments = [
  {
    id: 886,
    name: "Pradeep shastri",
    course: "Medical astrology specialist",
    status: "In-progress",
    date: "24 Mar, 2026",
  },
  {
    id: 885,
    name: "Kumar Mittal",
    course: "Medical astrology specialist",
    status: "In-progress",
    date: "16 Feb, 2026",
  },
  {
    id: 884,
    name: "Raman",
    course: "Nadi parikshan",
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
    id: 15,
    item: "Ayurvedic lifestyle class",
    customer: "Rahul Rajak",
    status: "In-progress",
    date: "14 Mar, 2026",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-800"> Welcome Admin to theDashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.slice(0, 4).map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-xl text-white ${item.iconBg}`}
                >
                  <Icon className="h-8 w-8" />
                </div>

                <div>
                  <p className="text-lg font-medium text-slate-700">{item.title}</p>
                  <p className="text-3xl font-bold text-blue-600">{item.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.slice(4).map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-xl text-white ${item.iconBg}`}
                >
                  <Icon className="h-8 w-8" />
                </div>

                <div>
                  <p className="text-lg font-medium text-slate-700">{item.title}</p>
                  <p className="text-3xl font-bold text-blue-600">{item.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="text-2xl font-semibold text-slate-800">Latest Enrollment</h2>
            <span className="text-slate-400">—</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm font-semibold text-slate-700">
                  <th className="px-5 py-4">#ID</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Enrolled/Appt for</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((item) => (
                  <tr key={item.id + item.name} className="border-t border-slate-200">
                    <td className="px-5 py-4 text-slate-800">{item.id}</td>
                    <td className="px-5 py-4 text-slate-800">{item.name}</td>
                    <td className="px-5 py-4 text-slate-800">{item.course}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-800">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="text-2xl font-semibold text-slate-800">Latest Orders</h2>
            <span className="text-slate-400">—</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm font-semibold text-slate-700">
                  <th className="px-5 py-4">#ID</th>
                  <th className="px-5 py-4">Item</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => (
                  <tr key={item.id + item.customer} className="border-t border-slate-200">
                    <td className="px-5 py-4 text-slate-800">{item.id}</td>
                    <td className="px-5 py-4 text-slate-800">{item.item}</td>
                    <td className="px-5 py-4 text-slate-800">{item.customer}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-800">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}