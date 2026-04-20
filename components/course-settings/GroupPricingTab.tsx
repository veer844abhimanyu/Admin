"use client";

import SectionCard from "./SectionCard";
import Toggle from "./Toggle";

type GroupPricingTabProps = {
  enableGroupPricing: boolean;
  toggleGroupPricing: () => void;
  groupPrice: string;
  setGroupPrice: (value: string) => void;
  minUsers: string;
  setMinUsers: (value: string) => void;
};

export function GroupPricingTab({
  enableGroupPricing,
  toggleGroupPricing,
  groupPrice,
  setGroupPrice,
  minUsers,
  setMinUsers,
}: GroupPricingTabProps) {
  return (
    <SectionCard title="Group Pricing">
      <div className="space-y-5">
        <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
          <div>
            <p className="font-medium text-slate-800">Enable Group Pricing</p>
            <p className="text-sm text-slate-500">Sell this course for groups or teams.</p>
          </div>
          <Toggle checked={enableGroupPricing} onChange={toggleGroupPricing} />
        </div>

        {enableGroupPricing && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Group Price</label>
              <input
                type="number"
                value={groupPrice}
                onChange={(e) => setGroupPrice(e.target.value)}
                placeholder="Enter group price"
                className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Minimum Users</label>
              <input
                type="number"
                value={minUsers}
                onChange={(e) => setMinUsers(e.target.value)}
                placeholder="Enter minimum users"
                className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}