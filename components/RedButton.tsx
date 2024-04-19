import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

// @ts-ignore
const RedButton = ({ onPress, title, disabled = false }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={
        disabled
          ? { ...styles.button, backgroundColor: "#c8c8c8" }
          : styles.button
      }
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RedButton;