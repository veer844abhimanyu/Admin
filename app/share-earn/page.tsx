"use client";

import { useMemo, useState } from "react";
import { Eye, Gift, Pencil, Search, Trash2, X } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

type ShareEarnItem = {
  id: number;
  title: string;
  referralCode: string;
  reward: string;
  minPurchase: string;
  expiresOn: string;
  status: "Active" | "Expired";
};

type ModalType =
  | null
  | "addOffer"
  | "viewOffer"
  | "editOffer"
  | "deleteOffer";

const initialOffers: ShareEarnItem[] = [
  {
    id: 1,
    title: "Refer a friend and get course discount",
    referralCode: "AYUSH100",
    reward: "₹100 Off",
    minPurchase: "₹999",
    expiresOn: "30 Apr, 2026",
    status: "Active",
  },
  {
    id: 2,
    title: "Share wellness program and earn cashback",
    referralCode: "WELL200",
    reward: "₹200 Cashback",
    minPurchase: "₹1499",
    expiresOn: "12 May, 2026",
    status: "Active",
  },
  {
    id: 3,
    title: "Invite students for Nadi course",
    referralCode: "NADI150",
    reward: "₹150 Coupon",
    minPurchase: "₹799",
    expiresOn: "10 Mar, 2026",
    status: "Expired",
  },
  {
    id: 4,
    title: "Share detox kit and earn wallet points",
    referralCode: "DETOX250",
    reward: "250 Wallet Points",
    minPurchase: "₹1999",
    expiresOn: "18 Jun, 2026",
    status: "Active",
  },
  {
    id: 5,
    title: "Refer premium consultation package",
    referralCode: "CARE300",
    reward: "₹300 Off",
    minPurchase: "₹2499",
    expiresOn: "05 Jul, 2026",
    status: "Active",
  },
];

