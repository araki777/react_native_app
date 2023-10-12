import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface IconButton {
  icon: "refresh" | "save-alt";
  label: string;
  onPress: () => void;
}

export default function IconButton(props: IconButton) {
  return (
    <Pressable style={styles.iconButton} onPress={props.onPress}>
      <MaterialIcons name={props.icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{props.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
