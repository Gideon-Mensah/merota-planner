import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { addShift, deleteShift, getSettings, getShifts, initDatabase } from "../../database/database";
import styles from "../../styles/HomeStyles";
import {
  calculateShiftPay,
  calculateTotalPay,
  filterShiftsByPeriod,
  getPayPeriod,
} from "../../utils/payCalculator";


export default function HomeScreen() {
  const [shifts, setShifts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState("");
  const [shiftType, setShiftType] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [breakMinutes, setBreakMinutes] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [notes, setNotes] = useState("");

  const [settings, setSettings] = useState(null);
  const [selectedPeriodDate, setSelectedPeriodDate] = useState(new Date());

  const [selectedShift, setSelectedShift] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);



  useEffect(() => {
    initDatabase();
    loadShifts();
    loadSettings();
  }, []);

  function loadShifts() {
    const savedShifts = getShifts();
    setShifts(savedShifts);
  }

  function loadSettings() {
    const savedSettings = getSettings();
    setSettings(savedSettings);
  }

  function openShiftForm(selectedDate) {
    setDate(selectedDate);
    setShiftType("");
    setStartTime("");
    setEndTime("");
    setBreakMinutes("");
    setHourlyRate("");
    setNotes("");
    setModalVisible(true);
  }

  function saveShift() {
    addShift({
      date,
      shift_type: shiftType,
      start_time: startTime,
      end_time: endTime,
      break_minutes: Number(breakMinutes),
      hourly_rate: Number(hourlyRate),
      notes,
    });

    setModalVisible(false);
    loadShifts();
  }

  function handleDeleteShift() {
    if (!selectedShift) return;

    deleteShift(selectedShift.id);
    setDetailsModalVisible(false);
    setSelectedShift(null);
    loadShifts();
  }

  const periodShifts = filterShiftsByPeriod(
    shifts,
    settings,
    selectedPeriodDate
  );

  const totalPay = calculateTotalPay(periodShifts);

  const payPeriod = settings
    ? getPayPeriod(settings, selectedPeriodDate)
    : null;



  const shiftColors = {
    "Day Shift": "#2563EB",
    "Night Shift": "#EF4444",
    "Early Shift": "#10B981",
    "Late Shift": "#F59E0B",
    "Holiday": "#8B5CF6",
    "Sick Pay": "#64748B",
  };

  const markedDates = {};

  shifts.forEach((shift) => {
    markedDates[shift.date] = {
      selected: true,
      selectedColor:
        shiftColors[shift.shift_type] || "#6366F1",
      selectedTextColor: "#fff",
    };
  });

  function handleDayPress(dateString) {
    const shift = shifts.find((s) => s.date === dateString);

    if (shift) {
      setSelectedShift(shift);
      setDetailsModalVisible(true);
    } else {
      openShiftForm(dateString);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadShifts();
      loadSettings();
    }, [])
  );

  const totalShifts = periodShifts.length;

  const totalHours = periodShifts.reduce((sum, shift) => {
    return sum + calculateShiftPay(shift).paidHours;
  }, 0);

  const holidayCount = periodShifts.filter(
    (shift) => shift.shift_type === "Holiday"
  ).length;

  const sickCount = periodShifts.filter(
    (shift) => shift.shift_type === "Sick Pay"
  ).length;

  const nextShift = shifts
    .filter((shift) => new Date(shift.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning 👋";
    if (hour < 17) return "Good Afternoon 👋";
    return "Good Evening 👋";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.title}>MeRota Planner</Text>
      </View>

      <View style={styles.payCard}>
        <Text style={styles.payLabel}>Estimated Pay</Text>

        <Text style={styles.payAmount}>
          {settings?.currency_symbol || "£"}
          {totalPay.toFixed(2)}
        </Text>

        {payPeriod && (
          <Text style={styles.payPeriodText}>
            {payPeriod.startDate.toDateString()} - {payPeriod.endDate.toDateString()}
          </Text>
        )}
      </View>

      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{totalShifts}</Text>
          <Text style={styles.summaryLabel}>Shifts</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{totalHours.toFixed(1)}</Text>
          <Text style={styles.summaryLabel}>Hours</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{holidayCount}</Text>
          <Text style={styles.summaryLabel}>Holiday</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{sickCount}</Text>
          <Text style={styles.summaryLabel}>Sick</Text>
        </View>
      </View>

      {nextShift && (
        <View style={styles.nextShiftCard}>
          <Text style={styles.sectionTitle}>Next Shift</Text>

          <Text style={styles.nextShiftType}>{nextShift.shift_type}</Text>

          <Text style={styles.nextShiftText}>{nextShift.date}</Text>

          <Text style={styles.nextShiftText}>
            {nextShift.start_time} - {nextShift.end_time}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => router.push("/settings")}
      >
        <Text style={styles.settingsButtonText}>Pay Settings</Text>
      </TouchableOpacity>

      {settings?.payment_type === "weekly" && (
        <View style={styles.weekControls}>
          <TouchableOpacity
            style={styles.weekButton}
            onPress={() => {
              const newDate = new Date(selectedPeriodDate);
              newDate.setDate(newDate.getDate() - 7);
              setSelectedPeriodDate(newDate);
            }}
          >
            <Text style={styles.weekButtonText}>Previous Week</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.weekButton}
            onPress={() => {
              const newDate = new Date(selectedPeriodDate);
              newDate.setDate(newDate.getDate() + 7);
              setSelectedPeriodDate(newDate);
            }}
          >
            <Text style={styles.weekButtonText}>Next Week</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.calendarContainer}>
        <Calendar
          firstDay={1}
          style={styles.calendarStyle}
          theme={{
            calendarBackground: "#FFFFFF",
            textSectionTitleColor: "#6B7280",
            textSectionTitleDisabledColor: "#D1D5DB",
            dayTextColor: "#111827",
            monthTextColor: "#111827",
            textDayFontSize: 22,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 16,
            textDayFontWeight: "700",
            textMonthFontWeight: "800",
            textDayHeaderFontWeight: "700",
            arrowColor: "#111827",

          }}
          onMonthChange={(month) => {
            const newDate = new Date(month.year, month.month - 1, 1);
            setSelectedPeriodDate(newDate);
          }}
          
          markedDates={markedDates}
          onDayPress={(day) => {
            handleDayPress(day.dateString);
          }}
          dayComponent={({ date }) => {
            const shift = shifts.find(
              s => s.date === date.dateString
            );
            function handleDayPress(dateString) {
              const shift = shifts.find(
                s => s.date === dateString
              );

              if (shift) {
                setSelectedShift(shift);
                setDetailsModalVisible(true);
              } else {
                openShiftForm(dateString);
              }
            }
            return (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  width: 45,
                }}
                onPress={() => handleDayPress(date.dateString)}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: shift
                      ? shiftColors[shift.shift_type] || "#ef4444"
                      : "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: shift ? "#fff" : "#111827",
                      fontWeight: "100",
                      fontSize: 18,
                    }}
                  >
                    {date.day}
                  </Text>
                </View>

                {shift && (
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: "600",
                      textAlign: "center",
                      marginTop: 2,
                    }}
                  >
                    {shift.shift_type}
                  </Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <KeyboardAvoidingView
          style={styles.modalBackground}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalBox}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
            >
              <Text style={styles.modalTitle}>Add Shift</Text>
              <Text style={styles.selectedDate}>{date}</Text>

              <View style={styles.shiftGrid}>
                {[
                  "Day Shift",
                  "Night Shift",
                  "Early Shift",
                  "Late Shift",
                  "Holiday",
                  "Sick Pay",
                ].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.shiftTypeButton,
                      shiftType === type && styles.shiftTypeButtonActive,
                    ]}
                    onPress={() => setShiftType(type)}
                  >
                    <Text
                      style={[
                        styles.shiftTypeText,
                        shiftType === type && styles.shiftTypeTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.input}
                placeholder="Start Time: 20:00"
                placeholderTextColor="#000"
                value={startTime}
                onChangeText={setStartTime}
              />

              <TextInput
                style={styles.input}
                placeholder="End Time: 08:00"
                placeholderTextColor="#000"
                value={endTime}
                onChangeText={setEndTime}
              />

              <TextInput
                style={styles.input}
                placeholder="Break Minutes: 60"
                placeholderTextColor="#000"
                value={breakMinutes}
                onChangeText={setBreakMinutes}
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Hourly Rate: 12.50"
                placeholderTextColor="#000"
                value={hourlyRate}
                onChangeText={setHourlyRate}
                keyboardType="decimal-pad"
              />

              <TextInput
                style={styles.input}
                placeholder="Notes"
                placeholderTextColor="#000"
                value={notes}
                onChangeText={setNotes}
              />

              <TouchableOpacity style={styles.saveButton} onPress={saveShift}>
                <Text style={styles.saveButtonText}>Save Shift</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal visible={detailsModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Shift Details</Text>

            {selectedShift && (
              <>
                <Text style={styles.selectedDate}>{selectedShift.date}</Text>

                <Text style={styles.detailText}>
                  Shift: {selectedShift.shift_type}
                </Text>

                <Text style={styles.detailText}>
                  Time: {selectedShift.start_time} - {selectedShift.end_time}
                </Text>

                <Text style={styles.detailText}>
                  Break: {selectedShift.break_minutes} minutes
                </Text>

                <Text style={styles.detailText}>
                  Rate: {settings?.currency_symbol || "£"}{selectedShift.hourly_rate}
                </Text>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDeleteShift}
                >
                  <Text style={styles.deleteButtonText}>Delete Shift</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setDetailsModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>


    </ScrollView>
  );
}