import { Text } from "react-native";
import { styles } from "./AppTitleStyle";
import React from "react";

interface AppTitle {
  text: string;
}

export default function AppTitle({ text }: AppTitle) {
  return <Text style={styles.text}>{text}</Text>;
}
