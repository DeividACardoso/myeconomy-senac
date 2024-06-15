import axios from 'axios';
import axiosInstance from '../utils/RequestInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "http://10.0.2.2:8080/api/despesas";
// const API_BASE_URL = 'http://localhost:8080/api/despesas';

export const create = async (despesaData: any): Promise<any> => {
    try {
        console.log('despesaData:', despesaData);
        const { descricao, gasto, referenciaMes } = despesaData;
        console.log('despesaData.referenciaMes:', despesaData.referenciaMes);
        const usuario_email = await AsyncStorage.getItem('login');

        if (!usuario_email) {
            throw new Error('Login não encontrado em storage.');
        }

        const body = {
            descricao,
            gasto,
            referenciaMes,
            usuarioEmail: usuario_email,
        };

        console.log('body.referenciaMes:', body.referenciaMes);

        const response = await axiosInstance.post(`${API_BASE_URL}/salvar`, body);

        console.log('response.data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating expense:', error);
        throw new Error(`Erro ao criar despesa. Erro: ${error.message}`);
    }
};

export const update = async (despesaId: number, despesaData: any): Promise<any> => {
    try {
        const response = await axiosInstance.put(`${API_BASE_URL}/atualizar/${despesaId}`, despesaData);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar despesa');
    }
}

export const remove = async (despesaId: number) => {
    try {
        const response = await axiosInstance.delete(`${API_BASE_URL}/delete/${despesaId}`,);
        return response.data;
    } catch (error) {
        console.error('Error removing expense:', error.response || error.message);
        throw new Error('Erro ao remover despesa');
    }
}


export const get = async (despesaId: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/${despesaId}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao obter despesa');
    }
}

export const getByLogin = async (usuario_email: string): Promise<any[]> => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/${usuario_email}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao obter despesa por email');
    }
}

export const getByMesReferenciaAndLogin = async (login: string, mesReferencia: Date): Promise<any[]> => {
    console.log('getByMesReferencia:', mesReferencia);
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/por-mes-e-login/${mesReferencia}/${login}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao obter despesas por mes de referencia + login');
    }
}
