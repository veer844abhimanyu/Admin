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

export const settingsTabs = [
  { key: "pricing" as SettingsTab, label: "Pricing" },
  { key: "groupPricing" as SettingsTab, label: "Group Pricing" },
  { key: "general" as SettingsTab, label: "General" },
  { key: "scheduleAccess" as SettingsTab, label: "Schedule Access" },
  { key: "display" as SettingsTab, label: "Display" },
  { key: "contentDrip" as SettingsTab, label: "Content Drip" },
  { key: "certificate" as SettingsTab, label: "Certificate" },
  { key: "prerequisites" as SettingsTab, label: "Prerequisites" },
  { key: "faq" as SettingsTab, label: "FAQ" },
];

export type FaqItem = {
  id: number;
  title: string;
  content: string;
};

export type PrerequisiteItem = {
  id: number;
  title: string;
};
