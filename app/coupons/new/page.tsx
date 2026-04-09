// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import AdminLayout from "@/components/AdminLayout";

// type DiscountType = "fixed_cart" | "percent";
// type ApplyToType = "all" | "products" | "categories";

// export default function NewCouponPage() {
//   const [method, setMethod] = useState<"code" | "automatic">("code");
//   const [couponDescription, setCouponDescription] = useState("");
//   const [couponCode, setCouponCode] = useState("");

//   const [discountType, setDiscountType] =
//     useState<DiscountType>("fixed_cart");
//   const [discountAmount, setDiscountAmount] = useState("");
//   const [applyTo, setApplyTo] = useState<ApplyToType>("all");

//   const [stackable, setStackable] = useState<"yes" | "no">("no");

//   const [usageLimitPerUser, setUsageLimitPerUser] = useState("0");
//   const [usageLimitPerCoupon, setUsageLimitPerCoupon] = useState("0");

//   const [startDate, setStartDate] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");

//   const generateCouponCode = () => {
//     const randomCode = `SAVE${Math.floor(1000 + Math.random() * 9000)}`;
//     setCouponCode(randomCode);
//   };

//   const handleCreate = () => {
//     const payload = {
//       method,
//       couponDescription,
//       couponCode,
//       discountType,
//       discountAmount,
//       applyTo,
//       stackable,
//       usageLimitPerUser,
//       usageLimitPerCoupon,
//       startDate,
//       expiryDate,
//     };

//     console.log("Create Coupon:", payload);
//     alert("Coupon created successfully (frontend demo)");
//   };

//   const handleSaveDraft = () => {
//     alert("Coupon saved as draft (frontend demo)");
//   };

//   return (
//     <AdminLayout>
//       <div className="min-h-screen bg-slate-50">
//         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//           <div className="mb-4">
//             <Link
//               href="/coupons"
//               className="text-xs text-slate-500 hover:text-blue-600"
//             >
//               Back
//             </Link>
//           </div>

//           <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
//             <h1 className="text-2xl font-semibold text-slate-800">
//               Add New Coupon
//             </h1>

//             <div className="mt-4 border-t border-slate-200 pt-6">
//               <div className="space-y-6">
//                 <section>
//                   <h2 className="mb-3 text-sm font-semibold text-slate-800">
//                     Coupon Details
//                   </h2>

//                   <div className="rounded-md border border-slate-200 p-4">
//                     <div className="space-y-4">
//                       <div>
//                         <label className="mb-2 block text-xs font-medium text-slate-700">
//                           Method
//                         </label>

//                         <div className="flex flex-wrap gap-6 text-sm text-slate-700">
//                           <label className="flex items-center gap-2">
//                             <input
//                               type="radio"
//                               name="method"
//                               checked={method === "code"}
//                               onChange={() => setMethod("code")}
//                               className="h-4 w-4"
//                             />
//                             Code
//                           </label>

//                           <label className="flex items-center gap-2">
//                             <input
//                               type="radio"
//                               name="method"
//                               checked={method === "automatic"}
//                               onChange={() => setMethod("automatic")}
//                               className="h-4 w-4"
//                             />
//                             Automatic
//                           </label>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="mb-2 block text-xs font-medium text-slate-700">
//                           Coupon Description
//                         </label>
//                         <input
//                           type="text"
//                           value={couponDescription}
//                           onChange={(e) =>
//                             setCouponDescription(e.target.value)
//                           }
//                           placeholder="e.g. Women's Day Sale 2025"
//                           className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
//                         />
//                       </div>

//                       <div>
//                         <div className="mb-2 flex items-center justify-between gap-3">
//                           <label className="block text-xs font-medium text-slate-700">
//                             Coupon Code
//                           </label>

//                           <button
//                             type="button"
//                             onClick={generateCouponCode}
//                             className="text-xs font-medium text-blue-600 hover:text-blue-700"
//                           >
//                             Generate Code
//                           </button>
//                         </div>

//                         <input
//                           type="text"
//                           value={couponCode}
//                           onChange={(e) => setCouponCode(e.target.value)}
//                           placeholder="e.g. WOMENSDAY25"
//                           className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </section>

//                 <section>
//                   <h2 className="mb-3 text-sm font-semibold text-slate-800">
//                     Discount
//                   </h2>

//                   <div className="rounded-md border border-slate-200 p-4">
//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                       <div>
//                         <label className="mb-2 block text-xs font-medium text-slate-700">
//                           Discount Type
//                         </label>
//                         <select
//                           value={discountType}
//                           onChange={(e) =>
//                             setDiscountType(e.target.value as DiscountType)
//                           }
//                           className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
//                         >
//                           <option value="fixed_cart">Fixed Cart Discount</option>
//                           <option value="percent">Percentage Discount</option>
//                         </select>
//                       </div>

//                       <div>
//                         <label className="mb-2 block text-xs font-medium text-slate-700">
//                           Discount Amount
//                         </label>
//                         <input
//                           type="number"
//                           value={discountAmount}
//                           onChange={(e) => setDiscountAmount(e.target.value)}
//                           placeholder="0"
//                           className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
//                         />
//                       </div>

