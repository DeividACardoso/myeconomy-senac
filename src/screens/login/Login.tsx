import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AuthService from '../../services/Auth/AuthService';
import React from 'react';

interface Props {
    navigation: any; // You might want to use a more specific type if you have navigation types defined
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleLogin = () => {
        AuthService.login(username, password).then(
            () => {
                navigation.navigate("Home");
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            }
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <Button title="Login" onPress={handleLogin} />
            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    message: {
        marginTop: 12,
        color: 'red',
    },
});

export default LoginScreen;
