import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { DefaultTransition } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "./ProfileStyle";
import AppHeader from '../../components/appHeader/AppHeader';
import AppLabel from '../../components/appLabel/AppLabel';
import AppLabelNoBold from '../../components/appLabel/AppLabelNoBold';
import AppButton from '../../components/appButton/AppButton';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setNome(await AsyncStorage.getItem("nome"));
                setEmail(await AsyncStorage.getItem('login'));
                var dt = await AsyncStorage.getItem('dtNascimento').then((dt) => new Date(dt));
                setDataNascimento(`${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Erro: {error}</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
            <View style={styles.header}>
                <AppHeader nome="Meus Dados" showAvatar={false} />
            </View>
            <View style={styles.labelContainer}>
                <AppLabel text="Nome:" ></AppLabel>
            </View>
            <View style={styles.labelContainer}>
                <AppLabelNoBold text={nome} ></AppLabelNoBold>
            </View>
            <View style={styles.labelContainer}>
                <AppLabel text="Email:" ></AppLabel>
            </View>
            <View style={styles.labelContainer}>
                <AppLabelNoBold text={email} ></AppLabelNoBold>
            </View>
            <View style={styles.labelContainer}>
                <AppLabel text="Data de nascimento:" ></AppLabel>
            </View>
            <View style={styles.labelContainer}>
                <AppLabelNoBold text={dataNascimento} ></AppLabelNoBold>
            </View>
            <View style={[styles.buttons, styles.margin]}>
                <AppButton text="Sair"></AppButton>
            </View>
        </View>
    );
};


export default Profile;