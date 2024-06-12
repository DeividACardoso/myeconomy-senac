import React from "react";
import { styles } from "./AppLabelStyle";
import { Text } from "react-native";

interface AppTitleProps {
    text: string
}


export default function AppLabelNoBold({ text }: AppTitleProps) {
    return (
        <Text style={styles.labelNoBold}>
            {text}
        </Text>
    );
}