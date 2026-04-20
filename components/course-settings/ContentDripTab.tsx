"use client";

type ContentDripTabProps = {
  contentDripFlowType: "free" | "sequential" | "date-selection" | "days-from-enrollment";
  setContentDripFlowType: (value: "free" | "sequential" | "date-selection" | "days-from-enrollment") => void;
};

export function ContentDripTab({
  contentDripFlowType,
  setContentDripFlowType,
}: ContentDripTabProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
        <label className="text-sm text-slate-700 md:pt-1">Flow type:</label>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name="contentDripFlowType"
              checked={contentDripFlowType === "free"}
              onChange={() => setContentDripFlowType("free")}
              className="h-4 w-4"
            />
            Free
            <span className="text-xs text-slate-500">ⓘ</span>
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name="contentDripFlowType"
              checked={contentDripFlowType === "sequential"}
              onChange={() => setContentDripFlowType("sequential")}
              className="h-4 w-4"
            />
            Sequential
            <span className="text-xs text-slate-500">ⓘ</span>
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name="contentDripFlowType"
              checked={contentDripFlowType === "date-selection"}
              onChange={() => setContentDripFlowType("date-selection")}
              className="h-4 w-4"
            />
            Date Selection
            <span className="text-xs text-slate-500">ⓘ</span>
          </label>

          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="contentDripFlowType"
                checked={contentDripFlowType === "days-from-enrollment"}
                onChange={() => setContentDripFlowType("days-from-enrollment")}
                className="h-4 w-4"
              />
              X Days From Enrollment
            </label>

            {contentDripFlowType === "free" && (
              <span className="text-xs text-red-500">(Drip days cannot be set for open courses.)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}