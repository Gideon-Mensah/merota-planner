import { Text, View } from "react-native";
import { calculateShiftPay } from "../utils/payCalculator";

export default function ShiftCard({ shift }) {
  const pay = calculateShiftPay(shift);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginBottom: 10,
        padding: 15,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {shift.shift_type}
      </Text>

      <Text>{shift.date}</Text>

      <Text>
        {shift.start_time} - {shift.end_time}
      </Text>

      <Text>Hours: {pay.paidHours.toFixed(2)}</Text>

      <Text>Pay: £{pay.pay.toFixed(2)}</Text>
    </View>
  );
}