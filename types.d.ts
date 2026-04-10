import type { Href } from "expo-router";

export type BillingFrequency = "Monthly" | "Yearly";
export type SubscriptionCategory =
  | "Entertainment"
  | "Design"
  | "Productivity"
  | "Finance"
  | "Music";
export type SubscriptionStatus = "active" | "trial" | "paused";

export type AppTab = {
  name: string;
  title: string;
  href?: Href;
};

export type AppSubscription = {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingFrequency: BillingFrequency;
  category?: SubscriptionCategory;
  paymentMethod?: string;
  status?: SubscriptionStatus;
  plan?: string;
  startDate?: string;
  renewalDate?: string;
  color?: string;
};

export type UpcomingSubscription = AppSubscription & {
  daysLeft: number;
};
