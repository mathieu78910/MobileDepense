import type { BillingFrequency, SubscriptionCategory } from "@/types";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (input: {
    name: string;
    price: number;
    billingFrequency: BillingFrequency;
    category: SubscriptionCategory;
  }) => void;
};

const frequencies: BillingFrequency[] = ["Monthly", "Yearly"];
const categories: SubscriptionCategory[] = [
  "Entertainment",
  "Design",
  "Productivity",
  "Finance",
  "Music",
];

export function CreateSubscriptionModal({
  visible,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingFrequency, setBillingFrequency] =
    useState<BillingFrequency>("Monthly");
  const [category, setCategory] =
    useState<SubscriptionCategory>("Entertainment");

  const handleSubmit = () => {
    const numericPrice = Number(price);
    if (!name.trim() || Number.isNaN(numericPrice) || numericPrice <= 0) {
      return;
    }

    onSubmit({
      name: name.trim(),
      price: numericPrice,
      billingFrequency,
      category,
    });
    setName("");
    setPrice("");
    setBillingFrequency("Monthly");
    setCategory("Entertainment");
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-end bg-black/30"
      >
        <Pressable className="flex-1" onPress={onClose} />
        <View className="rounded-t-[32px] bg-card px-5 pb-10 pt-5">
          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-2xl font-semibold text-foreground">
              New subscription
            </Text>
            <Pressable onPress={onClose} className="h-10 w-10 items-center justify-center rounded-full bg-background">
              <Text className="text-lg text-foreground">×</Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Field label="Name">
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Spotify"
                placeholderTextColor="#7D685A"
                className="rounded-2xl border border-border bg-background px-4 py-4 text-foreground"
              />
            </Field>

            <Field label="Price">
              <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="9.99"
                placeholderTextColor="#7D685A"
                keyboardType="decimal-pad"
                className="rounded-2xl border border-border bg-background px-4 py-4 text-foreground"
              />
            </Field>

            <Field label="Frequency">
              <View className="flex-row gap-3">
                {frequencies.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    active={billingFrequency === value}
                    onPress={() => setBillingFrequency(value)}
                  />
                ))}
              </View>
            </Field>

            <Field label="Category">
              <View className="flex-row flex-wrap gap-3">
                {categories.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    active={category === value}
                    onPress={() => setCategory(value)}
                  />
                ))}
              </View>
            </Field>

            <Pressable
              onPress={handleSubmit}
              className="mt-3 rounded-[22px] bg-primary px-5 py-4"
            >
              <Text className="text-center text-base font-semibold text-white">
                Create subscription
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-sm font-medium text-foreground">{label}</Text>
      {children}
    </View>
  );
}

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-4 py-3 ${active ? "border-primary bg-primary" : "border-border bg-background"}`}
    >
      <Text className={active ? "text-white" : "text-foreground"}>{label}</Text>
    </Pressable>
  );
}
