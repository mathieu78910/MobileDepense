import type { SubscriptionStatus } from "@/types";

export function formatCurrency(value: number, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

export function formatMonthDay(input?: string) {
  if (!input) return "";
  const date = new Date(input);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatSubscriptionDateTime(input?: string) {
  if (!input) return "Not provided";
  const date = new Date(input);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatStatusLabel(status?: SubscriptionStatus) {
  if (!status) return "Not provided";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function calculateDaysLeft(input?: string) {
  if (!input) return 0;
  const now = new Date();
  const renewal = new Date(input);
  const diff = renewal.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function makeSubscriptionId(name: string) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
}
