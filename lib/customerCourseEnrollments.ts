import { Course } from "@/types/course";

export type CustomerCourseStatus = "active" | "completed" | "paused";
export type CustomerCoursePaymentStatus = "paid" | "pending" | "refunded";

export type CustomerCourseEnrollment = {
  id: number;
  customerId: number;
  courseId: number;
  courseTitle: string;
  category: string;
  instructor: string;
  priceType: Course["priceType"];
  plan: string;
  enrollmentDate: string;
  validTill: string;
  lastAccessed: string;
  amountPaid: number;
  paymentStatus: CustomerCoursePaymentStatus;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  certificateIssued: boolean;
  status: CustomerCourseStatus;
};

const plans = ["Basic", "Premium", "Lifetime"];

export function getCustomerCourseEnrollments(
  customerId: number,
  courses: Course[]
): CustomerCourseEnrollment[] {
  if (courses.length === 0) return [];

  const enrollmentCount = Math.min((customerId % 3) + 1, courses.length);
  const startIndex = customerId % courses.length;

  return Array.from({ length: enrollmentCount }, (_, index) => {
    const course = courses[(startIndex + index) % courses.length];
    const progress = (customerId * 19 + course.id * 13 + index * 7) % 101;
    const totalLessons = 18 + ((course.id + customerId + index) % 15);
    const completedLessons = Math.round((progress / 100) * totalLessons);
    const paymentStatus: CustomerCoursePaymentStatus =
      index === 0 || course.priceType === "free" ? "paid" : "pending";

    return {
      id: Number(`${customerId}${String(course.id).padStart(3, "0")}`),
      customerId,
      courseId: course.id,
      courseTitle: course.title,
      category: course.category,
      instructor: course.instructor || "Admin Team",
      priceType: course.priceType,
      plan: course.priceType === "free" ? "Free" : plans[(customerId + index) % plans.length],
      enrollmentDate: `2026-03-${String(((customerId + index) % 27) + 1).padStart(2, "0")}`,
      validTill:
        course.priceType === "free"
          ? "Lifetime"
          : `2027-03-${String(((customerId + index) % 27) + 1).padStart(2, "0")}`,
      lastAccessed: `2026-04-${String(((customerId + course.id) % 24) + 1).padStart(2, "0")}`,
      amountPaid:
        course.priceType === "free" || paymentStatus !== "paid"
          ? 0
          : 1999 + ((customerId + index) % 5) * 500,
      paymentStatus,
      progress,
      completedLessons,
      totalLessons,
      certificateIssued: progress >= 100,
      status: progress >= 100 ? "completed" : index === 2 ? "paused" : "active",
    };
  });
}
