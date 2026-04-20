"use client";

import SectionCard from "./SectionCard";
import Toggle from "./Toggle";

type PricingTabProps = {
  pricingType: "free" | "paid";
  setPricingType: (value: "free" | "paid") => void;
  freeAccessType: "open" | "registration";
  setFreeAccessType: (value: "open" | "registration") => void;
  paymentMode: "oneTime" | "recurring";
  setPaymentMode: (value: "oneTime" | "recurring") => void;
  regularPrice: string;
  setRegularPrice: (value: string) => void;
  salePrice: string;
  setSalePrice: (value: string) => void;
  enableMultipleCurrency: boolean;
  toggleMultipleCurrency: () => void;
  baseCurrency: string;
};

export function PricingTab({
  pricingType,
  setPricingType,
  freeAccessType,
  setFreeAccessType,
  paymentMode,
  setPaymentMode,
  regularPrice,
  setRegularPrice,
  salePrice,
  setSalePrice,
  enableMultipleCurrency,
  toggleMultipleCurrency,
  baseCurrency,
}: PricingTabProps) {
  return (
    <SectionCard title="Pricing Option">
      <div className="space-y-8">
        <div className="space-y-6">
          <label className="flex items-start gap-3">
            <input
              type="radio"
              name="pricingType"
              checked={pricingType === "free"}
              onChange={() => setPricingType("free")}
              className="mt-1 h-4 w-4"
            />
            <div className="w-full">
              <p className="font-medium text-slate-800">Free</p>

              {pricingType === "free" && (
                <div className="mt-4 space-y-3 border-l border-slate-200 pl-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="freeAccessType"
                      checked={freeAccessType === "open"}
                      onChange={() => setFreeAccessType("open")}
                      className="h-4 w-4"
                    />
                    <span className="text-slate-700">
                      Open Access (No Registration Required)
                    </span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="freeAccessType"
                      checked={freeAccessType === "registration"}
                      onChange={() => setFreeAccessType("registration")}
                      className="h-4 w-4"
                    />
                    <span className="text-slate-700">
                      Requires Registration to Access
                    </span>
                  </label>
                </div>
              )}
            </div>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="radio"
              name="pricingType"
              checked={pricingType === "paid"}
              onChange={() => setPricingType("paid")}
              className="mt-1 h-4 w-4"
            />
            <div className="w-full">
              <p className="font-medium text-slate-800">Paid</p>

              {pricingType === "paid" && (
                <div className="mt-4 space-y-6 border-l border-slate-200 pl-4">
                  <label className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMode"
                      checked={paymentMode === "oneTime"}
                      onChange={() => setPaymentMode("oneTime")}
                      className="mt-1 h-4 w-4"
                    />
                    <div className="w-full">
                      <p className="font-medium text-slate-800">One Time</p>

                      {paymentMode === "oneTime" && (
                        <div className="mt-4 space-y-5 border-l border-slate-200 pl-4">
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,320px)] md:items-center">
                            <label className="text-sm text-slate-700">Base Currency:</label>
                            <p className="font-semibold text-slate-800">{baseCurrency}</p>
                          </div>

                          <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,320px)] md:items-center">
                            <label className="text-sm text-slate-700">Regular Price</label>
                            <input
                              type="number"
                              value={regularPrice}
                              onChange={(e) => setRegularPrice(e.target.value)}
                              placeholder="0"
                              className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-blue-500"
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,320px)] md:items-center">
                            <label className="text-sm text-slate-700">Sale Price</label>
                            <input
                              type="number"
                              value={salePrice}
                              onChange={(e) => setSalePrice(e.target.value)}
                              className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMode"
                      checked={paymentMode === "recurring"}
                      onChange={() => setPaymentMode("recurring")}
                      className="h-4 w-4"
                    />
                    <span className="font-medium text-slate-800">Recurring</span>
                  </label>

                  {paymentMode === "recurring" && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Subscription Price</label>
                        <input
                          type="number"
                          className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-blue-500"
                          placeholder="Enter subscription price"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Billing Cycle</label>
                        <select className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-blue-500">
                          <option>Monthly</option>
                          <option>3 Months</option>
                          <option>6 Months</option>
                          <option>Yearly</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </label>
        </div>

        {pricingType === "paid" && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <span className="text-sm font-medium text-slate-800">Enable Multiple Currency</span>
              <Toggle checked={enableMultipleCurrency} onChange={toggleMultipleCurrency} />
            </div>

            <p className="text-sm text-slate-500">ⓘ No active pricing zone found.</p>
          </div>
        )}
      </div>
    </SectionCard>
  );
}