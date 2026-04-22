import { formatCurrency } from "@/lib/utils";
import type { UpcomingSubscription } from "@/types";
import { Text, View } from "react-native";

export function UpcomingSubscriptionCard({
  item,
}: {
  item: UpcomingSubscription;
}) {
  return (
    <View
      className="mr-4 w-52 rounded-[30px] border border-border p-5"
      style={{ backgroundColor: item.color ?? "#FFF9F4" }}
    >
      <View className="mb-5 flex-row items-start justify-between">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/70">
          <Text className="text-lg font-bold text-foreground">
            {item.name.charAt(0)}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-base font-semibold text-foreground">
            {formatCurrency(item.price, item.currency)}
          </Text>
          <Text className="text-xs text-muted">
            {item.daysLeft > 1 ? `${item.daysLeft} days left` : "Last day"}
          </Text>
        </View>
      </View>
      <Text numberOfLines={1} className="text-sm font-medium text-foreground">
        {item.name}
      </Text>
    </View>
  );
}
