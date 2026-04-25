export type EnrollmentStatus = "active" | "completed" | "inactive";
export type PaymentStatus = "paid" | "pending" | "refunded";

export type CourseEnrollment = {
  id: number;
  courseId: number;
  studentName: string;
  email: string;
  phone: string;
  city: string;
  enrollmentDate: string;
  lastActive: string;
  plan: string;
  amountPaid: number;
  paymentStatus: PaymentStatus;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  status: EnrollmentStatus;
};

const names = [
  "Pradeep Shastri",
  "Kumar Mittal",
  "Raman Sharma",
  "Sonal Deolikar",
  "Siddhant Bali",
  "Rahul Rajak",
  "Anjali Verma",
  "Meera Kapoor",
  "Amit Singh",
  "Neha Gupta",
  "Vikas Yadav",
  "Priya Nair",
  "Deepak Jain",
  "Kavita Sharma",
  "Rohit Mehra",
  "Nisha Patel",
];

const cities = [
  "Delhi",
  "Jaipur",
  "Mumbai",
  "Bhopal",
  "Pune",
  "Lucknow",
  "Indore",
  "Chandigarh",
];

const plans = ["Basic", "Premium", "Lifetime"];

export function getCourseEnrollments(
  courseId: number,
  studentCount: number
): CourseEnrollment[] {
  return Array.from({ length: studentCount }, (_, index) => {
    const name = names[(courseId + index) % names.length];
    const normalizedName = name.toLowerCase().replace(/\s+/g, ".");
    const progress = (courseId * 17 + index * 11) % 101;
    const totalLessons = 24 + ((courseId + index) % 9);
    const completedLessons = Math.round((progress / 100) * totalLessons);
    const paymentStatus: PaymentStatus =
      index % 13 === 0 ? "pending" : index % 17 === 0 ? "refunded" : "paid";

    return {
      id: Number(`${courseId}${String(index + 1).padStart(3, "0")}`),
      courseId,
      studentName: name,
      email: `${normalizedName}${index + 1}@example.com`,
      phone: `9${courseId}${String(80000000 + index * 13729).slice(0, 8)}`,
      city: cities[(courseId + index) % cities.length],
      enrollmentDate: `2026-03-${String((index % 27) + 1).padStart(2, "0")}`,
      lastActive: `2026-04-${String((index % 24) + 1).padStart(2, "0")}`,
      plan: plans[(courseId + index) % plans.length],
      amountPaid: paymentStatus === "paid" ? 1999 + ((index % 5) * 500) : 0,
      paymentStatus,
      progress,
      completedLessons,
      totalLessons,
      status:
        progress >= 100 ? "completed" : index % 9 === 0 ? "inactive" : "active",
    };
  });
}
