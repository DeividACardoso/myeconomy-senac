import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AuthService from '../../services/Auth/UserService';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    navigation: any;
    onLoginSuccess?: () => void;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

const handleLogin = () => {
    AuthService.login(login, password).then(
        async () => {
            try {
                await AsyncStorage.setItem('login', login);
                navigation.navigate('Home');
            } catch (error) {
                console.error('Erro em guardar login em storage:', error);
            }
            navigation.navigate('Home');
        },
        (error) => {
            let resMessage;
            if (error.response) {
                if (error.response.status === 403 || error.response.status === 400) {
                    resMessage = 'Credenciais incorretas. Por favor, tente novamente.';
                } else {
                    resMessage = (error.response.data && error.response.data.message) || error.message;
                }
            } else if (error.request) {
                resMessage = "Network error. Please check your internet connection and try again.";
            } else {
                resMessage = error.message;
            }
            setMessage(resMessage);
        }
    );
};

    const goToSignup = () => {
        navigation.navigate("Signup")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ENTRAR</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setLogin(text)}
                value={login}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            {message ? <Text style={styles.message}>{message}</Text> : null}
            <Text style={styles.link} onPress={goToSignup}>Não possui conta? Crie aqui</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        borderRadius: 5,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    message: {
        marginTop: 12,
        color: 'red',
    },
    link: {
        marginTop: 12,
        color: '#0000FF',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;

