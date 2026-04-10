import { appTabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "home",
  subscriptions: "wallet",
  insights: "stats-chart",
  settings: "settings",
};

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const tabBar = components.tabBar;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          height: tabBar.height,
          bottom: Math.max(insets.bottom, tabBar.horizontalInset),
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
          backgroundColor: colors.tab,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          paddingVertical: (tabBar.height - tabBar.iconFrame) / 2.2,
        },
      }}
    >
      {appTabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <View
                  className={`h-12 w-12 items-center justify-center rounded-full ${
                    focused ? "bg-white" : ""
                  }`}
                >
                  <Ionicons
                    name={icons[tab.name]}
                    size={20}
                    color={focused ? colors.tab : "#D5C1B4"}
                  />
                </View>
                <Text
                  className={`mt-1 text-[10px] ${
                    focused ? "text-white" : "text-[#D5C1B4]"
                  }`}
                >
                  {tab.title}
                </Text>
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
