import { OrderItem } from "@/types/admin";

type Props = {
  data: OrderItem[];
};

const statusClasses: Record<string, string> = {
  "In-progress": "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

export default function OrdersTable({ data }: Props) {
  return (
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
            {data.map((item) => (
              <tr key={`${item.id}-${item.customer}`} className="border-b border-slate-100 last:border-b-0">
                <td className="px-5 py-4 text-[15px] text-slate-700">{item.id}</td>
                <td className="px-5 py-4 text-[15px] text-slate-700">{item.item}</td>
                <td className="px-5 py-4 text-[15px] font-semibold text-slate-700">
                  {item.customer}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-md px-3 py-1 text-xs font-semibold ${statusClasses[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-[15px] text-slate-700">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}