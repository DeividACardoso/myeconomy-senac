import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = "http://10.0.2.2:8080/api/auth/";
// const API_URL = "http://localhost:8080/api/auth/";

interface LoginResponse {
    token: string;
}

interface SignupResponse {
    message: string;
    token: string;
}

interface SignupData {
    name: string;
    email: string;
    password: string;
    birthDate: string;
}

const login = async (login: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(API_URL + "login", { login, password });
    setIsSignedIn(true);
    console.log(login, password)
    if (response.data.token) {
        await AsyncStorage.setItem("userToken", response.data.token);
    }
    return response.data;
};


export const signup = async (signupData: SignupData): Promise<SignupResponse> => {
    const response = await axios.post<SignupResponse>(API_URL + "signup", signupData);
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
    signup,
    logout,
    getCurrentUser,
};
function setIsSignedIn(arg0: boolean) {
}

