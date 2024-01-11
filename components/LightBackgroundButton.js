import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LightBackgroundButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "normal",
  },
});

export default LightBackgroundButton;
