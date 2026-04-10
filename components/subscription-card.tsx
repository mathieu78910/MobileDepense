import {
  formatCurrency,
  formatStatusLabel,
  formatSubscriptionDateTime,
} from "@/lib/utils";
import type { AppSubscription } from "@/types";
import { Pressable, Text, View } from "react-native";

type Props = AppSubscription & {
  expanded?: boolean;
  onPress?: () => void;
};

export function SubscriptionCard({
  expanded = false,
  onPress,
  ...subscription
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-[28px] border border-border p-5 ${
        expanded ? "bg-card" : ""
      }`}
      style={{
        backgroundColor: expanded
          ? undefined
          : (subscription.color ?? "#FFF9F4"),
      }}
    >
      <View className="flex-row items-start justify-between">
        <View className="mr-4 flex-1 flex-row items-center">
          <View className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-white/70">
            <Text className="text-lg font-bold text-foreground">
              {subscription.name.charAt(0)}
            </Text>
          </View>
          <View className="flex-1">
            <Text numberOfLines={1} className="text-base font-semibold text-foreground">
              {subscription.name}
            </Text>
            <Text numberOfLines={1} className="mt-1 text-sm text-muted">
              {subscription.category?.trim() ||
                subscription.plan?.trim() ||
                formatSubscriptionDateTime(subscription.renewalDate)}
            </Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-base font-semibold text-foreground">
            {formatCurrency(subscription.price, subscription.currency)}
          </Text>
          <Text className="mt-1 text-xs text-muted">
            {subscription.billingFrequency}
          </Text>
        </View>
      </View>

      {expanded ? (
        <View className="mt-5 border-t border-border pt-4">
          <DetailRow
            label="Payment"
            value={subscription.paymentMethod?.trim() || "Not provided"}
          />
          <DetailRow
            label="Category"
            value={
              subscription.category?.trim() ||
              subscription.plan?.trim() ||
              "Not provided"
            }
          />
          <DetailRow
            label="Started"
            value={formatSubscriptionDateTime(subscription.startDate)}
          />
          <DetailRow
            label="Renewal"
            value={formatSubscriptionDateTime(subscription.renewalDate)}
          />
          <DetailRow
            label="Status"
            value={formatStatusLabel(subscription.status)}
          />
        </View>
      ) : null}
    </Pressable>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-3 flex-row items-start justify-between">
      <Text className="mr-3 text-sm text-muted">{label}</Text>
      <Text numberOfLines={1} className="max-w-[68%] text-right text-sm font-medium text-foreground">
        {value}
      </Text>
    </View>
  );
}
