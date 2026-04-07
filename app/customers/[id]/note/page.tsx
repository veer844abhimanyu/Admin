"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { Customer, getCustomers, saveCustomers } from "@/lib/customersStorage";

export default function CustomerNotePage() {
  const params = useParams();
  const router = useRouter();

  const customerId = useMemo(() => Number(params.id), [params.id]);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [note, setNote] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedCustomers = getCustomers();
    setCustomers(storedCustomers);

    const foundCustomer =
      storedCustomers.find((item) => item.id === customerId) || null;

    setCustomer(foundCustomer);
    setNote(foundCustomer?.note || "");
    setLoaded(true);
  }, [customerId]);

  const handleSave = () => {
    if (!customer) return;

    const updatedCustomers = customers.map((item) =>
      item.id === customer.id ? { ...item, note } : item
    );

    saveCustomers(updatedCustomers);
    setCustomers(updatedCustomers);
    router.push("/customers");
  };

  if (!loaded) {
    return (
      <AdminLayout>
        <div className="rounded-2xl bg-white p-6 shadow-sm">Loading...</div>
      </AdminLayout>
    );
  }

  if (!customer) {
    return (
      <AdminLayout>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">
            Customer not found
          </h1>

          <div className="mt-4">
            <Link
              href="/customers"
              className="inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Back to Customers
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Customer Note
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Home / Customers / Add Note
            </p>
          </div>

          <Link
            href="/customers"
            className="inline-flex rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            ← Back to Customers
          </Link>
        </div>

        <div className="mb-6 grid gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Customer Name
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {customer.name}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Phone
            </p>
            <p className="mt-1 text-sm text-gray-800">{customer.phone}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              PIN Code
            </p>
            <p className="mt-1 text-sm text-gray-800">{customer.pinCode}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Address
            </p>
            <p className="mt-1 text-sm text-gray-800">
              {customer.address || "-"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 p-4">
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Write complete customer note
          </label>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write full note here..."
            className="min-h-[420px] w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          <div className="mt-3 flex flex-col gap-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <span>You can write long notes here safely, even 100 to 500 lines.</span>
            <span>{note.length} characters</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={handleSave}
              className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              type="button"
            >
              Save Note
            </button>

            <Link
              href="/customers"
              className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}