export default function ShareEarnPage() {
  const [offers, setOffers] = useState<ShareEarnItem[]>(initialOffers);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedOffer, setSelectedOffer] = useState<ShareEarnItem | null>(null);

  const [offerForm, setOfferForm] = useState({
    title: "",
    referralCode: "",
    reward: "",
    minPurchase: "",
    expiresOn: "",
    status: "Active" as "Active" | "Expired",
  });

  const filteredOffers = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return offers;

    return offers.filter((offer) =>
      [
        offer.title,
        offer.referralCode,
        offer.reward,
        offer.minPurchase,
        offer.expiresOn,
        offer.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [offers, search]);

  const resetForm = () => {
    setOfferForm({
      title: "",
      referralCode: "",
      reward: "",
      minPurchase: "",
      expiresOn: "",
      status: "Active",
    });
  };

  const openViewModal = (offer: ShareEarnItem) => {
    setSelectedOffer(offer);
    setModal("viewOffer");
  };

  const openEditModal = (offer: ShareEarnItem) => {
    setSelectedOffer(offer);
    setOfferForm({
      title: offer.title,
      referralCode: offer.referralCode,
      reward: offer.reward,
      minPurchase: offer.minPurchase,
      expiresOn: offer.expiresOn,
      status: offer.status,
    });
    setModal("editOffer");
  };

  const openDeleteModal = (offer: ShareEarnItem) => {
    setSelectedOffer(offer);
    setModal("deleteOffer");
  };

  const handleAddOffer = () => {
    if (
      !offerForm.title.trim() ||
      !offerForm.referralCode.trim() ||
      !offerForm.reward.trim() ||
      !offerForm.minPurchase.trim() ||
      !offerForm.expiresOn.trim()
    ) {
      return;
    }

    const newOffer: ShareEarnItem = {
      id: Date.now(),
      title: offerForm.title,
      referralCode: offerForm.referralCode,
      reward: offerForm.reward,
      minPurchase: offerForm.minPurchase,
      expiresOn: offerForm.expiresOn,
      status: offerForm.status,
    };

    setOffers((prev) => [newOffer, ...prev]);
    resetForm();
    setModal(null);
  };

  const handleUpdateOffer = () => {
    if (!selectedOffer) return;
    if (
      !offerForm.title.trim() ||
      !offerForm.referralCode.trim() ||
      !offerForm.reward.trim() ||
      !offerForm.minPurchase.trim() ||
      !offerForm.expiresOn.trim()
    ) {
      return;
    }

    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === selectedOffer.id
          ? {
              ...offer,
              title: offerForm.title,
              referralCode: offerForm.referralCode,
              reward: offerForm.reward,
              minPurchase: offerForm.minPurchase,
              expiresOn: offerForm.expiresOn,
              status: offerForm.status,
            }
          : offer
      )
    );

    resetForm();
    setSelectedOffer(null);
    setModal(null);
  };

  const handleDeleteOffer = () => {
    if (!selectedOffer) return;

    setOffers((prev) => prev.filter((offer) => offer.id !== selectedOffer.id));
    setSelectedOffer(null);
    setModal(null);
  };

  return (
    <AdminLayout>
      <div className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Share & Earn</h1>
            <p className="mt-1 text-sm text-gray-500">Home / Share & Earn</p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setModal("addOffer");
            }}
            className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            type="button"
          >
            Add Offer
          </button>
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
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="text-sm text-gray-500">
            Total:
            <span className="ml-1 font-semibold text-gray-700">{filteredOffers.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-[1100px] w-full">
            <thead className="bg-gray-50 text-left text-sm text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Referral Code</th>
                <th className="px-4 py-3 font-semibold">Reward</th>
                <th className="px-4 py-3 font-semibold">Min Purchase</th>
                <th className="px-4 py-3 font-semibold">Expires On</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredOffers.map((offer) => (
                <tr key={offer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                        <Gift className="h-5 w-5" />
                      </div>
                      <p className="max-w-[260px]">{offer.title}</p>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-700">{offer.referralCode}</td>
                  <td className="px-4 py-3 text-gray-700">{offer.reward}</td>
                  <td className="px-4 py-3 text-gray-700">{offer.minPurchase}</td>
                  <td className="px-4 py-3 text-gray-700">{offer.expiresOn}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium ${
                        offer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openViewModal(offer)}
                        className="text-slate-500 hover:text-blue-600"
                        type="button"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => openEditModal(offer)}
                        className="text-slate-500 hover:text-green-600"
                        type="button"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => openDeleteModal(offer)}
                        className="text-slate-500 hover:text-red-600"
                        type="button"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredOffers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
                    No offers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal
          open={modal === "addOffer"}
          title="Add Offer"
          onClose={() => {
            setModal(null);
            resetForm();
          }}
        >
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Offer title"
              value={offerForm.title}
              onChange={(e) =>
                setOfferForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Referral code"
              value={offerForm.referralCode}
              onChange={(e) =>
                setOfferForm((prev) => ({ ...prev, referralCode: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Reward"
              value={offerForm.reward}
              onChange={(e) =>
                setOfferForm((prev) => ({ ...prev, reward: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Minimum purchase"
              value={offerForm.minPurchase}
              onChange={(e) =>
                setOfferForm((prev) => ({ ...prev, minPurchase: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Expiry date"
              value={offerForm.expiresOn}
              onChange={(e) =>
                setOfferForm((prev) => ({ ...prev, expiresOn: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <select
              value={offerForm.status}
              onChange={(e) =>
                setOfferForm((prev) => ({
                  ...prev,
                  status: e.target.value as "Active" | "Expired",
                }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>

            <button
              onClick={handleAddOffer}
              className="mt-2 rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              type="button"
            >
              Add Offer
            </button>
          </div>
        </Modal>

        <Modal
          open={modal === "viewOffer"}
          title="View Offer"
          onClose={() => {
            setModal(null);
            setSelectedOffer(null);
          }}
        >
          {selectedOffer && (
            <div className="space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                <Gift className="h-8 w-8" />
              </div>

              <div className="grid gap-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-gray-800">Title:</span>{" "}
                  {selectedOffer.title}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Referral Code:</span>{" "}
                  {selectedOffer.referralCode}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Reward:</span>{" "}
                  {selectedOffer.reward}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Minimum Purchase:</span>{" "}
                  {selectedOffer.minPurchase}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Expires On:</span>{" "}
                  {selectedOffer.expiresOn}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Status:</span>{" "}
                  {selectedOffer.status}
                </p>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          open={modal === "editOffer"}
          title="Edit Offer"
          onClose={() => {
            setModal(null);
            setSelectedOffer(null);
            resetForm();
          }}
        >
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Offer title"
              value={offerForm.title}
              onChange={(e) =>
                setOfferForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Referral code"
              value={offerForm.referralCode}
              onChange={(e) =>
                setOfferForm((prev) => ({ ...prev, referralCode: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Reward"
              value={offerForm.reward}
              onChange={(e) =>
                setOfferForm((prev) => ({ ...prev, reward: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Minimum purchase"
              value={offerForm.minPurchase}
              onChange={(e) =>
                setOfferForm((prev) => ({ ...prev, minPurchase: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Expiry date"
              value={offerForm.expiresOn}
              onChange={(e) =>
                setOfferForm((prev) => ({ ...prev, expiresOn: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <select
              value={offerForm.status}
              onChange={(e) =>
                setOfferForm((prev) => ({
                  ...prev,
                  status: e.target.value as "Active" | "Expired",
                }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>

            <button
              onClick={handleUpdateOffer}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              type="button"
            >
              Update Offer
            </button>
          </div>
        </Modal>

        <Modal
          open={modal === "deleteOffer"}
          title="Delete Offer"
          onClose={() => {
            setModal(null);
            setSelectedOffer(null);
          }}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this offer?
            </p>

            {selectedOffer && (
              <div className="rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
                {selectedOffer.title}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleDeleteOffer}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                type="button"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setModal(null);
                  setSelectedOffer(null);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AdminLayout>
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
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}