import { SubscriptionCard } from "@/components/subscription-card";
import { components } from "@/constants/theme";
import { useSubscriptions } from "@/lib/subscriptions-context";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, FlatList, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SubscriptionsScreen() {
  const insets = useSafeAreaInsets();
  const layout = components.layout;
  const router = useRouter();
  const { subscriptions, deleteSubscription } = useSubscriptions();
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const confirmDelete = (id: string, name: string) => {
    Alert.alert(
      "Delete subscription",
      `Remove ${name} from your subscriptions?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteSubscription(id);
            setExpandedId((current) => (current === id ? null : current));
          },
        },
      ],
    );
  };

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return subscriptions;
    return subscriptions.filter((item) =>
      [item.name, item.category, item.plan]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(needle)),
    );
  }, [query, subscriptions]);

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SubscriptionCard
          {...item}
          expanded={expandedId === item.id}
          onPress={() =>
            setExpandedId((current) => (current === item.id ? null : item.id))
          }
          onViewDetails={() =>
            router.push({
              pathname: "/subscriptions/[id]",
              params: { id: item.id },
            })
          }
          onDelete={() => confirmDelete(item.id, item.name)}
        />
      )}
      keyboardDismissMode="on-drag"
      ItemSeparatorComponent={() => <View className="h-4" />}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-36"
      contentContainerStyle={{
        paddingTop: insets.top + 18,
        paddingHorizontal: layout.screenPadding,
      }}
      ListHeaderComponent={
        <View className="mb-6">
          <Text className="text-3xl font-bold text-foreground">Subscriptions</Text>
          <Text className="mt-2 text-base text-muted">
            Search and review your current recurring charges.
          </Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search subscriptions"
            placeholderTextColor="#7D685A"
            className="mt-5 rounded-[24px] border border-border bg-card px-5 py-4 text-foreground"
          />
        </View>
      }
      ListEmptyComponent={
        <Text className="text-sm text-muted">No matching subscriptions.</Text>
      }
    />
  );
}
