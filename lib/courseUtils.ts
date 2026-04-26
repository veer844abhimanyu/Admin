import { CSV_HEADERS } from "@/lib/courseConstants";
import { Course } from "@/types/course";

export function exportCoursesToCSV(courses: Course[]): void {
  const headers = Array.from(CSV_HEADERS);

  const rows = courses.map((course) => [
    `"${course.title.replace(/"/g, '""')}"`,
    `"${course.category}"`,
    `"${course.instructor}"`,
    `"${course.priceType}"`,
    `"${course.students}"`,
    `"${course.date}"`,
    `"${course.status}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
    "\n"
  );

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "courses.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function confirmDelete(message: string): boolean {
  return window.confirm(message);
}
