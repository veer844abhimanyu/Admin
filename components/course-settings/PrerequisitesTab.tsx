"use client";

import SectionCard from "./SectionCard";
import Toggle from "./Toggle";
import { PrerequisiteItem } from "./types";

type PrerequisitesTabProps = {
  enablePrerequisites: boolean;
  togglePrerequisites: () => void;
  prerequisiteInput: string;
  setPrerequisiteInput: (value: string) => void;
  prerequisites: PrerequisiteItem[];
  addPrerequisite: () => void;
  removePrerequisite: (id: number) => void;
};

export function PrerequisitesTab({
  enablePrerequisites,
  togglePrerequisites,
  prerequisiteInput,
  setPrerequisiteInput,
  prerequisites,
  addPrerequisite,
  removePrerequisite,
}: PrerequisitesTabProps) {
  return (
    <SectionCard title="Prerequisites">
      <div className="space-y-5">
        <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
          <div>
            <p className="font-medium text-slate-800">Enable Prerequisites</p>
            <p className="text-sm text-slate-500">Require learners to finish other courses first.</p>
          </div>
          <Toggle checked={enablePrerequisites} onChange={togglePrerequisites} />
        </div>

        {enablePrerequisites && (
          <>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={prerequisiteInput}
                onChange={(e) => setPrerequisiteInput(e.target.value)}
                placeholder="Enter prerequisite course name"
                className="h-11 flex-1 rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
              />
              <button
                onClick={addPrerequisite}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <div className="space-y-3">
              {prerequisites.length === 0 ? (
                <p className="text-sm text-slate-500">No prerequisites added.</p>
              ) : (
                prerequisites.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                    <span className="text-slate-700">{item.title}</span>
                    <button
                      onClick={() => removePrerequisite(item.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </SectionCard>
  );
}