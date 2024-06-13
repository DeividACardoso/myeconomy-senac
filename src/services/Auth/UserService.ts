import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = "http://10.0.2.2:8080/api/auth/";
// const API_URL = "http://localhost:8080/api/auth/";

interface LoginResponse {
    token: string;
    nome: string;
    dtNascimento: string;
}

interface SignupResponse {
    message: string;
    token: string;
}

interface SignupData {
    nome: string;
    login: string;
    password: string;
    dtNascimento: string;
}

const login = async (login: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(API_URL + "login", { login, password });
    setIsSignedIn(true);
    if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
        await AsyncStorage.setItem("nome", response.data.nome);
        await AsyncStorage.setItem("dtNascimento", response.data.dtNascimento);
    }
    return response.data;
};


export const signup = async (signupData: SignupData): Promise<SignupResponse> => {
    console.log(signupData)
    const response = await axios.post<SignupResponse>(API_URL + "register", signupData);
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
    signup,
    logout,
    getCurrentUser,
};
function setIsSignedIn(arg0: boolean) {
}

