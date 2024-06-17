import axios from 'axios';
import axiosInstance from '../utils/RequestInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = "http://10.0.2.2:8080/api/limite";
// const API_BASE_URL = 'http://localhost:8080/api/limite';

export const create = async (limiteData: any): Promise<any> => {
  try {
    const { valor, referenciaMes } = limiteData;
    const usuarioEmail = await AsyncStorage.getItem('login');
    if (!usuarioEmail) {
      throw new Error('Login não encontrado em storage.');
    }

    const body = {
      valor,
      referenciaMes,
      usuarioEmail: usuarioEmail,
    };
    const response = await axiosInstance.post(`${API_BASE_URL}/salvar`, body);
    console.log("criando pt2...", response.data)

    return response.data;
  } catch (error) {
    throw new Error(`Erro ao criar despesa. Erro: ${error.message}`);
  }
};

export const update = async (limiteId: number, limiteData: any): Promise<any> => {
  try {
    const response = await axiosInstance.put(`${API_BASE_URL}/atualizar/${limiteId}`, limiteData);
    console.log("Atualizando pt2...", response.data)
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar despesa');
  }
}

export const remove = async (limiteId: number) => {
  try {
    const response = await axiosInstance.delete(`${API_BASE_URL}/delete/${limiteId}`,);
    return response.data;
  } catch (error) {
    console.error('Error removing limite:', error.response || error.message);
    throw new Error('Erro ao remover limite');
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
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/por-mes-e-login/${mesReferencia}/${login}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter despesas por mes de referencia + login');
  }
}
