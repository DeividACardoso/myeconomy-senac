import { Text } from 'react-native';
import { styles } from './AppLabelStyle';
import React from 'react';

interface AppTitleProps {
    text: string;
}

export default function AppLabel({ text }: AppTitleProps) {
    return (
        <Text style={styles.label}>
            {text}
        </Text>
    );
}