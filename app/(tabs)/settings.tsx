import { homeUser } from "@/constants/data";
import { components } from "@/constants/theme";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const layout = components.layout;

  return (
    <View
      className="flex-1 bg-background"
      style={{
        paddingTop: insets.top + 18,
        paddingBottom: 132,
        paddingHorizontal: layout.screenPadding,
      }}
    >
      <Text className="text-3xl font-bold text-foreground">Settings</Text>
      <View className="mt-8 rounded-[28px] bg-card p-5">
        <Text className="text-sm uppercase tracking-[2px] text-muted">Account</Text>
        <Text className="mt-3 text-2xl font-semibold text-foreground">
          {homeUser.name}
        </Text>
        <Text className="mt-1 text-sm text-muted">{homeUser.email}</Text>
      </View>

      <View className="mt-4 rounded-[28px] border border-border bg-card p-5">
        <Text className="text-lg font-semibold text-foreground">Environment</Text>
        <Text className="mt-2 text-sm leading-6 text-muted">
          This local build includes the coded app structure, local data, modal creation flow,
          tabs, route groups, and detail cards. External services can be added on top.
        </Text>
      </View>

      <Link
        href="/(auth)/sign-in"
        className="mt-6 rounded-full bg-primary px-6 py-4 text-center text-white"
      >
        Sign out placeholder
      </Link>
    </View>
  );
}
