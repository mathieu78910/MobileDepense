import { Text, TouchableOpacity, View } from "react-native";

export function ListHeading({ title }: { title: string }) {
  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Text className="text-xl font-semibold text-foreground">{title}</Text>
      <TouchableOpacity className="rounded-full border border-border bg-card px-4 py-2">
        <Text className="text-xs font-medium uppercase tracking-[1px] text-muted">
          View all
        </Text>
      </TouchableOpacity>
    </View>
  );
}
