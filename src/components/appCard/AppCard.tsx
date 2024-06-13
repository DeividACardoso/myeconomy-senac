import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { View } from "react-native";
import { Card, Text } from 'react-native-paper';
import { styles } from "./AppCardStyle";

interface AppCardProps {
    progressLevel: number;
}

interface EmojiAndText {
    emoji: string;
    text: string;
}

function getEmojiAndText(progressLevel: number): EmojiAndText {
    if (progressLevel >= 0 && progressLevel <= 24) {
        return { emoji: "😴", text: "Progresso muito baixo" };
    } else if (progressLevel >= 25 && progressLevel <= 49) {
        return { emoji: "🤩", text: "Seu progresso está excelente!" };
    } else if (progressLevel >= 50 && progressLevel <= 74) {
        return { emoji: "🙂", text: "Continue assim!" };
    } else if (progressLevel >= 75 && progressLevel <= 99) {
        return { emoji: "🥴", text: "Cuidado com seu limite!" };
    } else {
        return { emoji: "😓", text: "Objetivo não atingido!" };
    }
}

export default function AppCard({ progressLevel }: AppCardProps) {
    let gradientColors;
    if (progressLevel >= 0 && progressLevel <= 24) {
        gradientColors = ['#00FF00', '#00CC00'];
    } else if (progressLevel >= 25 && progressLevel <= 49) {
        gradientColors = ['#00CC00', '#009900'];
    } else if (progressLevel >= 50 && progressLevel <= 74) {
        gradientColors = ['#009900', '#006600'];
    } else if (progressLevel >= 75 && progressLevel <= 99) {
        gradientColors = ['#006600', '#003300'];
    } else {
        gradientColors = ['#003300','#000000'];
    }

    const { emoji, text } = getEmojiAndText(progressLevel);

    return (
        <View style={styles.container}>
            <Card style={{ width: '100%' }}>
                <LinearGradient colors={gradientColors} style={{ borderRadius: 10 }}>
                    <Card.Content>
                        <Text variant="titleLarge"> </Text>
                        <Text style={styles.emoji} variant="titleLarge"> {emoji} </Text>
                    </Card.Content>
                    <Card.Content>
                        <Text variant="bodyMedium"> </Text>
                        <Text style={styles.text} variant="bodyMedium"> {text} </Text>
                        <Text variant="titleLarge"> </Text>
                    </Card.Content>
                </LinearGradient>
            </Card>
        </View>
    );
}