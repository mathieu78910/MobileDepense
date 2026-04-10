import { useSubscriptions } from "@/lib/subscriptions-context";
import { formatCurrency } from "@/lib/utils";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const { subscriptions } = useSubscriptions();

  const total = subscriptions.reduce((sum, item) => sum + item.price, 0);
  const active = subscriptions.filter((item) => item.status === "active").length;
  const yearly = subscriptions.filter(
    (item) => item.billingFrequency === "Yearly",
  ).length;

  return (
    <View
      className="flex-1 bg-background px-5"
      style={{ paddingTop: insets.top + 18, paddingBottom: 120 }}
    >
      <Text className="text-3xl font-bold text-foreground">Insights</Text>
      <Text className="mt-2 text-base text-muted">
        Quick metrics on your recurring spend.
      </Text>

      <View className="mt-8 rounded-[28px] bg-card p-5">
        <Text className="text-sm uppercase tracking-[2px] text-muted">Total tracked</Text>
        <Text className="mt-3 text-4xl font-bold text-foreground">
          {formatCurrency(total)}
        </Text>
      </View>

      <View className="mt-4 flex-row gap-4">
        <MetricCard label="Active" value={String(active)} />
        <MetricCard label="Yearly" value={String(yearly)} />
      </View>

      <View className="mt-4 rounded-[28px] border border-border bg-card p-5">
        <Text className="text-lg font-semibold text-foreground">Next step</Text>
        <Text className="mt-2 text-sm leading-6 text-muted">
          This screen is ready for PostHog metrics or backend-driven analytics once you wire those services in.
        </Text>
      </View>
    </View>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-[28px] border border-border bg-card p-5">
      <Text className="text-sm uppercase tracking-[2px] text-muted">{label}</Text>
      <Text className="mt-3 text-3xl font-bold text-foreground">{value}</Text>
    </View>
  );
}
