// import { Users, UserRound, GraduationCap, CalendarDays, Share2, ShoppingCart } from "lucide-react";
// import { StatCardItem } from "@/types/admin";

// type Props = {
//   item: StatCardItem;
// };

// const iconMap: Record<string, any> = {
//   Customers: Users,
//   Experts: UserRound,
//   Enroll: GraduationCap,
//   Appointments: CalendarDays,
//   "Share & Earn": Share2,
//   Products: ShoppingCart,
// };

// export default function StatCard({ item }: Props) {
//   const Icon = iconMap[item.title];

//   return (
//     <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
//       <div className="flex items-center gap-4">
//         <div
//           className={`flex h-16 w-16 items-center justify-center rounded-lg ${item.iconBg}`}
//         >
//           <Icon className={`h-8 w-8 ${item.iconColor}`} />
//         </div>

//         <div>
//           <p className="text-[15px] font-medium text-slate-700">{item.title}</p>
//           <h3 className="mt-1 text-[18px] font-bold text-blue-600">{item.value}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }


