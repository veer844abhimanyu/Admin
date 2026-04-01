// "use client";

// import Link from "next/link";
// import { useEffect, useRef, useState, ChangeEvent } from "react";
// import {
//   LayoutGrid,
//   Users,
//   UserRound,
//   ShoppingCart,
//   Share2,
//   Rss,
//   Video,
//   Stethoscope,
//   ClipboardList,
//   FileText,
//   LogOut,
//   Camera,
//   Trash2,
//   X,
// } from "lucide-react";

// const DEFAULT_IMAGE = "https://i.pravatar.cc/100?img=12";
// const DEFAULT_NAME = "Dronachary Shastri";

// type MenuItem = {
//   label: string;
//   icon: React.ElementType;
//   href: string;
// };

// const menuItems: MenuItem[] = [
//   { label: "Dashboard", icon: LayoutGrid, href: "/admin" },
//   { label: "Customers", icon: Users, href: "/admin/customers" },
//   { label: "Experts", icon: UserRound, href: "#" },
//   { label: "Products", icon: ShoppingCart, href: "#" },
//   { label: "Share & Earn", icon: Share2, href: "#" },
//   { label: "Blogs", icon: Rss, href: "#" },
//   { label: "Demo class link", icon: Video, href: "#" },
//   { label: "Self Diagnosis", icon: Stethoscope, href: "#" },
//   { label: "Diagnosis Subscription", icon: ClipboardList, href: "#" },
//   { label: "Meta & Desc", icon: FileText, href: "#" },
// ];

// type Props = {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export default function AdminSidebar({ open, setOpen }: Props) {
//   const [adminImage, setAdminImage] = useState<string>(DEFAULT_IMAGE);
//   const [adminName, setAdminName] = useState<string>(DEFAULT_NAME);
//   const [showPhotoMenu, setShowPhotoMenu] = useState(false);
//   const [activeItem, setActiveItem] = useState("Dashboard");

//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const savedImage = localStorage.getItem("adminImage");
//     const savedName = localStorage.getItem("adminName");

//     if (savedImage) setAdminImage(savedImage);
//     if (savedName) setAdminName(savedName);
//   }, []);

//   useEffect(() => {
//     const updateImage = () => {
//       const savedImage = localStorage.getItem("adminImage");
//       setAdminImage(savedImage || DEFAULT_IMAGE);
//     };

//     const updateName = () => {
//       const savedName = localStorage.getItem("adminName");
//       setAdminName(savedName || DEFAULT_NAME);
//     };

//     window.addEventListener("adminImageUpdated", updateImage);
//     window.addEventListener("adminNameUpdated", updateName);

//     return () => {
//       window.removeEventListener("adminImageUpdated", updateImage);
//       window.removeEventListener("adminNameUpdated", updateName);
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setShowPhotoMenu(false);
//       }
//     };

//     if (showPhotoMenu) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showPhotoMenu]);

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = () => {
//       const result = reader.result as string;
//       setAdminImage(result);
//       localStorage.setItem("adminImage", result);
//       window.dispatchEvent(new Event("adminImageUpdated"));
//       setShowPhotoMenu(false);
//     };

//     reader.readAsDataURL(file);
//   };

//   const handleRemovePhoto = () => {
//     setAdminImage(DEFAULT_IMAGE);
//     localStorage.removeItem("adminImage");
//     window.dispatchEvent(new Event("adminImageUpdated"));
//     setShowPhotoMenu(false);
//   };

//   return (
//     <>
//       {open && (
//         <div
//           className="fixed inset-0 z-40 bg-black/35 lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       <aside
//         className={`fixed left-0 top-0 z-50 flex h-screen w-[290px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
//           open ? "translate-x-0" : "-translate-x-full"
//         } lg:static lg:translate-x-0`}
//       >
//         <div className="border-b border-slate-200 px-5 py-5">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
//                 AY
//               </div>
//               <h2 className="text-[18px] font-bold text-slate-800">
//                 Ayush<span className="text-orange-500">Yogi</span>
//               </h2>
//             </div>

//             <button
//               onClick={() => setOpen(false)}
//               className="rounded-md p-2 hover:bg-slate-100 lg:hidden"
//               type="button"
//             >
//               <X className="h-5 w-5 text-slate-700" />
//             </button>
//           </div>
//         </div>

//         <div className="border-b border-slate-200 px-5 py-4">
//           <div className="relative flex items-center gap-3" ref={menuRef}>
//             <button
//               onClick={() => setShowPhotoMenu((prev) => !prev)}
//               className="relative"
//               type="button"
//             >
//               <img
//                 src={adminImage}
//                 alt="Admin"
//                 className="h-12 w-12 rounded-md object-cover"
//               />
//             </button>

//             <p className="text-[14px] font-semibold text-slate-700">{adminName}</p>

//             {showPhotoMenu && (
//               <div className="absolute left-0 top-14 z-20 w-44 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
//                   type="button"
//                 >
//                   <Camera className="h-4 w-4" />
//                   Change photo
//                 </button>

//                 <button
//                   onClick={handleRemovePhoto}
//                   className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-slate-100"
//                   type="button"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                   Remove photo
//                 </button>

//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         <nav className="flex-1 overflow-y-auto px-3 py-4">
//           <ul className="space-y-1.5">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = activeItem === item.label;

//               return (
//                 <li key={item.label}>
//                   <Link
//                     href={item.href}
//                     onClick={() => {
//                       setActiveItem(item.label);
//                       setOpen(false);
//                     }}
//                     className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-[15px] font-medium transition ${
//                       isActive
//                         ? "bg-blue-600 text-white shadow-sm"
//                         : "text-slate-700 hover:bg-slate-100"
//                     }`}
//                   >
//                     <Icon className="h-5 w-5" />
//                     <span>{item.label}</span>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         <div className="border-t border-slate-200 p-4">
//           <button
//             className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-[15px] font-semibold text-slate-700 hover:bg-slate-100"
//             type="button"
//           >
//             <LogOut className="h-5 w-5 text-orange-500" />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }







"use client";

import Link from "next/link";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  UserRound,
  ShoppingCart,
  Share2,
  Rss,
  Video,
  Stethoscope,
  ClipboardList,
  FileText,
  LogOut,
  Camera,
  Trash2,
  X,
  Book,
} from "lucide-react";

