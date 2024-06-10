import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = "http://10.0.2.2:8080/api/auth/";

interface LoginResponse {
    token: string;
}

const login = async (login: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(API_URL + "login", { login, password });
    console.log(login, password)
    if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
    }
    return response.data;
};

const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem("userToken");
};

const getCurrentUser = async (): Promise<string | null> => {
    return await AsyncStorage.getItem("userToken");
};

export default {
    login,
    logout,
    getCurrentUser,
};
