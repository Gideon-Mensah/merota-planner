import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#F5F5F5",
  },

  // Header
  header: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },

  greeting: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "600",
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#111827",
    marginTop: 4,
    textAlign: "center",
  },

  // Pay card / summary
  payCard: {
    backgroundColor: "#2563EB",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
  },

  payLabel: {
    color: "#fff",
    fontSize: 14,
  },

  payAmount: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
  },

  payPeriodText: {
    color: "#fff",
    marginTop: 5,
    fontSize: 12,
  },

  // Summary grid
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 18,
  },

  summaryCard: {
    width: "47%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  summaryValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
  },

  summaryLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  // Next shift
  nextShiftCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 18,
    padding: 18,
    borderRadius: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#EF4444",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },

  nextShiftType: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },

  nextShiftText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 3,
  },

  // Calendar
  calendarContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    minHeight: 470,
  },

  calendarStyle: {
    borderRadius: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },

  // Modal (single consolidated set)
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 18,
  },

  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    maxHeight: "85%",
  },

  modalTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
  },

  selectedDate: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 20,
  },

  // Shift form
  shiftGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },

  shiftTypeButton: {
    width: "48%",
    backgroundColor: "#F3F4F6",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  shiftTypeButtonActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  shiftTypeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },

  shiftTypeTextActive: {
    color: "#ffffff",
  },

  input: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 15,
  },

  saveButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
  },

  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  cancelButton: {
    padding: 14,
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "700",
  },

  // Details
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },

  deleteButton: {
    backgroundColor: "#EF4444",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // Controls
  weekControls: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 15,
    marginBottom: 15,
  },

  weekButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  weekButtonText: {
    fontWeight: "bold",
    color: "#111827",
  },

  // Settings button
  settingsButton: {
    backgroundColor: "#111827",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  settingsButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;