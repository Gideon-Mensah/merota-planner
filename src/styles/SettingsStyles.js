import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  optionRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 8,
  },

  optionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  optionButtonActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  optionText: {
    textTransform: "capitalize",
    fontWeight: "bold",
  },

  optionTextActive: {
    color: "#fff",
  },

  saveButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 15,
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  cancelButtonText: {
    fontWeight: "bold",
    color: "#374151",
  },

  saveButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  dayButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },

  dayButton: {
    width: 55,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  dayButtonSelected: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  dayButtonText: {
    color: "#374151",
    fontWeight: "600",
  },

  dayButtonTextSelected: {
    color: "#FFFFFF",
  },
});

export default styles;