const DEFAULT_IMAGE = "https://i.pravatar.cc/100?img=12";
const DEFAULT_NAME = "Dronachary Shastri";

type MenuItem = {
  label: string;
  icon: React.ElementType;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: LayoutGrid, href: "/admin" },
  { label: "Customers", icon: Users, href: "/admin/customers" },
  { label: "Courses", icon: Book, href: "/admin/course"},
  { label: "Experts", icon: UserRound, href: "/admin/experts" },
  { label: "Products", icon: ShoppingCart, href: "/admin/products" },
  { label: "Share & Earn", icon: Share2, href: "/admin/share-earn" },
  { label: "Blogs", icon: Rss, href: "/admin/blogs" },
  { label: "Demo class link", icon: Video, href: "/admin/demo-class-link" },
  { label: "Self Diagnosis", icon: Stethoscope, href: "/admin/self-diagnosis" },
  { label: "Diagnosis Subscription", icon: ClipboardList, href: "/admin/diagnosis-subscription" },
  { label: "Meta & Desc", icon: FileText, href: "/admin/meta-desc" },
];

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminSidebar({ open, setOpen }: Props) {
  const pathname = usePathname();
  // const pathname = usePathname();

  const [adminImage, setAdminImage] = useState<string>(DEFAULT_IMAGE);
  const [adminName, setAdminName] = useState<string>(DEFAULT_NAME);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("adminImage");
    const savedName = localStorage.getItem("adminName");

    if (savedImage) setAdminImage(savedImage);
    if (savedName) setAdminName(savedName);
  }, []);

  useEffect(() => {
    const updateImage = () => {
      const savedImage = localStorage.getItem("adminImage");
      setAdminImage(savedImage || DEFAULT_IMAGE);
    };

    const updateName = () => {
      const savedName = localStorage.getItem("adminName");
      setAdminName(savedName || DEFAULT_NAME);
    };

    window.addEventListener("adminImageUpdated", updateImage);
    window.addEventListener("adminNameUpdated", updateName);

    return () => {
      window.removeEventListener("adminImageUpdated", updateImage);
      window.removeEventListener("adminNameUpdated", updateName);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowPhotoMenu(false);
      }
    };

    if (showPhotoMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPhotoMenu]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      setAdminImage(result);
      localStorage.setItem("adminImage", result);
      window.dispatchEvent(new Event("adminImageUpdated"));
      setShowPhotoMenu(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAdminImage(DEFAULT_IMAGE);
    localStorage.removeItem("adminImage");
    window.dispatchEvent(new Event("adminImageUpdated"));
    setShowPhotoMenu(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/35"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[290px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-slate-200 px-5 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                AY
              </div>
              <h2 className="text-[18px] font-bold text-slate-800">
                Ayush<span className="text-orange-500">Yogi</span>
              </h2>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-2 hover:bg-slate-100"
              type="button"
            >
              <X className="h-5 w-5 text-slate-700" />
            </button>
          </div>
        </div>

        <div className="border-b border-slate-200 px-5 py-4">
          <div className="relative flex items-center gap-3" ref={menuRef}>
            <button
              onClick={() => setShowPhotoMenu((prev) => !prev)}
              className="relative"
              type="button"
            >
              <img
                src={adminImage}
                alt="Admin"
                className="h-12 w-12 rounded-md object-cover"
              />
            </button>

            <p className="text-[14px] font-semibold text-slate-700">{adminName}</p>

            {showPhotoMenu && (
              <div className="absolute left-0 top-14 z-20 w-44 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  type="button"
                >
                  <Camera className="h-4 w-4" />
                  Change photo
                </button>

                <button
                  onClick={handleRemovePhoto}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-slate-100"
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove photo
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1.5">
            {/* {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-[15px] font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })} */}

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              // const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setOpen(false);
                      }
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 ${isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-200 p-4">
          <button
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-[15px] font-semibold text-slate-700 hover:bg-slate-100"
            type="button"
          >
            <LogOut className="h-5 w-5 text-orange-500" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}