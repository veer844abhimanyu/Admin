"use client";

import Toggle from "./Toggle";

type DisplayTabProps = {
  curriculumVisibility: "always" | "enrollers";
  setCurriculumVisibility: (value: "always" | "enrollers") => void;
  showWelcomeMessage: boolean;
  toggleShowWelcomeMessage: () => void;
  welcomeTitle: string;
  setWelcomeTitle: (value: string) => void;
  welcomeDescription: string;
  setWelcomeDescription: (value: string) => void;
};

export function DisplayTab({
  curriculumVisibility,
  setCurriculumVisibility,
  showWelcomeMessage,
  toggleShowWelcomeMessage,
  welcomeTitle,
  setWelcomeTitle,
  welcomeDescription,
  setWelcomeDescription,
}: DisplayTabProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
          <label className="text-sm text-slate-700 md:pt-2">Curriculum Visibility</label>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="curriculumVisibility"
                checked={curriculumVisibility === "always"}
                onChange={() => setCurriculumVisibility("always")}
                className="h-4 w-4"
              />
              Always Visible
            </label>

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="curriculumVisibility"
                checked={curriculumVisibility === "enrollers"}
                onChange={() => setCurriculumVisibility("enrollers")}
                className="h-4 w-4"
              />
              Only Visible to Enrollers
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
          <label className="text-sm text-slate-700 md:pt-1">Welcome Message to Learner</label>

          <div className="space-y-4">
            <Toggle checked={showWelcomeMessage} onChange={toggleShowWelcomeMessage} />

            {showWelcomeMessage && (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-slate-700">Title</label>
                  <input
                    type="text"
                    value={welcomeTitle}
                    onChange={(e) => setWelcomeTitle(e.target.value)}
                    className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-700">Description</label>
                  <textarea
                    value={welcomeDescription}
                    onChange={(e) => setWelcomeDescription(e.target.value)}
                    rows={4}
                    className="w-full rounded border border-slate-300 px-3 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => alert("Preview clicked")}
                    className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Preview
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}