//                       <div className="md:col-span-2">
//                         <label className="mb-2 block text-xs font-medium text-slate-700">
//                           Apply To
//                         </label>
//                         <select
//                           value={applyTo}
//                           onChange={(e) =>
//                             setApplyTo(e.target.value as ApplyToType)
//                           }
//                           className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
//                         >
//                           <option value="all">All Courses & Categories</option>
//                           <option value="products">Specific Courses</option>
//                           <option value="categories">
//                             Specific Categories
//                           </option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 </section>

//                 <section>
//                   <h2 className="mb-3 text-sm font-semibold text-slate-800">
//                     Combination Rules
//                   </h2>

//                   <div className="rounded-md border border-slate-200 p-4">
//                     <label className="mb-2 block text-xs font-medium text-slate-700">
//                       Stackable
//                     </label>
//                     <p className="mb-3 text-xs text-slate-500">
//                       Can this coupon be applied along with other active coupons?
//                     </p>

//                     <div className="flex flex-wrap gap-6 text-sm text-slate-700">
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="radio"
//                           name="stackable"
//                           checked={stackable === "yes"}
//                           onChange={() => setStackable("yes")}
//                           className="h-4 w-4"
//                         />
//                         Yes
//                       </label>

//                       <label className="flex items-center gap-2">
//                         <input
//                           type="radio"
//                           name="stackable"
//                           checked={stackable === "no"}
//                           onChange={() => setStackable("no")}
//                           className="h-4 w-4"
//                         />
//                         No
//                       </label>
//                     </div>
//                   </div>
//                 </section>

//                 <section>
//                   <h2 className="mb-3 text-sm font-semibold text-slate-800">
//                     Usage Limitation
//                   </h2>

//                   <div className="rounded-md border border-slate-200 p-4">
//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                       <div>
//                         <label className="mb-2 block text-xs font-medium text-slate-700">
//                           Usage Limit Per User
//                         </label>
//                         <input
//                           type="number"
//                           value={usageLimitPerUser}
//                           onChange={(e) =>
//                             setUsageLimitPerUser(e.target.value)
//                           }
//                           className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
//                         />
//                       </div>

//                       <div>
//                         <label className="mb-2 block text-xs font-medium text-slate-700">
//                           Usage Limit Per Coupon
//                         </label>
//                         <input
//                           type="number"
//                           value={usageLimitPerCoupon}
//                           onChange={(e) =>
//                             setUsageLimitPerCoupon(e.target.value)
//                           }
//                           className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </section>

//                 <section>
//                   <h2 className="mb-3 text-sm font-semibold text-slate-800">
//                     Validity
//                   </h2>

//                   <div className="rounded-md border border-slate-200 p-4">
//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                       <div>
//                         <label className="mb-2 block text-xs font-medium text-slate-700">
//                           Start Date
//                         </label>
//                         <input
//                           type="date"
//                           value={startDate}
//                           onChange={(e) => setStartDate(e.target.value)}
//                           className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
//                         />
//                       </div>

//                       <div>
//                         <label className="mb-2 block text-xs font-medium text-slate-700">
//                           Expiry Date
//                         </label>
//                         <input
//                           type="date"
//                           value={expiryDate}
//                           onChange={(e) => setExpiryDate(e.target.value)}
//                           className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </section>

//                 <div className="flex flex-wrap gap-3 pt-2">
//                   <button
//                     type="button"
//                     onClick={handleCreate}
//                     className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                   >
//                     Create
//                   </button>

//                   <button
//                     type="button"
//                     onClick={handleSaveDraft}
//                     className="rounded border border-blue-300 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
//                   >
//                     Save to Draft
//                   </button>

//                   <Link
//                     href="/coupons"
//                     className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
//                   >
//                     Cancel
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }















"use client";

import Link from "next/link";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

type DiscountType = "fixed_cart" | "percent";
type ApplyToType = "all" | "products" | "categories";

