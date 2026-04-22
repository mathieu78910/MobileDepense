import { Link } from "expo-router";
import { Text, TextInput, View } from "react-native";

export default function SignInScreen() {
  return (
    <View className="flex-1 justify-center bg-background px-6">
      <Text className="text-4xl font-bold text-foreground">Sign in</Text>
      <Text className="mt-3 text-base text-muted">
        Placeholder auth screen matching the route structure from the tutorial.
      </Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#7D685A"
        className="mt-8 rounded-2xl border border-border bg-card px-4 py-4 text-foreground"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#7D685A"
        secureTextEntry
        className="mt-4 rounded-2xl border border-border bg-card px-4 py-4 text-foreground"
      />
      <Link
        href="/(tabs)"
        className="mt-6 rounded-full bg-primary px-6 py-4 text-center text-white"
      >
        Continue locally
      </Link>
      <Link href="/(auth)/sign-up" className="mt-5 text-center text-sm text-muted">
        Create an account
      </Link>
    </View>
  );
}
