// // import "./globals.css";

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="en">
// //       <body>{children}</body>
// //     </html>
// //   );
// // }







// // import "./globals.css";

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en">
// //       <body>{children}</body>
// //     </html>
// //   );
// // }













// "use client";

// import { useState } from "react";
// // import AdminSidebar from "@/components/AdminSidebar";
// import AdminSidebar from "@/components/admin/AdminSidebar";
// import { Menu } from "lucide-react";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [open, setOpen] = useState(true);

//   return (
//     <div className="flex min-h-screen bg-[#f6f8fb]">
//       <AdminSidebar open={open} setOpen={setOpen} />

//       <div className="flex min-h-screen flex-1 flex-col">
//         <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-4 shadow-sm">
//           <button
//             onClick={() => setOpen((prev) => !prev)}
//             className="rounded-lg border border-slate-200 p-2 hover:bg-slate-100"
//             type="button"
//           >
//             <Menu className="h-5 w-5 text-slate-700" />
//           </button>

//           <h1 className="text-lg font-semibold text-slate-800">Admin Panel</h1>
//         </header>

//         <main className="flex-1 p-4 md:p-6">{children}</main>
//       </div>
//     </div>
//   );
// }

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}















// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }