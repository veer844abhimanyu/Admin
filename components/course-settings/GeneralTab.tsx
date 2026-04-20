"use client";

import Toggle from "./Toggle";

type GeneralTabProps = {
  instructor: string;
  additionalInstructor: string;
  setAdditionalInstructor: (value: string) => void;
  difficultyLevel: string;
  setDifficultyLevel: (value: string) => void;
  durationHours: string;
  setDurationHours: (value: string) => void;
  durationMinutes: string;
  setDurationMinutes: (value: string) => void;
  courseBadge: string;
  setCourseBadge: (value: string) => void;
  maximumStudentsType: "no-limit" | "limit";
  setMaximumStudentsType: (value: "no-limit" | "limit") => void;
  studentLimit: string;
  setStudentLimit: (value: string) => void;
  staticEnrolledCount: string;
  setStaticEnrolledCount: (value: string) => void;
  coursePassword: string;
  setCoursePassword: (value: string) => void;
  allowCourseRetake: boolean;
  toggleCourseRetake: () => void;
  restrictContentDripQuiz: boolean;
  toggleRestrictContentDripQuiz: () => void;
  showAssignmentCompletionButton: boolean;
  toggleAssignmentCompletionButton: () => void;
  showAssignmentRetakeButton: boolean;
  toggleAssignmentRetakeButton: () => void;
};

export function GeneralTab({
  instructor,
  additionalInstructor,
  setAdditionalInstructor,
  difficultyLevel,
  setDifficultyLevel,
  durationHours,
  setDurationHours,
  durationMinutes,
  setDurationMinutes,
  courseBadge,
  setCourseBadge,
  maximumStudentsType,
  setMaximumStudentsType,
  studentLimit,
  setStudentLimit,
  staticEnrolledCount,
  setStaticEnrolledCount,
  coursePassword,
  setCoursePassword,
  allowCourseRetake,
  toggleCourseRetake,
  restrictContentDripQuiz,
  toggleRestrictContentDripQuiz,
  showAssignmentCompletionButton,
  toggleAssignmentCompletionButton,
  showAssignmentRetakeButton,
  toggleAssignmentRetakeButton,
}: GeneralTabProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="space-y-8">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">Course Basics</h2>
          <div className="mt-4 border-t border-slate-200 pt-5">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                <label className="text-sm text-slate-700">Instructor</label>
                <div className="flex h-10 items-center justify-between rounded border border-slate-300 bg-white px-3 text-sm text-slate-700">
                  <span>{instructor}</span>
                  <span className="text-slate-400">× ▾</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                <label className="text-sm text-slate-700">Additional Instructors</label>
                <select
                  value={additionalInstructor}
                  onChange={(e) => setAdditionalInstructor(e.target.value)}
                  className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select Instructors</option>
                  <option value="Instructor 1">Instructor 1</option>
                  <option value="Instructor 2">Instructor 2</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                <label className="text-sm text-slate-700">Difficulty</label>
                <select
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                  className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Choose Course Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                <label className="text-sm text-slate-700">Duration</label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[110px_80px_110px_80px]">
                  <input
                    type="number"
                    min="0"
                    value={durationHours}
                    onChange={(e) => setDurationHours(e.target.value)}
                    className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                  />
                  <div className="flex h-10 items-center text-sm text-slate-700">Hours</div>
                  <input
                    type="number"
                    min="0"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                  />
                  <div className="flex h-10 items-center text-sm text-slate-700">Minutes</div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                <label className="text-sm text-slate-700">Course Badge</label>
                <input
                  type="text"
                  value={courseBadge}
                  onChange={(e) => setCourseBadge(e.target.value)}
                  placeholder="Set the badge for the course"
                  className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-800">Access & Restrictions</h2>
          <div className="mt-4 border-t border-slate-200 pt-5">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)]">
                <label className="text-sm text-slate-700 md:pt-2">Maximum Students</label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="radio"
                        name="maximumStudentsType"
                        checked={maximumStudentsType === "no-limit"}
                        onChange={() => setMaximumStudentsType("no-limit")}
                        className="h-4 w-4"
                      />
                      No limit
                    </label>

                    <label className="flex items-center gap-2 text-sm text-slate-700">
                      <input
                        type="radio"
                        name="maximumStudentsType"
                        checked={maximumStudentsType === "limit"}
                        onChange={() => setMaximumStudentsType("limit")}
                        className="h-4 w-4"
                      />
                      Limit
                    </label>
                  </div>

                  {maximumStudentsType === "limit" && (
                    <input
                      type="number"
                      min="1"
                      value={studentLimit}
                      onChange={(e) => setStudentLimit(e.target.value)}
                      placeholder="Enter maximum students"
                      className="h-10 w-full max-w-md rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                <label className="text-sm text-slate-700">Static Enrolled Count</label>
                <input
                  type="number"
                  min="0"
                  value={staticEnrolledCount}
                  onChange={(e) => setStaticEnrolledCount(e.target.value)}
                  className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                <label className="text-sm text-slate-700">Password</label>
                <input
                  type="text"
                  value={coursePassword}
                  onChange={(e) => setCoursePassword(e.target.value)}
                  placeholder="Set the password for the course"
                  className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                <label className="text-sm text-slate-700">Allow Course Retake</label>
                <Toggle checked={allowCourseRetake} onChange={toggleCourseRetake} />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                <label className="text-sm text-slate-700">Restrict Content Drip Quiz</label>
                <Toggle checked={restrictContentDripQuiz} onChange={toggleRestrictContentDripQuiz} />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                <label className="text-sm text-slate-700">Show Assignment Completion Button</label>
                <Toggle checked={showAssignmentCompletionButton} onChange={toggleAssignmentCompletionButton} />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                <label className="text-sm text-slate-700">Show Assignment Retake Button</label>
                <Toggle checked={showAssignmentRetakeButton} onChange={toggleAssignmentRetakeButton} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}