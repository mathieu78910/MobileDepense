import { initialSubscriptions } from "@/constants/data";
import { calculateDaysLeft, makeSubscriptionId } from "@/lib/utils";
import type {
  AppSubscription,
  BillingFrequency,
  SubscriptionCategory,
} from "@/types";
import React, { createContext, useContext, useMemo, useState } from "react";

type CreateSubscriptionInput = {
  name: string;
  price: number;
  billingFrequency: BillingFrequency;
  category: SubscriptionCategory;
};

type SubscriptionsContextValue = {
  subscriptions: AppSubscription[];
  addSubscription: (input: CreateSubscriptionInput) => void;
};

const SubscriptionsContext = createContext<SubscriptionsContextValue | null>(null);

const categoryColors: Record<SubscriptionCategory, string> = {
  Entertainment: "#E0E7FF",
  Design: "#F2D2C4",
  Productivity: "#D7DFCC",
  Finance: "#F7D794",
  Music: "#E87A53",
};

export function SubscriptionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subscriptions, setSubscriptions] =
    useState<AppSubscription[]>(initialSubscriptions);

  const value = useMemo<SubscriptionsContextValue>(
    () => ({
      subscriptions,
      addSubscription: (input) => {
        const startDate = new Date();
        const renewalDate = new Date(startDate);
        if (input.billingFrequency === "Yearly") {
          renewalDate.setFullYear(renewalDate.getFullYear() + 1);
        } else {
          renewalDate.setMonth(renewalDate.getMonth() + 1);
        }

        const next: AppSubscription = {
          id: makeSubscriptionId(input.name),
          name: input.name,
          price: input.price,
          currency: "USD",
          billingFrequency: input.billingFrequency,
          category: input.category,
          paymentMethod: "Visa ending in 8530",
          status: "active",
          plan: input.billingFrequency === "Yearly" ? "Annual" : "Standard",
          startDate: startDate.toISOString(),
          renewalDate: renewalDate.toISOString(),
          color: categoryColors[input.category],
        };

        setSubscriptions((current) => [next, ...current]);
      },
    }),
    [subscriptions],
  );

  return (
    <SubscriptionsContext.Provider value={value}>
      {children}
    </SubscriptionsContext.Provider>
  );
}

export function useSubscriptions() {
  const context = useContext(SubscriptionsContext);
  if (!context) {
    throw new Error("useSubscriptions must be used within SubscriptionsProvider");
  }

  const upcoming = context.subscriptions
    .map((subscription) => ({
      ...subscription,
      daysLeft: calculateDaysLeft(subscription.renewalDate),
    }))
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 4);

  return {
    ...context,
    upcoming,
  };
}
