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
  onViewDetails?: () => void;
  onDelete?: () => void;
};

export function SubscriptionCard({
  expanded = false,
  onPress,
  onViewDetails,
  onDelete,
  ...subscription
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-[30px] border border-border p-6 ${
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
          {subscription.status ? (
            <View className="mt-2 rounded-full bg-white/75 px-2.5 py-1">
              <Text className="text-[10px] font-semibold uppercase tracking-[1px] text-muted">
                {formatStatusLabel(subscription.status)}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      {expanded ? (
        <View className="mt-6 border-t border-border pt-5">
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

          <View className="mt-3 flex-row gap-3">
            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                onViewDetails?.();
              }}
              className="flex-1 rounded-2xl border border-border bg-white/70 px-4 py-3"
            >
              <Text className="text-center text-sm font-semibold text-foreground">
                View details
              </Text>
            </Pressable>
            <Pressable
              onPress={(event) => {
                event.stopPropagation();
                onDelete?.();
              }}
              className="flex-1 rounded-2xl border border-[#E9B5AE] bg-[#FCE9E6] px-4 py-3"
            >
              <Text
                className="text-center text-sm font-semibold"
                style={{ color: "#C35242" }}
              >
                Delete
              </Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </Pressable>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-3 flex-row items-start justify-between">
      <Text className="mr-3 text-sm text-muted">{label}</Text>
      <Text numberOfLines={1} className="max-w-[64%] text-right text-sm font-medium text-foreground">
        {value}
      </Text>
    </View>
  );
}
