import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SubscriptionDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View
      className="flex-1 items-center justify-center bg-background px-6"
      style={{ paddingTop: insets.top + 18, paddingBottom: 32 }}
    >
      <Text className="text-3xl font-bold text-foreground">Subscription details</Text>
      <Text className="mt-3 text-center text-base text-muted">
        Dynamic route ready for real detail screens.
      </Text>
      <Text className="mt-4 rounded-full bg-card px-4 py-3 text-sm text-foreground">
        id: {id}
      </Text>
    </View>
  );
}
