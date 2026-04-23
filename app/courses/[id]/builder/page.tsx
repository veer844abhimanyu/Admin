"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import CkEditorField from "@/components/CkEditorField";
import {
  ChevronLeft,
  Plus,
  Trash2,
  Pencil,
  Video,
  FileText,
  GripVertical,
} from "lucide-react";

type VideoType = "youtube" | "external" | "upload";

type Lesson = {
  id: number;
  title: string;
  description: string;
  videoType: VideoType;
  videoUrl: string;
  uploadedVideoName?: string;
  duration: string;
  isPreview: boolean;
  attachmentNames?: string[];
};

type Module = {
  id: number;
  title: string;
  lessons: Lesson[];
  moduleAttachments?: string[];
};

type LessonForm = {
  title: string;
  description: string;
  videoType: VideoType;
  videoUrl: string;
  duration: string;
  isPreview: boolean;
};

const emptyLessonForm: LessonForm = {
  title: "",
  description: "",
  videoType: "youtube",
  videoUrl: "",
  duration: "",
  isPreview: false,
};

export default function CourseBuilderPage() {
  const params = useParams();
  const courseId = params?.id;

  const [enableModules, setEnableModules] = useState(true);

  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Module 1",
      lessons: [],
      moduleAttachments: [],
    },
    {
      id: 2,
      title: "Module 2",
      lessons: [],
      moduleAttachments: [],
    },
  ]);

  const [directLessons, setDirectLessons] = useState<Lesson[]>([]);

  const [openLessonModal, setOpenLessonModal] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);
  const [lessonForm, setLessonForm] = useState<LessonForm>(emptyLessonForm);
  const [lessonError, setLessonError] = useState("");

  const [uploadedVideoName, setUploadedVideoName] = useState("");
  const [attachmentNames, setAttachmentNames] = useState<string[]>([]);

  const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState("");
  const [moduleAttachmentsMap, setModuleAttachmentsMap] = useState<Record<number, string[]>>({});

  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);
  const moduleNotesInputRef = useRef<HTMLInputElement | null>(null);

  const resetLessonForm = () => {
    setLessonForm(emptyLessonForm);
    setLessonError("");
    setSelectedModuleId(null);
    setEditingLessonId(null);
    setUploadedVideoName("");
    setAttachmentNames([]);
  };

  const openNewLessonModal = (moduleId: number | null = null) => {
    resetLessonForm();
    setSelectedModuleId(moduleId);
    setOpenLessonModal(true);
  };

  const closeLessonModal = () => {
    setOpenLessonModal(false);
    resetLessonForm();
  };

  const addModule = () => {
    const nextNumber = modules.length + 1;
    setModules((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: `Module ${nextNumber}`,
        lessons: [],
        moduleAttachments: [],
      },
    ]);
  };

  const deleteModule = (moduleId: number) => {
    const confirmed = window.confirm("Delete this module and all lessons inside it?");
    if (!confirmed) return;

    setModules((prev) => prev.filter((module) => module.id !== moduleId));
  };

  const startEditModule = (module: Module) => {
    setEditingModuleId(module.id);
    setEditingModuleTitle(module.title);
  };

  const saveModuleTitle = (moduleId: number) => {
    if (!editingModuleTitle.trim()) return;

    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? { ...module, title: editingModuleTitle.trim() }
          : module
      )
    );

    setEditingModuleId(null);
    setEditingModuleTitle("");
  };

  const cancelEditModule = () => {
    setEditingModuleId(null);
    setEditingModuleTitle("");
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedVideoName(file.name);
    setLessonForm((prev) => ({
      ...prev,
      videoUrl: file.name,
    }));
  };

  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments = Array.from(files).map((file) => file.name);
    setAttachmentNames((prev) => [...prev, ...newAttachments]);
  };

  const removeAttachment = (index: number) => {
    setAttachmentNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleModuleAttachmentsUpload = (e: React.ChangeEvent<HTMLInputElement>, moduleId: number) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments = Array.from(files).map((file) => file.name);
    setModuleAttachmentsMap((prev) => ({
      ...prev,
      [moduleId]: [...(prev[moduleId] || []), ...newAttachments],
    }));
  };

  const removeModuleAttachment = (moduleId: number, index: number) => {
    setModuleAttachmentsMap((prev) => ({
      ...prev,
      [moduleId]: prev[moduleId].filter((_, i) => i !== index),
    }));
  };

  const validateLesson = () => {
    if (!lessonForm.title.trim()) {
      setLessonError("Lesson title is required");
      return false;
    }

    setLessonError("");
    return true;
  };

  const buildLessonObject = (): Lesson => {
    return {
      id: editingLessonId || Date.now(),
      title: lessonForm.title.trim(),
      description: lessonForm.description.trim(),
      videoType: lessonForm.videoType,
      videoUrl: lessonForm.videoUrl.trim(),
      uploadedVideoName: lessonForm.videoType === "upload" ? uploadedVideoName : "",
      duration: lessonForm.duration.trim(),
      isPreview: lessonForm.isPreview,
      attachmentNames,
    };
  };

  const saveLesson = () => {
    if (!validateLesson()) return;

    const lesson = buildLessonObject();

    if (enableModules) {
      if (selectedModuleId === null) {
        setLessonError("Please select a module");
        return;
      }

      setModules((prev) =>
        prev.map((module) => {
          if (module.id !== selectedModuleId) return module;

          if (editingLessonId) {
            return {
              ...module,
              lessons: module.lessons.map((item) =>
                item.id === editingLessonId ? lesson : item
              ),
            };
          }

          return {
            ...module,
            lessons: [...module.lessons, lesson],
          };
        })
      );
    } else {
      if (editingLessonId) {
        setDirectLessons((prev) =>
          prev.map((item) => (item.id === editingLessonId ? lesson : item))
        );
      } else {
        setDirectLessons((prev) => [...prev, lesson]);
      }
    }

    closeLessonModal();
  };

  const deleteLesson = (lessonId: number, moduleId?: number) => {
    const confirmed = window.confirm("Delete this lesson?");
    if (!confirmed) return;

    if (enableModules && typeof moduleId === "number") {
      setModules((prev) =>
        prev.map((module) =>
          module.id === moduleId
            ? {
                ...module,
                lessons: module.lessons.filter((lesson) => lesson.id !== lessonId),
              }
            : module
        )
      );
    } else {
      setDirectLessons((prev) => prev.filter((lesson) => lesson.id !== lessonId));
    }
  };

  const editLesson = (lesson: Lesson, moduleId?: number) => {
    setLessonForm({
      title: lesson.title,
      description: lesson.description,
      videoType: lesson.videoType,
      videoUrl: lesson.videoUrl,
      duration: lesson.duration,
      isPreview: lesson.isPreview,
    });

    setUploadedVideoName(lesson.uploadedVideoName || "");
    setAttachmentNames(lesson.attachmentNames || []);
    setEditingLessonId(lesson.id);
    setSelectedModuleId(typeof moduleId === "number" ? moduleId : null);
    setLessonError("");
    setOpenLessonModal(true);
  };

  const handleSaveBuilder = () => {
    const payload = {
      courseId,
      enableModules,
      modules,
      directLessons,
    };

    console.log("Builder Saved:", payload);
    alert("Course builder saved successfully (frontend demo)");
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Courses
              </Link>

              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  Course Builder
                </h1>
                {/* <p className="text-sm text-slate-500">
                  Course ID: {String(courseId)}
                </p> */}
              </div>
            </div>

            <button
              onClick={handleSaveBuilder}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save Builder
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-semibold text-slate-800">Lesson Structure</h2>
                <p className="text-sm text-slate-500">
                  Enable modules to group lessons under module sections.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-700">
                  Enable Modules
                </span>

                <button
                  type="button"
                  onClick={() => setEnableModules((prev) => !prev)}
                  className={`relative h-6 w-11 rounded-full transition ${
                    enableModules ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                      enableModules ? "left-5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            {enableModules ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={addModule}
                    className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Module
                  </button>
                </div>

                {modules.map((module) => (
                  <div
                    key={module.id}
                    className="rounded-2xl border border-slate-200 bg-white"
                  >
                    <div className="flex flex-col gap-3 border-b border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-5 w-5 text-slate-400" />

                        {editingModuleId === module.id ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <input
                              type="text"
                              value={editingModuleTitle}
                              onChange={(e) => setEditingModuleTitle(e.target.value)}
                              className="h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                            />
                            <button
                              onClick={() => saveModuleTitle(module.id)}
                              className="rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEditModule}
                              className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800">
                              {module.title}
                            </h3>
                            {moduleAttachmentsMap[module.id]?.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {moduleAttachmentsMap[module.id].map((attachment, idx) => (
                                  <div key={idx} className="flex items-center justify-between gap-2 rounded bg-slate-50 px-2 py-1">
                                    <p className="flex items-center gap-1 text-xs text-slate-600">
                                      <FileText className="h-3 w-3" />
                                      {attachment}
                                    </p>
                                    <button
                                      onClick={() => removeModuleAttachment(module.id, idx)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => startEditModule(module)}
                          className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          <Pencil className="h-4 w-4" />
                          Edit Module
                        </button>

                        <button
                          onClick={() => openNewLessonModal(module.id)}
                          className="inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700"
                        >
                          <Plus className="h-4 w-4" />
                          Add Lesson
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const input = document.querySelector(
                              `input[data-module-id="${module.id}"]`
                            ) as HTMLInputElement;
                            input?.click();
                          }}
                          className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          <FileText className="h-4 w-4" />
                          Module Attachments
                        </button>

                        <input
                          type="file"
                          multiple
                          data-module-id={module.id}
                          onChange={(e) => handleModuleAttachmentsUpload(e, module.id)}
                          className="hidden"
                        />

                        <button
                          onClick={() => deleteModule(module.id)}
                          className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete Module
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      {module.lessons.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                          No lessons in this module yet.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                            >
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="font-semibold text-slate-800">
                                    {lesson.title}
                                  </p>
                                  {lesson.isPreview && (
                                    <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                      Preview
                                    </span>
                                  )}
                                </div>

                                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                                  <span className="inline-flex items-center gap-1">
                                    <Video className="h-4 w-4" />
                                    {lesson.videoType === "upload"
                                      ? lesson.uploadedVideoName || "Uploaded video"
                                      : lesson.videoUrl || "No URL"}
                                  </span>

                                  {lesson.duration && <span>{lesson.duration}</span>}

                                  {lesson.attachmentNames && lesson.attachmentNames.length > 0 && (
                                    <span className="inline-flex items-center gap-1">
                                      <FileText className="h-4 w-4" />
                                      {lesson.attachmentNames.length} attachment{lesson.attachmentNames.length !== 1 ? 's' : ''}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => editLesson(lesson, module.id)}
                                  className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() => deleteLesson(lesson.id, module.id)}
                                  className="rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => openNewLessonModal(null)}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Lesson
                  </button>
                </div>

                {directLessons.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                    No lessons added yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {directLessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-slate-800">
                              {lesson.title}
                            </p>
                            {lesson.isPreview && (
                              <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                Preview
                              </span>
                            )}
                          </div>

                          <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1">
                              <Video className="h-4 w-4" />
                              {lesson.videoType === "upload"
                                ? lesson.uploadedVideoName || "Uploaded video"
                                : lesson.videoUrl || "No URL"}
                            </span>

                            {lesson.duration && <span>{lesson.duration}</span>}

                            {lesson.attachmentNames && lesson.attachmentNames.length > 0 && (
                              <span className="inline-flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                {lesson.attachmentNames.length} attachment{lesson.attachmentNames.length !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => editLesson(lesson)}
                            className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteLesson(lesson.id)}
                            className="rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {openLessonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 className="text-lg font-semibold text-slate-800">
                  {editingLessonId ? "Update Lesson" : "Add New Lesson"}
                </h2>
                <button
                  onClick={closeLessonModal}
                  className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  type="button"
                >
                  ✕
                </button>
              </div>

              <div className="max-h-[80vh] overflow-y-auto p-5">
                <div className="grid gap-4">
                  {enableModules && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Module
                      </label>
                      <select
                        value={selectedModuleId ?? ""}
                        onChange={(e) => setSelectedModuleId(Number(e.target.value))}
                        className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                      >
                        <option value="">Select Module</option>
                        {modules.map((module) => (
                          <option key={module.id} value={module.id}>
                            {module.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Lesson Title
                    </label>
                    <input
                      type="text"
                      value={lessonForm.title}
                      onChange={(e) =>
                        setLessonForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter lesson title"
                      className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Description
                    </label>
                    <CkEditorField
                      value={lessonForm.description}
                      onChange={(value) =>
                        setLessonForm((prev) => ({
                          ...prev,
                          description: value,
                        }))
                      }
                      placeholder="Enter lesson description"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Video Source
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="radio"
                          checked={lessonForm.videoType === "youtube"}
                          onChange={() =>
                            setLessonForm((prev) => ({
                              ...prev,
                              videoType: "youtube",
                              videoUrl: "",
                            }))
                          }
                        />
                        YouTube URL
                      </label>

                      <label className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="radio"
                          checked={lessonForm.videoType === "external"}
                          onChange={() =>
                            setLessonForm((prev) => ({
                              ...prev,
                              videoType: "external",
                              videoUrl: "",
                            }))
                          }
                        />
                        External URL
                      </label>

                      <label className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="radio"
                          checked={lessonForm.videoType === "upload"}
                          onChange={() =>
                            setLessonForm((prev) => ({
                              ...prev,
                              videoType: "upload",
                              videoUrl: "",
                            }))
                          }
                        />
                        Upload Video
                      </label>
                    </div>
                  </div>

                  {(lessonForm.videoType === "youtube" ||
                    lessonForm.videoType === "external") && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        {lessonForm.videoType === "youtube"
                          ? "YouTube Video URL"
                          : "External Video URL"}
                      </label>
                      <input
                        type="text"
                        value={lessonForm.videoUrl}
                        onChange={(e) =>
                          setLessonForm((prev) => ({
                            ...prev,
                            videoUrl: e.target.value,
                          }))
                        }
                        placeholder="Paste video URL"
                        className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                  )}

                  {lessonForm.videoType === "upload" && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Upload Video
                      </label>

                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => videoInputRef.current?.click()}
                        className="w-full rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-600 hover:bg-slate-50"
                      >
                        Click to upload video
                      </button>

                      {uploadedVideoName && (
                        <p className="mt-2 text-sm text-slate-600">
                          Uploaded: {uploadedVideoName}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={lessonForm.duration}
                        onChange={(e) =>
                          setLessonForm((prev) => ({
                            ...prev,
                            duration: e.target.value,
                          }))
                        }
                        placeholder="e.g. 10 min"
                        className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Attachments / Notes
                      </label>

                      <input
                        ref={attachmentInputRef}
                        type="file"
                        multiple
                        onChange={handleAttachmentUpload}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => attachmentInputRef.current?.click()}
                        className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        Upload Attachments
                      </button>

                      {attachmentNames.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {attachmentNames.map((name, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                            >
                              <p className="flex items-center gap-2 text-sm text-slate-700">
                                <FileText className="h-4 w-4" />
                                {name}
                              </p>
                              <button
                                onClick={() => removeAttachment(idx)}
                                className="text-red-600 hover:text-red-800"
                                type="button"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                    <div>
                      <p className="font-medium text-slate-800">Free Preview</p>
                      <p className="text-sm text-slate-500">
                        Allow users to preview this lesson before purchase.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setLessonForm((prev) => ({
                          ...prev,
                          isPreview: !prev.isPreview,
                        }))
                      }
                      className={`relative h-6 w-11 rounded-full transition ${
                        lessonForm.isPreview ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                          lessonForm.isPreview ? "left-5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  {lessonError && (
                    <p className="text-sm font-medium text-red-600">
                      {lessonError}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={saveLesson}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      {editingLessonId ? "Update Lesson" : "Save Lesson"}
                    </button>

                    <button
                      type="button"
                      onClick={closeLessonModal}
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}