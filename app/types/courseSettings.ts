export type SettingsTab =
  | "pricing"
  | "groupPricing"
  | "general"
  | "scheduleAccess"
  | "display"
  | "contentDrip"
  | "certificate"
  | "prerequisites"
  | "faq";

export type FaqItem = {
  id: number;
  title: string;
  content: string;
};

export type PrerequisiteItem = {
  id: number;
  title: string;
};

export const settingsTabs: { key: SettingsTab; label: string }[] = [
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