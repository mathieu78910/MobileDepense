import { SubscriptionsProvider } from "@/lib/subscriptions-context";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <SubscriptionsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SubscriptionsProvider>
  );
}
