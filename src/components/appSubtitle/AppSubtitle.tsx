import { Text } from 'react-native';
import { styles } from './AppSubtitleStyle';
import React from 'react';

interface AppTitleProps {
    text: string;
}

export default function AppSubtitle({ text}: AppTitleProps) {
    return (
        <Text style={styles.title}>
            {text}
        </Text>
    );
}