export default function NewCouponPage() {
  const [method, setMethod] = useState<"code" | "automatic">("code");
  const [couponDescription, setCouponDescription] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const [discountType, setDiscountType] =
    useState<DiscountType>("fixed_cart");
  const [discountAmount, setDiscountAmount] = useState("");
  const [applyTo, setApplyTo] = useState<ApplyToType>("all");

  const [stackable, setStackable] = useState<"yes" | "no">("no");

  const [usageLimitPerUser, setUsageLimitPerUser] = useState("0");
  const [usageLimitPerCoupon, setUsageLimitPerCoupon] = useState("0");

  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const generateCouponCode = () => {
    const randomCode = `SAVE${Math.floor(1000 + Math.random() * 9000)}`;
    setCouponCode(randomCode);
  };

  const handleCreate = () => {
    const payload = {
      method,
      couponDescription,
      couponCode: method === "code" ? couponCode : "",
      discountType,
      discountAmount,
      applyTo,
      stackable,
      usageLimitPerUser,
      usageLimitPerCoupon,
      startDate,
      expiryDate,
    };

    console.log("Create Coupon:", payload);
    alert("Coupon created successfully (frontend demo)");
  };

  const handleSaveDraft = () => {
    const payload = {
      method,
      couponDescription,
      couponCode: method === "code" ? couponCode : "",
      discountType,
      discountAmount,
      applyTo,
      stackable,
      usageLimitPerUser,
      usageLimitPerCoupon,
      startDate,
      expiryDate,
      status: "draft",
    };

    console.log("Draft Coupon:", payload);
    alert("Coupon saved as draft (frontend demo)");
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-3">
            <Link
              href="/coupons"
              className="text-xs text-slate-500 hover:text-blue-600"
            >
              Back
            </Link>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
            <h1 className="text-2xl font-semibold text-slate-800">
              Add New Coupon
            </h1>

            <div className="mt-4 border-t border-slate-200 pt-6">
              <div className="space-y-6">
                <section>
                  <h2 className="mb-3 text-sm font-semibold text-slate-800">
                    Coupon Details
                  </h2>

                  <div className="rounded-md border border-slate-200 p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-700">
                          Method
                        </label>

                        <div className="flex flex-wrap gap-6 text-sm text-slate-700">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="method"
                              checked={method === "code"}
                              onChange={() => setMethod("code")}
                              className="h-4 w-4"
                            />
                            Code
                          </label>

                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="method"
                              checked={method === "automatic"}
                              onChange={() => {
                                setMethod("automatic");
                                setCouponCode("");
                              }}
                              className="h-4 w-4"
                            />
                            Automatic
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-700">
                          Coupon Description
                        </label>
                        <input
                          type="text"
                          value={couponDescription}
                          onChange={(e) =>
                            setCouponDescription(e.target.value)
                          }
                          placeholder="e.g. Women's Day Sale 2025"
                          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                        />
                      </div>

                      {method === "code" && (
                        <div>
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <label className="block text-xs font-medium text-slate-700">
                              Coupon Code
                            </label>

                            <button
                              type="button"
                              onClick={generateCouponCode}
                              className="text-xs font-medium text-blue-600 hover:text-blue-700"
                            >
                              Generate Code
                            </button>
                          </div>

                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="e.g. WOMENSDAY25"
                            className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="mb-3 text-sm font-semibold text-slate-800">
                    Discount
                  </h2>

                  <div className="rounded-md border border-slate-200 p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-700">
                          Discount Type
                        </label>
                        <select
                          value={discountType}
                          onChange={(e) =>
                            setDiscountType(e.target.value as DiscountType)
                          }
                          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                        >
                          <option value="fixed_cart">Fixed Cart Discount</option>
                          <option value="percent">Percentage Discount</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-700">
                          Discount Amount
                        </label>
                        <input
                          type="number"
                          value={discountAmount}
                          onChange={(e) => setDiscountAmount(e.target.value)}
                          placeholder="0"
                          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-2 block text-xs font-medium text-slate-700">
                          Apply To
                        </label>
                        <select
                          value={applyTo}
                          onChange={(e) =>
                            setApplyTo(e.target.value as ApplyToType)
                          }
                          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                        >
                          <option value="all">All Courses & Categories</option>
                          <option value="products">Specific Courses</option>
                          <option value="categories">
                            Specific Categories
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="mb-3 text-sm font-semibold text-slate-800">
                    Combination Rules
                  </h2>

                  <div className="rounded-md border border-slate-200 p-4">
                    <label className="mb-2 block text-xs font-medium text-slate-700">
                      Stackable
                    </label>
                    <p className="mb-3 text-xs text-slate-500">
                      Can this coupon be applied along with other active coupons?
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm text-slate-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="stackable"
                          checked={stackable === "yes"}
                          onChange={() => setStackable("yes")}
                          className="h-4 w-4"
                        />
                        Yes
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="stackable"
                          checked={stackable === "no"}
                          onChange={() => setStackable("no")}
                          className="h-4 w-4"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="mb-3 text-sm font-semibold text-slate-800">
                    Usage Limitation
                  </h2>

                  <div className="rounded-md border border-slate-200 p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-700">
                          Usage Limit Per User
                        </label>
                        <input
                          type="number"
                          value={usageLimitPerUser}
                          onChange={(e) =>
                            setUsageLimitPerUser(e.target.value)
                          }
                          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-700">
                          Usage Limit Per Coupon
                        </label>
                        <input
                          type="number"
                          value={usageLimitPerCoupon}
                          onChange={(e) =>
                            setUsageLimitPerCoupon(e.target.value)
                          }
                          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="mb-3 text-sm font-semibold text-slate-800">
                    Validity
                  </h2>

                  <div className="rounded-md border border-slate-200 p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-700">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-700">
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCreate}
                    className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Create
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="rounded border border-blue-300 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    Save to Draft
                  </button>

                  <Link
                    href="/coupons"
                    className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}