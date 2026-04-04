"use client";

import { useMemo, useState } from "react";
import AdminLayout from "@/components/AdminLayout";

type Customer = {
  id: number;
  name: string;
  phone: string;
  pinCode: string;
  role: "customer";
  address: string;
  joined: string;
  lastLogin: string;
  email?: string;
  coupons: number;
  claims: number;
  events: number;
};

type ModalType =
  | null
  | "allCoupons"
  | "allClaims"
  | "allEvents"
  | "newUser"
  | "rowCoupon";

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Sanjay Khurana",
    phone: "9814035599",
    pinCode: "6196",
    role: "customer",
    address: "",
    joined: "24 Mar, 2026",
    lastLogin: "24 Mar, 2026 06:54 p.m.",
    coupons: 2,
    claims: 0,
    events: 1,
  },
  {
    id: 2,
    name: "Pradeep Shastri",
    phone: "9680707200",
    pinCode: "6174",
    role: "customer",
    address: "",
    joined: "24 Mar, 2026",
    lastLogin: "24 Mar, 2026 01:22 p.m.",
    coupons: 1,
    claims: 1,
    events: 0,
  },
  {
    id: 3,
    name: "Sonal Deolikar",
    phone: "7038228801",
    pinCode: "4559",
    role: "customer",
    address: "sonaldeolikar0@gmail.com",
    joined: "22 Mar, 2026",
    lastLogin: "22 Mar, 2026 09:20 a.m.",
    email: "sonaldeolikar0@gmail.com",
    coupons: 3,
    claims: 2,
    events: 1,
  },
  {
    id: 4,
    name: "Siddhant Bali Dubey",
    phone: "9993330899",
    pinCode: "9512",
    role: "customer",
    address: "shradubey1980@gmail.com",
    joined: "21 Mar, 2026",
    lastLogin: "21 Mar, 2026 04:04 a.m.",
    email: "shradubey1980@gmail.com",
    coupons: 1,
    claims: 0,
    events: 1,
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [newUserForm, setNewUserForm] = useState({
    name: "",
    phone: "",
    pinCode: "",
    address: "",
    email: "",
  });

  const [couponCode, setCouponCode] = useState("");

  const filteredCustomers = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return customers;

    return customers.filter((customer) =>
      [
        customer.name,
        customer.phone,
        customer.pinCode,
        customer.role,
        customer.address,
        customer.email || "",
        customer.joined,
        customer.lastLogin,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [customers, search]);

  const totals = useMemo(() => {
    return customers.reduce(
      (acc, customer) => {
        acc.coupons += customer.coupons;
        acc.claims += customer.claims;
        acc.events += customer.events;
        return acc;
      },
      { coupons: 0, claims: 0, events: 0 }
    );
  }, [customers]);

  const handleOpenRowCoupon = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCouponCode("");
    setModal("rowCoupon");
  };

  const handleAssignCoupon = () => {
    if (!selectedCustomer || !couponCode.trim()) return;

    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === selectedCustomer.id
          ? { ...customer, coupons: customer.coupons + 1 }
          : customer
      )
    );

    setCouponCode("");
    setSelectedCustomer(null);
    setModal(null);
  };

  const handleAddUser = () => {
    if (!newUserForm.name.trim() || !newUserForm.phone.trim() || !newUserForm.pinCode.trim()) {
      return;
    }

    const newCustomer: Customer = {
      id: Date.now(),
      name: newUserForm.name,
      phone: newUserForm.phone,
      pinCode: newUserForm.pinCode,
      role: "customer",
      address: newUserForm.address || newUserForm.email || "",
      email: newUserForm.email || "",
      joined: "Today",
      lastLogin: "Never logged in",
      coupons: 0,
      claims: 0,
      events: 0,
    };

    setCustomers((prev) => [newCustomer, ...prev]);
    setNewUserForm({
      name: "",
      phone: "",
      pinCode: "",
      address: "",
      email: "",
    });
    setModal(null);
  };

  return (
    <AdminLayout>
      <div className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">List of Customers</h1>
            <p className="mt-1 text-sm text-gray-500">Home / Customers</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <ActionButton
              label={`View Coupons (${totals.coupons})`}
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setModal("allCoupons")}
            />
            <ActionButton
              label={`View Claims (${totals.claims})`}
              className="bg-cyan-600 hover:bg-cyan-700"
              onClick={() => setModal("allClaims")}
            />
            <ActionButton
              label={`View Events (${totals.events})`}
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setModal("allEvents")}
            />
            <ActionButton
              label="New User"
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setModal("newUser")}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm outline-none transition focus:border-blue-500"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          <div className="text-sm text-gray-500">
            Total:
            <span className="ml-1 font-semibold text-gray-700">{filteredCustomers.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-[1100px] w-full">
            <thead className="bg-gray-50 text-left text-sm text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">PIN Code</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Address</th>
                <th className="px-4 py-3 font-semibold">Joined @</th>
                <th className="px-4 py-3 font-semibold">Last Login</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{customer.name}</td>
                  <td className="px-4 py-3 text-gray-700">{customer.phone}</td>
                  <td className="px-4 py-3 text-gray-700">{customer.pinCode}</td>
                  <td className="px-4 py-3 capitalize text-gray-700">{customer.role}</td>
                  <td className="px-4 py-3 text-gray-700">{customer.address || "-"}</td>
                  <td className="px-4 py-3 text-gray-700">{customer.joined}</td>
                  <td className="px-4 py-3 text-gray-700">{customer.lastLogin}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleOpenRowCoupon(customer)}
                      className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700"
                      type="button"
                    >
                      + Coupon
                    </button>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal open={modal === "allCoupons"} title="All Coupons Summary" onClose={() => setModal(null)}>
          <div className="space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
              >
                <span className="font-medium text-gray-800">{customer.name}</span>
                <span className="text-sm text-gray-600">{customer.coupons} coupon(s)</span>
              </div>
            ))}
          </div>
        </Modal>

        <Modal open={modal === "allClaims"} title="All Claims Summary" onClose={() => setModal(null)}>
          <div className="space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
              >
                <span className="font-medium text-gray-800">{customer.name}</span>
                <span className="text-sm text-gray-600">{customer.claims} claim(s)</span>
              </div>
            ))}
          </div>
        </Modal>

        <Modal open={modal === "allEvents"} title="All Events Summary" onClose={() => setModal(null)}>
          <div className="space-y-3">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
              >
                <span className="font-medium text-gray-800">{customer.name}</span>
                <span className="text-sm text-gray-600">{customer.events} event(s)</span>
              </div>
            ))}
          </div>
        </Modal>

        <Modal open={modal === "newUser"} title="Create New User" onClose={() => setModal(null)}>
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Full name"
              value={newUserForm.name}
              onChange={(e) => setNewUserForm((prev) => ({ ...prev, name: e.target.value }))}
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Phone number"
              value={newUserForm.phone}
              onChange={(e) => setNewUserForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="PIN code"
              value={newUserForm.pinCode}
              onChange={(e) => setNewUserForm((prev) => ({ ...prev, pinCode: e.target.value }))}
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUserForm.email}
              onChange={(e) => setNewUserForm((prev) => ({ ...prev, email: e.target.value }))}
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Address"
              value={newUserForm.address}
              onChange={(e) => setNewUserForm((prev) => ({ ...prev, address: e.target.value }))}
              className="min-h-[100px] rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleAddUser}
              className="mt-2 rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              type="button"
            >
              Add User
            </button>
          </div>
        </Modal>

        <Modal
          open={modal === "rowCoupon"}
          title={selectedCustomer ? `Assign Coupon - ${selectedCustomer.name}` : "Assign Coupon"}
          onClose={() => {
            setModal(null);
            setSelectedCustomer(null);
            setCouponCode("");
          }}
        >
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleAssignCoupon}
              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              type="button"
            >
              Assign Coupon
            </button>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
}

function ActionButton({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-4 py-2 text-sm font-medium text-white transition ${className}`}
      type="button"
    >
      {label}
    </button>
  );
}

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}