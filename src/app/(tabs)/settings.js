
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getSettings, initDatabase, updateSettings } from "../../database/database";
import styles from "../../styles/SettingsStyles";

export default function SettingsScreen() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [paymentType, setPaymentType] = useState("monthly");
  const [customStartDay, setCustomStartDay] = useState("1");
  const [customEndDay, setCustomEndDay] = useState("31");
  const [breakMinutes, setBreakMinutes] = useState("0");
  const [currency, setCurrency] = useState("GBP");

  const [weekStartDay, setWeekStartDay] = useState("Monday");
  const [payDay, setPayDay] = useState("Friday");

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    initDatabase();
    const savedSettings = getSettings();
    setCurrency(savedSettings.currency_code || "GBP");

    setHourlyRate(String(savedSettings.default_hourly_rate));
    setPaymentType(savedSettings.payment_type);
    setCustomStartDay(String(savedSettings.custom_start_day));
    setCustomEndDay(String(savedSettings.custom_end_day));
    setBreakMinutes(String(savedSettings.default_break_minutes));
  }, []);

  function getCurrencySymbol(code) {
    const symbols = {
      GBP: "£",
      USD: "$",
      EUR: "€",
      GHS: "₵",
      NGN: "₦",
      CAD: "$",
      AUD: "$",
    };

    return symbols[code] || code;
  }

  function saveSettings() {
    updateSettings({
      default_hourly_rate: hourlyRate,
      payment_type: paymentType,
      custom_start_day: customStartDay,
      custom_end_day: customEndDay,
      default_break_minutes: breakMinutes,
      currency_code: currency,
      currency_symbol: getCurrencySymbol(currency),
      week_start_day: weekStartDay,
      pay_day: payDay,
    });

    router.back();
  }

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Pay Settings</Text>

      <Text style={styles.label}>Default Hourly Rate</Text>
      <TextInput
        style={styles.input}
        placeholder="12.50"
        value={hourlyRate}
        onChangeText={setHourlyRate}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Payment Period</Text>

      <Text style={styles.label}>Week Start Day</Text>

      <View style={styles.dayButtonContainer}>
        {weekDays.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              weekStartDay === day && styles.dayButtonSelected,
            ]}
            onPress={() => setWeekStartDay(day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                weekStartDay === day && styles.dayButtonTextSelected,
              ]}
            >
              {day.slice(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Pay Day</Text>

      <View style={styles.dayButtonContainer}>
        {weekDays.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              payDay === day && styles.dayButtonSelected,
            ]}
            onPress={() => setPayDay(day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                payDay === day && styles.dayButtonTextSelected,
              ]}
            >
              {day.slice(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.optionRow}>
        {["weekly", "monthly", "custom"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.optionButton,
              paymentType === type && styles.optionButtonActive,
            ]}
            onPress={() => setPaymentType(type)}
          >
            <Text
              style={[
                styles.optionText,
                paymentType === type && styles.optionTextActive,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {paymentType === "custom" && (
        <>
          <Text style={styles.label}>Custom Start Day</Text>
          <TextInput
            style={styles.input}
            placeholder="17"
            value={customStartDay}
            onChangeText={setCustomStartDay}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Custom End Day</Text>
          <TextInput
            style={styles.input}
            placeholder="16"
            value={customEndDay}
            onChangeText={setCustomEndDay}
            keyboardType="numeric"
          />
        </>
      )}

      <Text style={styles.label}>Default Break Minutes</Text>
      <TextInput
        style={styles.input}
        placeholder="60"
        value={breakMinutes}
        onChangeText={setBreakMinutes}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Currency</Text>

      <View style={styles.optionRow}>
        {["GBP", "USD", "EUR", "GHS"].map((code) => (
          <TouchableOpacity
            key={code}
            style={[
              styles.optionButton,
              currency === code && styles.optionButtonActive,
            ]}
            onPress={() => setCurrency(code)}
          >
            <Text
              style={[
                styles.optionText,
                currency === code && styles.optionTextActive,
              ]}
            >
              {code}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveSettings}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}