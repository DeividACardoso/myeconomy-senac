import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import https from 'https';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {

    const token = await AsyncStorage.getItem('userToken');
    console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;