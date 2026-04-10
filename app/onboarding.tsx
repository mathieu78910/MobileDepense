import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function OnboardingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-4xl font-bold text-foreground">Recurly</Text>
      <Text className="mt-4 text-center text-base leading-6 text-muted">
        Track every subscription, spot upcoming renewals, and keep your spending visible.
      </Text>
      <Link
        href="/(auth)/sign-in"
        className="mt-8 rounded-full bg-primary px-6 py-4 text-white"
      >
        Sign in
      </Link>
    </View>
  );
}
