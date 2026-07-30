import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { getSettings, getShifts, initDatabase } from "../../database/database";
import { calculateShiftPay, calculateTotalPay } from "../../utils/payCalculator";

export default function PaySummaryScreen() {
  const [shifts, setShifts] = useState([]);
  const [settings, setSettings] = useState(null);
  const [searchDate, setSearchDate] = useState("");

  useFocusEffect(
  useCallback(() => {
    initDatabase();
    setShifts(getShifts());
    setSettings(getSettings());
  }, [])
);

  const currency = settings?.currency_symbol || "£";

  const filteredShifts = shifts.filter((shift) =>
    shift.date.includes(searchDate)
  );

  const totalPay = calculateTotalPay(filteredShifts);

  let totalHours = 0;

  filteredShifts.forEach((shift) => {
    totalHours += calculateShiftPay(shift).paidHours;
  });

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F3F4F6",
        padding: 20,
        paddingTop: 60,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "800", marginBottom: 5 }}>
        Pay Summary
      </Text>

      <Text style={{ color: "#6B7280", marginBottom: 20 }}>
        View your shifts and estimated pay
      </Text>

      <TextInput
        placeholder="Search by date e.g. 2026-06-18"
        value={searchDate}
        onChangeText={setSearchDate}
        style={{
          backgroundColor: "#fff",
          padding: 15,
          borderRadius: 14,
          marginBottom: 15,
          borderWidth: 1,
          borderColor: "#E5E7EB",
        }}
      />

      <View
        style={{
          backgroundColor: "#2563EB",
          padding: 22,
          borderRadius: 20,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "#DBEAFE", fontSize: 14 }}>
          Total Estimated Pay
        </Text>

        <Text
          style={{
            color: "#fff",
            fontSize: 34,
            fontWeight: "900",
            marginTop: 5,
          }}
        >
          {currency}
          {totalPay.toFixed(2)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Text style={{ color: "#6B7280" }}>Shifts</Text>
          <Text style={{ fontSize: 22, fontWeight: "800" }}>
            {filteredShifts.length}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Text style={{ color: "#6B7280" }}>Hours</Text>
          <Text style={{ fontSize: 22, fontWeight: "800" }}>
            {totalHours.toFixed(2)}
          </Text>
        </View>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "800", marginBottom: 10 }}>
        Shift Breakdown
      </Text>

      {filteredShifts.map((shift) => {
        const pay = calculateShiftPay(shift);

        return (
          <View
            key={shift.id}
            style={{
              backgroundColor: "#fff",
              padding: 16,
              borderRadius: 18,
              marginBottom: 12,
              borderLeftWidth: 5,
              borderLeftColor:
                shift.shift_type === "Night Shift"
                  ? "#EF4444"
                  : shift.shift_type === "Day Shift"
                  ? "#2563EB"
                  : shift.shift_type === "Early Shift"
                  ? "#10B981"
                  : shift.shift_type === "Late Shift"
                  ? "#F59E0B"
                  : shift.shift_type === "Holiday"
                  ? "#8B5CF6"
                  : "#64748B",
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "800" }}>
              {shift.shift_type}
            </Text>

            <Text style={{ color: "#6B7280", marginTop: 4 }}>
              {shift.date}
            </Text>

            <Text style={{ marginTop: 8 }}>
              {shift.start_time} - {shift.end_time}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text>Hours: {pay.paidHours.toFixed(2)}</Text>

              <Text style={{ fontWeight: "800" }}>
                {currency}
                {pay.pay.toFixed(2)}
              </Text>
            </View>
          </View>
        );
      })}

      <View style={{ height: 90 }} />
    </ScrollView>
  );
}