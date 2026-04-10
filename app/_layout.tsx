import { SubscriptionsProvider } from "@/lib/subscriptions-context";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <SubscriptionsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="subscriptions/[id]" />
      </Stack>
    </SubscriptionsProvider>
  );
}
