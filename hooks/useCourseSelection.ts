"use client";

import { useState } from "react";
import { Course, CourseStatus } from "@/types/course";

interface UseCourseSelectionReturn {
  selectedRows: number[];
  toggleSelectRow: (id: number) => void;
  toggleSelectAll: (filteredCourses: Course[]) => void;
  allVisibleSelected: (filteredCourses: Course[]) => boolean;
  clearSelection: () => void;
  updateCourseStatus: (
    courses: Course[],
    status: CourseStatus
  ) => [Course[], number[]];
  deleteSelected: (courses: Course[]) => Course[];
  moveToTrash: (courses: Course[], id: number) => Course[];
  moveToDraft: (courses: Course[], id: number) => Course[];
  makePrivate: (courses: Course[], id: number) => Course[];
  publishCourse: (courses: Course[], id: number) => Course[];
  deletePermanently: (courses: Course[], id: number) => Course[];
}

export function useCourseSelection(): UseCourseSelectionReturn {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleSelectRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = (filteredCourses: Course[]) => {
    const allVisible = filteredCourses.every((course) =>
      selectedRows.includes(course.id)
    );

    if (allVisible) {
      setSelectedRows((prev) =>
        prev.filter(
          (id) => !filteredCourses.some((course) => course.id === id)
        )
      );
    } else {
      const visibleIds = filteredCourses.map((course) => course.id);
      setSelectedRows((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const allVisibleSelected = (filteredCourses: Course[]): boolean => {
    return (
      filteredCourses.length > 0 &&
      filteredCourses.every((course) => selectedRows.includes(course.id))
    );
  };

  const clearSelection = () => {
    setSelectedRows([]);
  };

  const updateCourseStatus = (
    courses: Course[],
    status: CourseStatus
  ): [Course[], number[]] => {
    const updated = courses.map((course) =>
      selectedRows.includes(course.id) ? { ...course, status } : course
    );
    return [updated, []];
  };

  const deleteSelected = (courses: Course[]): Course[] => {
    return courses.filter((course) => !selectedRows.includes(course.id));
  };

  const moveToTrash = (courses: Course[], id: number): Course[] => {
    return courses.map((course) =>
      course.id === id ? { ...course, status: "trash" as const } : course
    );
  };

  const moveToDraft = (courses: Course[], id: number): Course[] => {
    return courses.map((course) =>
      course.id === id ? { ...course, status: "draft" as const } : course
    );
  };

  const makePrivate = (courses: Course[], id: number): Course[] => {
    return courses.map((course) =>
      course.id === id ? { ...course, status: "private" as const } : course
    );
  };

  const publishCourse = (courses: Course[], id: number): Course[] => {
    return courses.map((course) =>
      course.id === id ? { ...course, status: "published" as const } : course
    );
  };

  const deletePermanently = (courses: Course[], id: number): Course[] => {
    return courses.filter((course) => course.id !== id);
  };

  return {
    selectedRows,
    toggleSelectRow,
    toggleSelectAll,
    allVisibleSelected,
    clearSelection,
    updateCourseStatus,
    deleteSelected,
    moveToTrash,
    moveToDraft,
    makePrivate,
    publishCourse,
    deletePermanently,
  };
}
