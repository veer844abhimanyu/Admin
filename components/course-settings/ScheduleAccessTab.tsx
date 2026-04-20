"use client";

import Toggle from "./Toggle";

type ScheduleAccessTabProps = {
  enableCohortMode: boolean;
  toggleCohortMode: () => void;
  courseComingSoon: boolean;
  toggleCourseComingSoon: () => void;
  enrollmentDate: string;
  setEnrollmentDate: (value: string) => void;
  hideMetaData: boolean;
  toggleHideMetaData: () => void;
  hideDateText: boolean;
  toggleHideDateText: () => void;
  enableCourseEndDate: boolean;
  toggleCourseEndDate: () => void;
  courseEndDate: string;
  setCourseEndDate: (value: string) => void;
  enableEnrollmentExpiration: boolean;
  toggleEnrollmentExpiration: () => void;
  expiresAfter: string;
  setExpiresAfter: (value: string) => void;
};

export function ScheduleAccessTab({
  enableCohortMode,
  toggleCohortMode,
  courseComingSoon,
  toggleCourseComingSoon,
  enrollmentDate,
  setEnrollmentDate,
  hideMetaData,
  toggleHideMetaData,
  hideDateText,
  toggleHideDateText,
  enableCourseEndDate,
  toggleCourseEndDate,
  courseEndDate,
  setCourseEndDate,
  enableEnrollmentExpiration,
  toggleEnrollmentExpiration,
  expiresAfter,
  setExpiresAfter,
}: ScheduleAccessTabProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-slate-800">Cohort-Based Course</h2>
        <p className="mt-1 text-xs text-slate-500">Run your course in scheduled sessions with specific start and end dates.</p>

        <div className="mt-5 border-t border-slate-200 pt-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
            <label className="text-sm text-slate-700">Enable Cohort Mode</label>
            <Toggle checked={enableCohortMode} onChange={toggleCohortMode} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-slate-800">Course Availability</h2>
        <p className="mt-1 text-xs text-slate-500">Control when students can discover and enroll in your course</p>

        <div className="mt-5 border-t border-slate-200 pt-5">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
              <label className="text-sm text-slate-700">Course Coming Soon</label>
              <Toggle checked={courseComingSoon} onChange={toggleCourseComingSoon} />
            </div>

            {courseComingSoon && (
              <div className="ml-0 border-l border-slate-200 pl-0 md:ml-3 md:pl-5">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
                    <label className="text-sm text-slate-700">Enrollment Date</label>
                    <input
                      type="datetime-local"
                      value={enrollmentDate}
                      onChange={(e) => setEnrollmentDate(e.target.value)}
                      className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
                    <label className="text-sm text-slate-700">Hide Meta Data</label>
                    <Toggle checked={hideMetaData} onChange={toggleHideMetaData} />
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
                    <label className="text-sm text-slate-700">Hide Date Text</label>
                    <Toggle checked={hideDateText} onChange={toggleHideDateText} />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
              <label className="text-sm text-slate-700">Set Course End Date</label>
              <Toggle checked={enableCourseEndDate} onChange={toggleCourseEndDate} />
            </div>

            {enableCourseEndDate && (
              <div className="ml-0 border-l border-slate-200 pl-0 md:ml-3 md:pl-5">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
                  <label className="text-sm text-slate-700">End Date</label>
                  <input
                    type="date"
                    value={courseEndDate}
                    onChange={(e) => setCourseEndDate(e.target.value)}
                    className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-slate-800">Enrollment Duration</h2>
        <p className="mt-1 text-xs text-slate-500">Control how long students have access after enrolling</p>

        <div className="mt-5 border-t border-slate-200 pt-5">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
              <label className="text-sm text-slate-700">Enable Enrollment Expiration</label>
              <Toggle checked={enableEnrollmentExpiration} onChange={toggleEnrollmentExpiration} />
            </div>

            {enableEnrollmentExpiration && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,420px)] md:items-center">
                <label className="text-sm text-slate-700">Expires After</label>
                <div className="grid grid-cols-[1fr_auto] overflow-hidden rounded border border-slate-300">
                  <input
                    type="number"
                    min="0"
                    value={expiresAfter}
                    onChange={(e) => setExpiresAfter(e.target.value)}
                    className="h-10 px-3 text-sm outline-none"
                  />
                  <div className="flex items-center border-l border-slate-300 bg-slate-50 px-3 text-sm text-slate-700">Days from enrollment</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}