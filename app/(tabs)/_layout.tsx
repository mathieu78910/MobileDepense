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
          paddingHorizontal: 6,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 14,
          paddingBottom: 4,
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
              <View className="items-center justify-center pt-1">
                <View
                  className={`h-11 w-11 items-center justify-center rounded-full ${
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
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.78}
                  maxFontSizeMultiplier={1}
                  style={{ width: tabBar.labelWidth }}
                  className={`mt-1.5 text-center text-[11px] font-medium ${
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
