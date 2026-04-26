import { LucideIcon } from "lucide-react";

export type SidebarItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type StatCardItem = {
  id: string;
  title: string;
  value: number;
  iconBg: string;
  iconColor: string;
  cardBg?: string;
};

export type EnrollmentItem = {
  id: number;
  name: string;
  enrolledFor: string;
  status: "In-progress" | "Completed" | "Pending";
  date: string;
};

export type OrderItem = {
  id: number;
  item: string;
  customer: string;
  status: "In-progress" | "Completed" | "Pending";
  date: string;
};
