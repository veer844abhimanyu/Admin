export type Customer = {
  id: number;
  name: string;
  phone: string;
  pinCode: string;
  address: string;
  joined: string;
  lastLogin: string;
  email?: string;
  coupons: number;
  claims: number;
  events: number;
  note?: string;
};

export const STORAGE_KEY = "admin_customers";

export const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Sanjay Khurana",
    phone: "9814035599",
    pinCode: "6196",
    address: "",
    joined: "24 Mar, 2026",
    lastLogin: "24 Mar, 2026 06:54 p.m.",
    coupons: 2,
    claims: 0,
    events: 1,
    note: "",
  },
  {
    id: 2,
    name: "Pradeep Shastri",
    phone: "9680707200",
    pinCode: "6174",
    address: "",
    joined: "24 Mar, 2026",
    lastLogin: "24 Mar, 2026 01:22 p.m.",
    coupons: 1,
    claims: 1,
    events: 0,
    note: "",
  },
  {
    id: 3,
    name: "Sonal Deolikar",
    phone: "7038228801",
    pinCode: "4559",
    address: "sonaldeolikar0@gmail.com",
    joined: "22 Mar, 2026",
    lastLogin: "22 Mar, 2026 09:20 a.m.",
    email: "sonaldeolikar0@gmail.com",
    coupons: 3,
    claims: 2,
    events: 1,
    note: "",
  },
  {
    id: 4,
    name: "Siddhant Bali Dubey",
    phone: "9993330899",
    pinCode: "9512",
    address: "shradubey1980@gmail.com",
    joined: "21 Mar, 2026",
    lastLogin: "21 Mar, 2026 04:04 a.m.",
    email: "shradubey1980@gmail.com",
    coupons: 1,
    claims: 0,
    events: 1,
    note: "",
  },
];

export function getCustomers(): Customer[] {
  if (typeof window === "undefined") return initialCustomers;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCustomers));
    return initialCustomers;
  }

  try {
    const parsed = JSON.parse(raw) as Customer[];
    if (!Array.isArray(parsed)) return initialCustomers;
    return parsed;
  } catch {
    return initialCustomers;
  }
}

export function saveCustomers(customers: Customer[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}