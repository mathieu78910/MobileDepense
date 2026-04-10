import type { AppSubscription, AppTab } from "@/types";

export const appTabs: AppTab[] = [
  { name: "index", title: "Home" },
  { name: "subscriptions", title: "Subscriptions" },
  { name: "insights", title: "Insights" },
  { name: "settings", title: "Settings" },
];

export const homeUser = {
  name: "Mathieu",
  email: "mathieu@example.com",
};

export const homeBalance = {
  amount: 287.64,
  nextRenewalDate: "2026-04-22T09:00:00.000Z",
};

export const initialSubscriptions: AppSubscription[] = [
  {
    id: "spotify",
    name: "Spotify",
    price: 10.99,
    currency: "USD",
    billingFrequency: "Monthly",
    category: "Music",
    paymentMethod: "Visa ending in 8530",
    status: "active",
    plan: "Premium Individual",
    startDate: "2025-11-01T10:00:00.000Z",
    renewalDate: "2026-04-12T10:00:00.000Z",
    color: "#E87A53",
  },
  {
    id: "adobe",
    name: "Adobe Creative Cloud",
    price: 59.99,
    currency: "USD",
    billingFrequency: "Monthly",
    category: "Design",
    paymentMethod: "Mastercard ending in 4012",
    status: "active",
    plan: "All Apps",
    startDate: "2025-08-14T10:00:00.000Z",
    renewalDate: "2026-04-18T10:00:00.000Z",
    color: "#F2D2C4",
  },
  {
    id: "notion",
    name: "Notion",
    price: 15,
    currency: "USD",
    billingFrequency: "Monthly",
    category: "Productivity",
    paymentMethod: "Visa ending in 8530",
    status: "trial",
    plan: "Plus",
    startDate: "2026-03-21T10:00:00.000Z",
    renewalDate: "2026-04-29T10:00:00.000Z",
    color: "#D7DFCC",
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    price: 13.99,
    currency: "USD",
    billingFrequency: "Monthly",
    category: "Entertainment",
    paymentMethod: "Amex ending in 1204",
    status: "paused",
    plan: "Individual",
    startDate: "2025-12-10T10:00:00.000Z",
    renewalDate: "2026-05-03T10:00:00.000Z",
    color: "#E0E7FF",
  },
];
