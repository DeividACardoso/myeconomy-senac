import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import AppTitleMain from '../appTitle/AppTitleMain';
import { useNavigation } from '@react-navigation/native';
import { styles } from './AppHeaderStyle';
import Icon from 'react-native-vector-icons/Ionicons';

interface AppHeaderProps {
    nome: string;
    avatar?: any;
    navigation?: any;
    route?: string;
    showAvatar?: boolean;
    toggleTheme?: () => void;
}

export default function AppHeader({ nome, avatar, route, navigation, showAvatar = true }: AppHeaderProps) {
    const changeRoute = () => {
        navigation.navigate(route);
    };

    return (
        <View style={styles.container}>
            <View>
                <AppTitleMain text={`${nome}`} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    {showAvatar && (
                        <View style={{
                            width: 50, height: 50, borderRadius: 25, backgroundColor: 'white',
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image
                                source={avatar}
                                style={styles.image}
                            />
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
};