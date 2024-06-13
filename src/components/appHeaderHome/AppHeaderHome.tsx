import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import AppTitleMain from '../appTitle/AppTitleMain';
import AppSubtitle from '../appSubtitle/AppSubtitle';
import { useNavigation } from '@react-navigation/native';
import { styles } from './AppHeaderHomeStyles';
import Icon from 'react-native-vector-icons/Ionicons';

interface AppHeaderHomeProps {
    nome: string;
    avatar: any;
    navigation?: any;
    route?: string;
    showAvatar?: boolean;
}

export default function AppHeaderHome({ nome, avatar, route, navigation, showAvatar = true }: AppHeaderHomeProps) {
    const changeRoute = () => {
        navigation.navigate(route);
    };


    return (
        <View style={styles.container}>
            <View>
                <AppTitleMain text={`Olá, ${nome} 👋`}/>
                <AppSubtitle text={"É bom te ver por aqui!"}  />
            </View>
        </View>
    );
};