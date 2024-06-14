import axios from 'axios';
import axiosInstance from '../utils/RequestInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:8080/api/despesas';

export const create = async (despesaData: any): Promise<any> => {
    try {
        const { descricao, gasto, mesReferencia } = despesaData;
        const usuario_email = await AsyncStorage.getItem('login');

        const body = {
            descricao : descricao,
            gasto: gasto,
            referenciaMes: mesReferencia,
            usuarioEmail : usuario_email
        };

        const bodyString = JSON.stringify(body);

        const response = await axiosInstance.post(`${API_BASE_URL}/salvar`, body, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao criar despesa. Erro: ', error);
    }
}

export const update = async (despesaId: number, despesaData: any): Promise<any> => {
    try {
        const response = await axiosInstance.put(`${API_BASE_URL}/${despesaId}`, despesaData);
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
        const response = await axiosInstance.get(`${API_BASE_URL}/${despesaId}`, {
            headers: {
                'Access-Control-Allow-Origin': '',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao obter despesa');
    }
}

export const getByLogin = async (usuario_email: string): Promise<any[]> => {
    try {
        console.log(API_BASE_URL, usuario_email);
        const response = await axiosInstance.get(`${API_BASE_URL}/${usuario_email}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao obter despesa por email');
    }
}
