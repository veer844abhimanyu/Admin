

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";

type SettingsTab =
  | "pricing"
  | "groupPricing"
  | "general"
  | "scheduleAccess"
  | "display"
  | "contentDrip"
  | "certificate"
  | "prerequisites"
  | "faq";

type FaqItem = {
  id: number;
  title: string;
  content: string;
};

type PrerequisiteItem = {
  id: number;
  title: string;
};

const tabs: { key: SettingsTab; label: string }[] = [
  { key: "pricing", label: "Pricing" },
  { key: "groupPricing", label: "Group Pricing" },
  { key: "general", label: "General" },
  { key: "scheduleAccess", label: "Schedule & Access" },
  { key: "display", label: "Display" },
  { key: "contentDrip", label: "Content Drip" },
  { key: "certificate", label: "Certificate" },
  { key: "prerequisites", label: "Prerequisites" },
  { key: "faq", label: "FAQ" },
];

type ToggleProps = {
  checked: boolean;
  onChange: () => void;
};

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition ${
        checked ? "bg-blue-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
          checked ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <h2 className="mb-6 text-lg font-semibold text-slate-800">{title}</h2>
      {children}
    </div>
  );
}

export default function CourseSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("pricing");

  // Pricing
  const [pricingType, setPricingType] = useState<"free" | "paid">("free");
  const [freeAccessType, setFreeAccessType] = useState<"open" | "registration">(
    "open"
  );
  const [paymentMode, setPaymentMode] = useState<"oneTime" | "recurring">(
    "oneTime"
  );
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [enableMultipleCurrency, setEnableMultipleCurrency] = useState(true);
  const [baseCurrency] = useState("USD ($)");

  // Group Pricing
  const [enableGroupPricing, setEnableGroupPricing] = useState(false);
  const [groupPrice, setGroupPrice] = useState("");
  const [minUsers, setMinUsers] = useState("");

  // General
  const [instructor] = useState("Masteriyo Team");
  const [additionalInstructor, setAdditionalInstructor] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [durationHours, setDurationHours] = useState("0");
  const [durationMinutes, setDurationMinutes] = useState("0");
  const [courseBadge, setCourseBadge] = useState("");
  const [maximumStudentsType, setMaximumStudentsType] = useState<
    "no-limit" | "limit"
  >("no-limit");
  const [studentLimit, setStudentLimit] = useState("");
  const [staticEnrolledCount, setStaticEnrolledCount] = useState("0");
  const [coursePassword, setCoursePassword] = useState("");
  const [allowCourseRetake, setAllowCourseRetake] = useState(false);
  const [restrictContentDripQuiz, setRestrictContentDripQuiz] = useState(false);
  const [showAssignmentCompletionButton, setShowAssignmentCompletionButton] =
    useState(false);
  const [showAssignmentRetakeButton, setShowAssignmentRetakeButton] =
    useState(false);

  // Schedule & Access
  const [enableCohortMode, setEnableCohortMode] = useState(false);
  const [courseComingSoon, setCourseComingSoon] = useState(true);
  const [enrollmentDate, setEnrollmentDate] = useState("2026-04-04T23:11");
  const [hideMetaData, setHideMetaData] = useState(true);
  const [hideDateText, setHideDateText] = useState(true);
  const [enableCourseEndDate, setEnableCourseEndDate] = useState(true);
  const [courseEndDate, setCourseEndDate] = useState("");
  const [enableEnrollmentExpiration, setEnableEnrollmentExpiration] =
    useState(true);
  const [expiresAfter, setExpiresAfter] = useState("0");

  // Display
  const [curriculumVisibility, setCurriculumVisibility] = useState<
    "always" | "enrollers"
  >("always");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [welcomeTitle, setWelcomeTitle] = useState("Welcome to the Course.");
  const [welcomeDescription, setWelcomeDescription] = useState(
    "Get ready to dive into exciting lessons, connect with peers, and unlock new possibilities. Let's embark on this educational adventure together!"
  );

  // Content Drip
  const [contentDripFlowType, setContentDripFlowType] = useState<
    "free" | "sequential" | "date-selection" | "days-from-enrollment"
  >("free");

  // Certificate
  const [enableCertificate, setEnableCertificate] = useState(false);
  const [certificateTemplate, setCertificateTemplate] = useState("default");
  const [minimumPassPercent, setMinimumPassPercent] = useState("");

  // Prerequisites
  const [enablePrerequisites, setEnablePrerequisites] = useState(false);
  const [prerequisiteInput, setPrerequisiteInput] = useState("");
  const [prerequisites, setPrerequisites] = useState<PrerequisiteItem[]>([]);

  // FAQ
  const [showFaq, setShowFaq] = useState(true);
  const [faqs, setFaqs] = useState<FaqItem[]>([
    {
      id: Date.now(),
      title: "Untitled",
      content: "",
    },
  ]);

  const currentData = useMemo(
    () => ({
      pricingType,
      freeAccessType,
      paymentMode,
      regularPrice,
      salePrice,
      enableMultipleCurrency,
      baseCurrency,

      enableGroupPricing,
      groupPrice,
      minUsers,

      instructor,
      additionalInstructor,
      difficultyLevel,
      durationHours,
      durationMinutes,
      courseBadge,
      maximumStudentsType,
      studentLimit,
      staticEnrolledCount,
      coursePassword,
      allowCourseRetake,
      restrictContentDripQuiz,
      showAssignmentCompletionButton,
      showAssignmentRetakeButton,

      enableCohortMode,
      courseComingSoon,
      enrollmentDate,
      hideMetaData,
      hideDateText,
      enableCourseEndDate,
      courseEndDate,
      enableEnrollmentExpiration,
      expiresAfter,

      curriculumVisibility,
      showWelcomeMessage,
      welcomeTitle,
      welcomeDescription,

      contentDripFlowType,

      enableCertificate,
      certificateTemplate,
      minimumPassPercent,

      enablePrerequisites,
      prerequisites,

      showFaq,
      faqs,
    }),
    [
      pricingType,
      freeAccessType,
      paymentMode,
      regularPrice,
      salePrice,
      enableMultipleCurrency,
      baseCurrency,

      enableGroupPricing,
      groupPrice,
      minUsers,

      instructor,
      additionalInstructor,
      difficultyLevel,
      durationHours,
      durationMinutes,
      courseBadge,
      maximumStudentsType,
      studentLimit,
      staticEnrolledCount,
      coursePassword,
      allowCourseRetake,
      restrictContentDripQuiz,
      showAssignmentCompletionButton,
      showAssignmentRetakeButton,

      enableCohortMode,
      courseComingSoon,
      enrollmentDate,
      hideMetaData,
      hideDateText,
      enableCourseEndDate,
      courseEndDate,
      enableEnrollmentExpiration,
      expiresAfter,

      curriculumVisibility,
      showWelcomeMessage,
      welcomeTitle,
      welcomeDescription,

      contentDripFlowType,

      enableCertificate,
      certificateTemplate,
      minimumPassPercent,

      enablePrerequisites,
      prerequisites,

      showFaq,
      faqs,
    ]
  );

  const handleSave = () => {
    console.log("Course Settings Saved:", currentData);
    alert("Settings saved successfully (frontend demo)");
  };

  const addPrerequisite = () => {
    if (!prerequisiteInput.trim()) return;

    setPrerequisites((prev) => [
      ...prev,
      { id: Date.now(), title: prerequisiteInput.trim() },
    ]);
    setPrerequisiteInput("");
  };

  const removePrerequisite = (id: number) => {
    setPrerequisites((prev) => prev.filter((item) => item.id !== id));
  };

  const addFaq = () => {
    setFaqs((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "Untitled",
        content: "",
      },
    ]);
  };

  const updateFaq = (
    id: number,
    field: "title" | "content",
    value: string
  ) => {
    setFaqs((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeFaq = (id: number) => {
    setFaqs((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Courses
            </Link>

            <h1 className="text-xl font-bold text-slate-800">
              Course Settings
            </h1>
          </div>

          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className="rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto lg:overflow-visible">
              <div className="flex min-w-max flex-row lg:min-w-0 lg:flex-col">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`border-b px-4 py-4 text-left text-sm transition lg:border-r ${
                      activeTab === tab.key
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            {activeTab === "pricing" && (
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
                                onChange={() =>
                                  setFreeAccessType("registration")
                                }
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
                                <p className="font-medium text-slate-800">
                                  One Time
                                </p>

                                {paymentMode === "oneTime" && (
                                  <div className="mt-4 space-y-5 border-l border-slate-200 pl-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,320px)] md:items-center">
                                      <label className="text-sm text-slate-700">
                                        Base Currency:
                                      </label>
                                      <p className="font-semibold text-slate-800">
                                        {baseCurrency}
                                      </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,320px)] md:items-center">
                                      <label className="text-sm text-slate-700">
                                        Regular Price
                                      </label>
                                      <input
                                        type="number"
                                        value={regularPrice}
                                        onChange={(e) =>
                                          setRegularPrice(e.target.value)
                                        }
                                        placeholder="0"
                                        className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-blue-500"
                                      />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,320px)] md:items-center">
                                      <label className="text-sm text-slate-700">
                                        Sale Price
                                      </label>
                                      <input
                                        type="number"
                                        value={salePrice}
                                        onChange={(e) =>
                                          setSalePrice(e.target.value)
                                        }
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
                              <span className="font-medium text-slate-800">
                                Recurring
                              </span>
                            </label>

                            {paymentMode === "recurring" && (
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                  <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Subscription Price
                                  </label>
                                  <input
                                    type="number"
                                    className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-blue-500"
                                    placeholder="Enter subscription price"
                                  />
                                </div>

                                <div>
                                  <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Billing Cycle
                                  </label>
                                  <select className="h-11 w-full rounded-md border border-slate-300 px-3 outline-none focus:border-blue-500">
                                    <option>Monthly</option>
                                    <option>Yearly</option>
                                    <option>Weekly</option>
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
                        <span className="text-sm font-medium text-slate-800">
                          Enable Multiple Currency
                        </span>
                        <Toggle
                          checked={enableMultipleCurrency}
                          onChange={() =>
                            setEnableMultipleCurrency((prev) => !prev)
                          }
                        />
                      </div>

                      <p className="text-sm text-slate-500">
                        ⓘ No active pricing zone found.
                      </p>
                    </div>
                  )}
                </div>
              </SectionCard>
            )}

            {activeTab === "groupPricing" && (
              <SectionCard title="Group Pricing">
                <div className="space-y-5">
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                    <div>
                      <p className="font-medium text-slate-800">
                        Enable Group Pricing
                      </p>
                      <p className="text-sm text-slate-500">
                        Sell this course for groups or teams.
                      </p>
                    </div>
                    <Toggle
                      checked={enableGroupPricing}
                      onChange={() => setEnableGroupPricing((prev) => !prev)}
                    />
                  </div>

                  {enableGroupPricing && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Group Price
                        </label>
                        <input
                          type="number"
                          value={groupPrice}
                          onChange={(e) => setGroupPrice(e.target.value)}
                          placeholder="Enter group price"
                          className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Minimum Users
                        </label>
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
            )}

            {activeTab === "general" && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-800">
                      Course Basics
                    </h2>
                    <div className="mt-4 border-t border-slate-200 pt-5">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                          <label className="text-sm text-slate-700">
                            Instructor
                          </label>
                          <div className="flex h-10 items-center justify-between rounded border border-slate-300 bg-white px-3 text-sm text-slate-700">
                            <span>{instructor}</span>
                            <span className="text-slate-400">× ▾</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                          <label className="text-sm text-slate-700">
                            Additional Instructors
                          </label>
                          <select
                            value={additionalInstructor}
                            onChange={(e) =>
                              setAdditionalInstructor(e.target.value)
                            }
                            className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                          >
                            <option value="">Select Instructors</option>
                            <option value="Instructor 1">Instructor 1</option>
                            <option value="Instructor 2">Instructor 2</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                          <label className="text-sm text-slate-700">
                            Difficulty
                          </label>
                          <select
                            value={difficultyLevel}
                            onChange={(e) =>
                              setDifficultyLevel(e.target.value)
                            }
                            className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                          >
                            <option value="">Choose Course Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                          <label className="text-sm text-slate-700">
                            Duration
                          </label>
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[110px_80px_110px_80px]">
                            <input
                              type="number"
                              min="0"
                              value={durationHours}
                              onChange={(e) =>
                                setDurationHours(e.target.value)
                              }
                              className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                            />
                            <div className="flex h-10 items-center text-sm text-slate-700">
                              Hours
                            </div>
                            <input
                              type="number"
                              min="0"
                              value={durationMinutes}
                              onChange={(e) =>
                                setDurationMinutes(e.target.value)
                              }
                              className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                            />
                            <div className="flex h-10 items-center text-sm text-slate-700">
                              Minutes
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                          <label className="text-sm text-slate-700">
                            Course Badge
                          </label>
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
                    <h2 className="text-sm font-semibold text-slate-800">
                      Access & Restrictions
                    </h2>
                    <div className="mt-4 border-t border-slate-200 pt-5">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)]">
                          <label className="text-sm text-slate-700 md:pt-2">
                            Maximum Students
                          </label>
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-6">
                              <label className="flex items-center gap-2 text-sm text-slate-700">
                                <input
                                  type="radio"
                                  name="maximumStudentsType"
                                  checked={maximumStudentsType === "no-limit"}
                                  onChange={() =>
                                    setMaximumStudentsType("no-limit")
                                  }
                                  className="h-4 w-4"
                                />
                                No limit
                              </label>

                              <label className="flex items-center gap-2 text-sm text-slate-700">
                                <input
                                  type="radio"
                                  name="maximumStudentsType"
                                  checked={maximumStudentsType === "limit"}
                                  onChange={() =>
                                    setMaximumStudentsType("limit")
                                  }
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
                                onChange={(e) =>
                                  setStudentLimit(e.target.value)
                                }
                                placeholder="Enter maximum students"
                                className="h-10 w-full max-w-md rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                              />
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                          <label className="text-sm text-slate-700">
                            Static Enrolled Count
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={staticEnrolledCount}
                            onChange={(e) =>
                              setStaticEnrolledCount(e.target.value)
                            }
                            className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                          <label className="text-sm text-slate-700">
                            Password
                          </label>
                          <input
                            type="text"
                            value={coursePassword}
                            onChange={(e) =>
                              setCoursePassword(e.target.value)
                            }
                            placeholder="Set the password for the course"
                            className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                          <label className="text-sm text-slate-700">
                            Allow Course Retake
                          </label>
                          <Toggle
                            checked={allowCourseRetake}
                            onChange={() =>
                              setAllowCourseRetake((prev) => !prev)
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                          <label className="text-sm text-slate-700">
                            Restrict Content Drip Quiz
                          </label>
                          <Toggle
                            checked={restrictContentDripQuiz}
                            onChange={() =>
                              setRestrictContentDripQuiz((prev) => !prev)
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                          <label className="text-sm text-slate-700">
                            Show Assignment Completion Button
                          </label>
                          <Toggle
                            checked={showAssignmentCompletionButton}
                            onChange={() =>
                              setShowAssignmentCompletionButton((prev) => !prev)
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                          <label className="text-sm text-slate-700">
                            Show Assignment Retake Button
                          </label>
                          <Toggle
                            checked={showAssignmentRetakeButton}
                            onChange={() =>
                              setShowAssignmentRetakeButton((prev) => !prev)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "scheduleAccess" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                  <h2 className="text-sm font-semibold text-slate-800">
                    Cohort-Based Course
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Run your course in scheduled sessions with specific start
                    and end dates.
                  </p>

                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
                      <label className="text-sm text-slate-700">
                        Enable Cohort Mode
                      </label>
                      <Toggle
                        checked={enableCohortMode}
                        onChange={() => setEnableCohortMode((prev) => !prev)}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                  <h2 className="text-sm font-semibold text-slate-800">
                    Course Availability
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Control when students can discover and enroll in your course
                  </p>

                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
                        <label className="text-sm text-slate-700">
                          Course Coming Soon
                        </label>
                        <Toggle
                          checked={courseComingSoon}
                          onChange={() => setCourseComingSoon((prev) => !prev)}
                        />
                      </div>

                      {courseComingSoon && (
                        <div className="ml-0 border-l border-slate-200 pl-0 md:ml-3 md:pl-5">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
                              <label className="text-sm text-slate-700">
                                Enrollment Date
                              </label>
                              <input
                                type="datetime-local"
                                value={enrollmentDate}
                                onChange={(e) =>
                                  setEnrollmentDate(e.target.value)
                                }
                                className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                              />
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
                              <label className="text-sm text-slate-700">
                                Hide Meta Data
                              </label>
                              <Toggle
                                checked={hideMetaData}
                                onChange={() =>
                                  setHideMetaData((prev) => !prev)
                                }
                              />
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
                              <label className="text-sm text-slate-700">
                                Hide Date Text
                              </label>
                              <Toggle
                                checked={hideDateText}
                                onChange={() =>
                                  setHideDateText((prev) => !prev)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
                        <label className="text-sm text-slate-700">
                          Set Course End Date
                        </label>
                        <Toggle
                          checked={enableCourseEndDate}
                          onChange={() =>
                            setEnableCourseEndDate((prev) => !prev)
                          }
                        />
                      </div>

                      {enableCourseEndDate && (
                        <div className="ml-0 border-l border-slate-200 pl-0 md:ml-3 md:pl-5">
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
                            <label className="text-sm text-slate-700">
                              End Date
                            </label>
                            <input
                              type="date"
                              value={courseEndDate}
                              onChange={(e) =>
                                setCourseEndDate(e.target.value)
                              }
                              className="h-10 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                  <h2 className="text-sm font-semibold text-slate-800">
                    Enrollment Duration
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Control how long students have access after enrolling
                  </p>

                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)] md:items-center">
                        <label className="text-sm text-slate-700">
                          Enable Enrollment Expiration
                        </label>
                        <Toggle
                          checked={enableEnrollmentExpiration}
                          onChange={() =>
                            setEnableEnrollmentExpiration((prev) => !prev)
                          }
                        />
                      </div>

                      {enableEnrollmentExpiration && (
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,420px)] md:items-center">
                          <label className="text-sm text-slate-700">
                            Expires After
                          </label>
                          <div className="grid grid-cols-[1fr_auto] overflow-hidden rounded border border-slate-300">
                            <input
                              type="number"
                              min="0"
                              value={expiresAfter}
                              onChange={(e) => setExpiresAfter(e.target.value)}
                              className="h-10 px-3 text-sm outline-none"
                            />
                            <div className="flex items-center border-l border-slate-300 bg-slate-50 px-3 text-sm text-slate-700">
                              Days from enrollment
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "display" && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
                    <label className="text-sm text-slate-700 md:pt-2">
                      Curriculum Visibility
                    </label>

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
                    <label className="text-sm text-slate-700 md:pt-1">
                      Welcome Message to Learner
                    </label>

                    <div className="space-y-4">
                      <Toggle
                        checked={showWelcomeMessage}
                        onChange={() => setShowWelcomeMessage((prev) => !prev)}
                      />

                      {showWelcomeMessage && (
                        <div className="space-y-4">
                          <div>
                            <label className="mb-2 block text-sm text-slate-700">
                              Title
                            </label>
                            <input
                              type="text"
                              value={welcomeTitle}
                              onChange={(e) => setWelcomeTitle(e.target.value)}
                              className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm text-slate-700">
                              Description
                            </label>
                            <textarea
                              value={welcomeDescription}
                              onChange={(e) =>
                                setWelcomeDescription(e.target.value)
                              }
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
            )}

            {activeTab === "contentDrip" && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
                  <label className="text-sm text-slate-700 md:pt-1">
                    Flow type:
                  </label>

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
                        onChange={() =>
                          setContentDripFlowType("date-selection")
                        }
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
                          checked={
                            contentDripFlowType === "days-from-enrollment"
                          }
                          onChange={() =>
                            setContentDripFlowType("days-from-enrollment")
                          }
                          className="h-4 w-4"
                        />
                        X Days From Enrollment
                      </label>

                      {contentDripFlowType === "free" && (
                        <span className="text-xs text-red-500">
                          (Drip days cannot be set for open courses.)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "certificate" && (
              <SectionCard title="Certificate">
                <div className="space-y-5">
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                    <div>
                      <p className="font-medium text-slate-800">
                        Enable Certificate
                      </p>
                      <p className="text-sm text-slate-500">
                        Award certificate after course completion.
                      </p>
                    </div>
                    <Toggle
                      checked={enableCertificate}
                      onChange={() => setEnableCertificate((prev) => !prev)}
                    />
                  </div>

                  {enableCertificate && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Certificate Template
                        </label>
                        <select
                          value={certificateTemplate}
                          onChange={(e) =>
                            setCertificateTemplate(e.target.value)
                          }
                          className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
                        >
                          <option value="default">Default</option>
                          <option value="modern">Modern</option>
                          <option value="classic">Classic</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Minimum Pass %
                        </label>
                        <input
                          type="number"
                          value={minimumPassPercent}
                          onChange={(e) =>
                            setMinimumPassPercent(e.target.value)
                          }
                          placeholder="Enter minimum pass %"
                          className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </SectionCard>
            )}

            {activeTab === "prerequisites" && (
              <SectionCard title="Prerequisites">
                <div className="space-y-5">
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                    <div>
                      <p className="font-medium text-slate-800">
                        Enable Prerequisites
                      </p>
                      <p className="text-sm text-slate-500">
                        Require learners to finish other courses first.
                      </p>
                    </div>
                    <Toggle
                      checked={enablePrerequisites}
                      onChange={() => setEnablePrerequisites((prev) => !prev)}
                    />
                  </div>

                  {enablePrerequisites && (
                    <>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          type="text"
                          value={prerequisiteInput}
                          onChange={(e) =>
                            setPrerequisiteInput(e.target.value)
                          }
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
                          <p className="text-sm text-slate-500">
                            No prerequisites added.
                          </p>
                        ) : (
                          prerequisites.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3"
                            >
                              <span className="text-slate-700">
                                {item.title}
                              </span>
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
            )}

            {activeTab === "faq" && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:items-center">
                    <label className="text-sm text-slate-700">Show FAQ</label>
                    <Toggle
                      checked={showFaq}
                      onChange={() => setShowFaq((prev) => !prev)}
                    />
                  </div>

                  {showFaq && (
                    <>
                      <div className="space-y-4">
                        {faqs.map((faq) => (
                          <div
                            key={faq.id}
                            className="overflow-hidden rounded border border-slate-200"
                          >
                            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-3">
                              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                <span>⋮⋮</span>
                                <span>{faq.title || "Untitled"}</span>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFaq(faq.id)}
                                className="text-sm text-slate-500 hover:text-red-600"
                              >
                                🗑
                              </button>
                            </div>

                            <div className="space-y-5 p-4">
                              <div>
                                <label className="mb-2 block text-sm text-slate-700">
                                  Title
                                </label>
                                <input
                                  type="text"
                                  value={faq.title}
                                  onChange={(e) =>
                                    updateFaq(faq.id, "title", e.target.value)
                                  }
                                  className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                                />
                              </div>

                              <div>
                                <label className="mb-2 block text-sm text-slate-700">
                                  Content
                                </label>

                                <div className="overflow-hidden rounded border border-slate-300">
                                  <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                                    <select className="rounded border border-slate-200 bg-white px-2 py-1 text-xs outline-none">
                                      <option>Paragraph</option>
                                    </select>
                                    <button
                                      type="button"
                                      className="font-bold"
                                    >
                                      B
                                    </button>
                                    <button
                                      type="button"
                                      className="italic"
                                    >
                                      I
                                    </button>
                                    <button
                                      type="button"
                                      className="underline"
                                    >
                                      U
                                    </button>
                                    <button type="button">≡</button>
                                    <button type="button">❝</button>
                                    <button type="button">🔗</button>
                                    <button type="button">🖼</button>
                                    <button type="button">☰</button>
                                  </div>

                                  <textarea
                                    value={faq.content}
                                    onChange={(e) =>
                                      updateFaq(
                                        faq.id,
                                        "content",
                                        e.target.value
                                      )
                                    }
                                    rows={10}
                                    className="w-full resize-none px-3 py-3 text-sm outline-none"
                                  />
                                </div>
                              </div>

                              <div>
                                <button
                                  type="button"
                                  onClick={() => alert("FAQ updated")}
                                  className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={addFaq}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          ⊕ Add New FAQ
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}