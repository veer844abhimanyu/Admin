// "use client";

// import { ChangeEvent, useEffect, useState } from "react";

// const DEFAULT_IMAGE = "https://i.pravatar.cc/100?img=12";
// const DEFAULT_NAME = "Dronachary Shastri";

// export default function AdminPhotoUploader() {
//   const [adminImage, setAdminImage] = useState<string>(DEFAULT_IMAGE);
//   const [adminName, setAdminName] = useState<string>(DEFAULT_NAME);
//   const [nameInput, setNameInput] = useState<string>(DEFAULT_NAME);

//   useEffect(() => {
//     const savedImage = localStorage.getItem("adminImage");
//     const savedName = localStorage.getItem("adminName");

//     if (savedImage) setAdminImage(savedImage);
//     if (savedName) {
//       setAdminName(savedName);
//       setNameInput(savedName);
//     }
//   }, []);

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = () => {
//       const result = reader.result as string;
//       setAdminImage(result);
//       localStorage.setItem("adminImage", result);
//       window.dispatchEvent(new Event("adminImageUpdated"));
//     };

//     reader.readAsDataURL(file);
//   };

//   const handleRemovePhoto = () => {
//     setAdminImage(DEFAULT_IMAGE);
//     localStorage.removeItem("adminImage");
//     window.dispatchEvent(new Event("adminImageUpdated"));
//   };

//   const handleSaveName = () => {
//     const trimmed = nameInput.trim();
//     if (!trimmed) return;

//     setAdminName(trimmed);
//     localStorage.setItem("adminName", trimmed);
//     window.dispatchEvent(new Event("adminNameUpdated"));
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
//         <img
//           src={adminImage}
//           alt="Admin"
//           className="h-24 w-24 rounded-full border object-cover"
//         />

//         <div className="flex flex-wrap gap-3">
//           <label className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
//             Change Photo
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           </label>

//           <button
//             onClick={handleRemovePhoto}
//             className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
//           >
//             Remove Photo
//           </button>
//         </div>
//       </div>

//       <div className="max-w-md space-y-3">
//         <label className="block text-sm font-medium text-slate-700">
//           Admin Name
//         </label>

//         <input
//           type="text"
//           value={nameInput}
//           onChange={(e) => setNameInput(e.target.value)}
//           className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
//           placeholder="Enter admin name"
//         />

//         <button
//           onClick={handleSaveName}
//           className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
//         >
//           Save Name
//         </button>

//         <p className="text-sm text-slate-500">
//           Current name: <span className="font-semibold">{adminName}</span>
//         </p>
//       </div>
//     </div>
//   );
// }