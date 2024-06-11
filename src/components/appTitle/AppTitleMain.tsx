import { Text } from 'react-native';
import { styles } from './AppTitleMainStyle';
import React from 'react';

interface AppTitleProps {
    text: string;
}

export default function AppTitleMain({ text }: AppTitleProps) {
    return (
        <Text style={styles.title}>
            {text}
        </Text>
    );
}