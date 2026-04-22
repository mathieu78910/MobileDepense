import { CreateSubscriptionModal } from "@/components/create-subscription-modal";
import { ListHeading } from "@/components/list-heading";
import { SubscriptionCard } from "@/components/subscription-card";
import { UpcomingSubscriptionCard } from "@/components/upcoming-subscription-card";
import { homeBalance, homeUser } from "@/constants/data";
import { components } from "@/constants/theme";
import { useSubscriptions } from "@/lib/subscriptions-context";
import { formatCurrency, formatMonthDay } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const layout = components.layout;
  const router = useRouter();
  const { subscriptions, upcoming, addSubscription, deleteSubscription } =
    useSubscriptions();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <>
      <FlatList
        data={subscriptions}
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
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-36"
        contentContainerStyle={{
          paddingTop: insets.top + 18,
          paddingHorizontal: layout.screenPadding,
        }}
        ListHeaderComponent={
          <>
            <View className="mb-6 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-4 h-14 w-14 items-center justify-center rounded-full bg-primary">
                  <Text className="text-xl font-bold text-white">
                    {homeUser.name.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text className="text-sm uppercase tracking-[2px] text-muted">
                    Welcome back
                  </Text>
                  <Text className="mt-1 text-2xl font-semibold text-foreground">
                    {homeUser.name}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => setModalOpen(true)}
                className="h-12 w-12 items-center justify-center rounded-full bg-card"
              >
                <Ionicons name="add" size={24} color="#261C15" />
              </Pressable>
            </View>

            <View className="mb-8 rounded-[32px] bg-primary p-6">
              <Text className="text-sm uppercase tracking-[2px] text-white/80">
                Monthly spend
              </Text>
              <View className="mt-4 flex-row items-end justify-between">
                <Text className="text-4xl font-bold text-white">
                  {formatCurrency(homeBalance.amount)}
                </Text>
                <Text className="text-sm text-white/80">
                  Renews {formatMonthDay(homeBalance.nextRenewalDate)}
                </Text>
              </View>
            </View>

            <View className="mb-7">
              <ListHeading title="Upcoming" />
              <FlatList
                data={upcoming}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <UpcomingSubscriptionCard item={item} />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 4 }}
                ListEmptyComponent={
                  <Text className="text-sm text-muted">No upcoming renewals yet.</Text>
                }
              />
            </View>

            <ListHeading title="All subscriptions" />
          </>
        }
        ListEmptyComponent={
          <Text className="text-sm text-muted">No subscriptions yet.</Text>
        }
      />

      <CreateSubscriptionModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={addSubscription}
      />
    </>
  );
}
