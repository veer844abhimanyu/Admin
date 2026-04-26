"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  SettingsTab,
  settingsTabs,
  FaqItem,
  PrerequisiteItem,
} from "@/components/course-settings/types";
import {
  CertificateTab,
  ContentDripTab,
  DisplayTab,
  FaqTab,
  GeneralTab,
  GroupPricingTab,
  PrerequisitesTab,
  PricingTab,
  ScheduleAccessTab,
} from "@/components/course-settings";

export default function CourseSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("pricing");

  // Pricing
  const [pricingType, setPricingType] = useState<"free" | "paid">("free");
  const [freeAccessType, setFreeAccessType] = useState<"open" | "registration">(
    "open",
  );
  const [paymentMode, setPaymentMode] = useState<"oneTime" | "recurring">(
    "oneTime",
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
    "Get ready to dive into exciting lessons, connect with peers, and unlock new possibilities. Let's embark on this educational adventure together!",
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
      id: 1,
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
    ],
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

  const updateFaq = (id: number, field: "title" | "content", value: string) => {
    setFaqs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const removeFaq = (id: number) => {
    setFaqs((prev) => prev.filter((item) => item.id !== id));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "pricing":
        return (
          <PricingTab
            pricingType={pricingType}
            setPricingType={setPricingType}
            freeAccessType={freeAccessType}
            setFreeAccessType={setFreeAccessType}
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
            regularPrice={regularPrice}
            setRegularPrice={setRegularPrice}
            salePrice={salePrice}
            setSalePrice={setSalePrice}
            enableMultipleCurrency={enableMultipleCurrency}
            toggleMultipleCurrency={() =>
              setEnableMultipleCurrency((prev) => !prev)
            }
            baseCurrency={baseCurrency}
          />
        );
      case "groupPricing":
        return (
          <GroupPricingTab
            enableGroupPricing={enableGroupPricing}
            toggleGroupPricing={() =>
              setEnableGroupPricing((prev) => !prev)
            }
            groupPrice={groupPrice}
            setGroupPrice={setGroupPrice}
            minUsers={minUsers}
            setMinUsers={setMinUsers}
          />
        );
      case "general":
        return (
          <GeneralTab
            instructor={instructor}
            additionalInstructor={additionalInstructor}
            setAdditionalInstructor={setAdditionalInstructor}
            difficultyLevel={difficultyLevel}
            setDifficultyLevel={setDifficultyLevel}
            durationHours={durationHours}
            setDurationHours={setDurationHours}
            durationMinutes={durationMinutes}
            setDurationMinutes={setDurationMinutes}
            courseBadge={courseBadge}
            setCourseBadge={setCourseBadge}
            maximumStudentsType={maximumStudentsType}
            setMaximumStudentsType={setMaximumStudentsType}
            studentLimit={studentLimit}
            setStudentLimit={setStudentLimit}
            staticEnrolledCount={staticEnrolledCount}
            setStaticEnrolledCount={setStaticEnrolledCount}
            coursePassword={coursePassword}
            setCoursePassword={setCoursePassword}
            allowCourseRetake={allowCourseRetake}
            toggleCourseRetake={() =>
              setAllowCourseRetake((prev) => !prev)
            }
            restrictContentDripQuiz={restrictContentDripQuiz}
            toggleRestrictContentDripQuiz={() =>
              setRestrictContentDripQuiz((prev) => !prev)
            }
            showAssignmentCompletionButton={showAssignmentCompletionButton}
            toggleAssignmentCompletionButton={() =>
              setShowAssignmentCompletionButton((prev) => !prev)
            }
            showAssignmentRetakeButton={showAssignmentRetakeButton}
            toggleAssignmentRetakeButton={() =>
              setShowAssignmentRetakeButton((prev) => !prev)
            }
          />
        );
      case "scheduleAccess":
        return (
          <ScheduleAccessTab
            enableCohortMode={enableCohortMode}
            toggleCohortMode={() => setEnableCohortMode((prev) => !prev)}
            courseComingSoon={courseComingSoon}
            toggleCourseComingSoon={() =>
              setCourseComingSoon((prev) => !prev)
            }
            enrollmentDate={enrollmentDate}
            setEnrollmentDate={setEnrollmentDate}
            hideMetaData={hideMetaData}
            toggleHideMetaData={() => setHideMetaData((prev) => !prev)}
            hideDateText={hideDateText}
            toggleHideDateText={() => setHideDateText((prev) => !prev)}
            enableCourseEndDate={enableCourseEndDate}
            toggleCourseEndDate={() =>
              setEnableCourseEndDate((prev) => !prev)
            }
            courseEndDate={courseEndDate}
            setCourseEndDate={setCourseEndDate}
            enableEnrollmentExpiration={enableEnrollmentExpiration}
            toggleEnrollmentExpiration={() =>
              setEnableEnrollmentExpiration((prev) => !prev)
            }
            expiresAfter={expiresAfter}
            setExpiresAfter={setExpiresAfter}
          />
        );
      case "display":
        return (
          <DisplayTab
            curriculumVisibility={curriculumVisibility}
            setCurriculumVisibility={setCurriculumVisibility}
            showWelcomeMessage={showWelcomeMessage}
            toggleShowWelcomeMessage={() =>
              setShowWelcomeMessage((prev) => !prev)
            }
            welcomeTitle={welcomeTitle}
            setWelcomeTitle={setWelcomeTitle}
            welcomeDescription={welcomeDescription}
            setWelcomeDescription={setWelcomeDescription}
          />
        );
      case "contentDrip":
        return (
          <ContentDripTab
            contentDripFlowType={contentDripFlowType}
            setContentDripFlowType={setContentDripFlowType}
          />
        );
      case "certificate":
        return (
          <CertificateTab
            enableCertificate={enableCertificate}
            toggleCertificate={() =>
              setEnableCertificate((prev) => !prev)
            }
            certificateTemplate={certificateTemplate}
            setCertificateTemplate={setCertificateTemplate}
            minimumPassPercent={minimumPassPercent}
            setMinimumPassPercent={setMinimumPassPercent}
          />
        );
      case "prerequisites":
        return (
          <PrerequisitesTab
            enablePrerequisites={enablePrerequisites}
            togglePrerequisites={() =>
              setEnablePrerequisites((prev) => !prev)
            }
            prerequisiteInput={prerequisiteInput}
            setPrerequisiteInput={setPrerequisiteInput}
            prerequisites={prerequisites}
            addPrerequisite={addPrerequisite}
            removePrerequisite={removePrerequisite}
          />
        );
      case "faq":
        return (
          <FaqTab
            showFaq={showFaq}
            toggleFaq={() => setShowFaq((prev) => !prev)}
            faqs={faqs}
            addFaq={addFaq}
            updateFaq={updateFaq}
            removeFaq={removeFaq}
          />
        );
      default:
        return null;
    }
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
                {settingsTabs.map((tab) => (
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

          <div className="min-w-0">{renderActiveTab()}</div>
        </div>
      </div>
    </div>
  );
}
