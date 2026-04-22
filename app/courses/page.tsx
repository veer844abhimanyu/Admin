

"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import CourseTabNavigation from "@/components/courses/CourseTabNavigation";
import CourseFilterBar from "@/components/courses/CourseFilterBar";
import CourseBulkActionBar from "@/components/courses/CourseBulkActionBar";
import CourseTable from "@/components/courses/CourseTable";
import CourseCard from "@/components/courses/CourseCard";
import { useCourseFilter } from "@/hooks/useCourseFilter";
import { useCourseSelection } from "@/hooks/useCourseSelection";
import { initialCourses } from "@/lib/courseConstants";
import { Course, TabKey } from "@/types/course";
import { confirmDelete } from "@/lib/courseUtils";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedPricing,
    setSelectedPricing,
    filteredCourses,
    categories,
    counts,
  } = useCourseFilter(courses);

  const {
    selectedRows,
    toggleSelectRow,
    toggleSelectAll,
    allVisibleSelected,
    clearSelection,
    moveToTrash,
    moveToDraft,
    makePrivate,
    publishCourse,
    deletePermanently,
    updateCourseStatus,
    deleteSelected,
  } = useCourseSelection();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("admin_courses");
    if (saved) {
      try {
        setCourses(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading courses", e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("admin_courses", JSON.stringify(courses));
  }, [courses]);

  // Handlers for single course actions
  const handlePublish = (id: number) => {
    setCourses(publishCourse(courses, id));
  };

  const handleMoveToTrash = (id: number) => {
    setCourses(moveToTrash(courses, id));
  };

  const handleMoveToDraft = (id: number) => {
    setCourses(moveToDraft(courses, id));
  };

  const handleMakePrivate = (id: number) => {
    setCourses(makePrivate(courses, id));
  };

  const handleDeletePermanently = (id: number) => {
    setCourses(deletePermanently(courses, id));
    clearSelection();
  };

  // Handlers for bulk actions
  const handleBulkStatusUpdate = (status: "published" | "draft" | "private" | "trash") => {
    const [updated] = updateCourseStatus(courses, status);
    setCourses(updated);
    clearSelection();
  };

  const handleBulkDeletePermanently = () => {
    setCourses(deleteSelected(courses));
    clearSelection();
  };

  const handleToggleSelectAll = () => {
    toggleSelectAll(filteredCourses);
  };

  const handleToggleSelectRow = (id: number) => {
    toggleSelectRow(id);
  };

  return (
    <AdminLayout>
      <CourseTabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab as (tab: TabKey) => void}
        counts={counts}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <CourseFilterBar
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPricing={selectedPricing}
            setSelectedPricing={setSelectedPricing}
            categories={categories}
            filteredCourses={filteredCourses}
            selectedRows={selectedRows}
            courses={courses}
          />

          {selectedRows.length > 0 && (
            <CourseBulkActionBar
              selectedCount={selectedRows.length}
              onPublish={() => handleBulkStatusUpdate("published")}
              onDraft={() => handleBulkStatusUpdate("draft")}
              onPrivate={() => handleBulkStatusUpdate("private")}
              onTrash={() => handleBulkStatusUpdate("trash")}
              onDeletePermanently={handleBulkDeletePermanently}
              onCancel={clearSelection}
            />
          )}

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            {/* Desktop Table View */}
            <CourseTable
              courses={filteredCourses}
              selectedRows={selectedRows}
              onToggleSelectAll={handleToggleSelectAll}
              onToggleSelectRow={handleToggleSelectRow}
              onPublish={handlePublish}
              onMoveToTrash={handleMoveToTrash}
              onMoveToDraft={handleMoveToDraft}
              onMakePrivate={handleMakePrivate}
              onDeletePermanently={handleDeletePermanently}
              allVisibleSelected={allVisibleSelected(filteredCourses)}
            />

            {/* Mobile Card View */}
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                selected={selectedRows.includes(course.id)}
                onToggleSelect={() => handleToggleSelectRow(course.id)}
                onPublish={handlePublish}
                onMoveToTrash={handleMoveToTrash}
                onMoveToDraft={handleMoveToDraft}
                onMakePrivate={handleMakePrivate}
                onDeletePermanently={handleDeletePermanently}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}