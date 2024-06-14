import axios from 'axios';
import axiosInstance from '../utils/RequestInterceptor';

const API_URL = "http://10.0.2.2:8080/api/limite-mes/";
// const API_URL = "http://localhost:8080/api/limite-mes/";

export const progressoMes = async (mes: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/progresso/${mes}`);
    return response;
  } catch (error) {
    throw new Error('Erro ao buscar progresso do mês');
  }
};
export const getLimites = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar limites:', error);
    throw error;
  }
};

export const getLimiteByMes = async (mes: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/mes/${mes}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o limite por mes:', error);
    throw error;
  }
};

export const createLimite = async (limite: { valor: number; mes: string }) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/salvar}`, limite);
    return response.data;
  } catch (error) {
    console.error('Erro criando o limite:', error);
    throw error;
  }
};

export const updateLimite = async (id: number, limite: { valor: number; mes: string }) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, limite);
    return response.data;
  } catch (error) {
    console.error('Erro atualizando limite:', error);
    throw error;
  }
};

export const deleteLimite = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro deletando limite:', error);
    throw error;
  }
};