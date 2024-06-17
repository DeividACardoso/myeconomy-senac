import axios from "axios";
import axiosInstance from "../utils/RequestInterceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";

 const API_URL = "http://10.0.2.2:8080/api/limite-mes";
//const API_URL = "http://localhost:8080/api/limite-mes";

export const progressoMes = async (mes: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/progresso/${mes}`);
    return response;
  } catch (error) {
    throw new Error("Erro ao buscar progresso do mês");
  }
};
export const getLimites = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar limites:", error);
    throw error;
  }
};

export const getLimiteByMes = async (mes: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/mes/${mes}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o limite por mes:", error);
    throw error;
  }
};

export const create = async (limiteData: any): Promise<any> => {
  try {
    console.log("limiteData:", limiteData);

    const { valor, referenciaMes } = limiteData;
    console.log('limitData.referenciaMes:', referenciaMes);

    const usuarioEmail = await AsyncStorage.getItem('login');
    if (!usuarioEmail) {
      throw new Error('Login não encontrado em storage.');
    }

    const body = {
      valor,
      referenciaMes,
      usuarioEmail,
    };
    console.log("body.referenciaMes:", body.referenciaMes);

    const response = await axiosInstance.post(`${API_URL}/salvar`, body);
    console.log("response.data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating limit:", error);
    throw new Error(`Erro ao criar limites. Erro: ${error.message}`);
  }
};

export const updateLimite = async (
  id: number,
  limite: { valor: number; mes: string }
) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, limite);
    return response.data;
  } catch (error) {
    console.error("Erro atualizando limite:", error);
    throw error;
  }
};

export const update = async (limiteId: number, limiteDate: any): Promise<any> => {
  try {
      const response = await axiosInstance.put(`${API_URL}/atualizar/${limiteId}`, limiteDate);
      return response.data;
  } catch (error) {
      throw new Error('Erro ao atualizar o limite');
  }
}

// export const deleteLimite = async (id: number) => {
//   try {
//     const response = await axiosInstance.delete(`${API_URL}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Erro deletando limite:", error);
//     throw error;
//   }
// };

export const remove = async (limiteId: number) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/delete/${limiteId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing limit:", error.response || error.message);
    throw new Error("Erro ao remover limite");
  }
};

export const getByMesReferenciaAndLogin = async (login: string, mesReferencia: Date): Promise<any[]> => {
  console.log('getByMesReferencia:', mesReferencia);
  try {
      const response = await axiosInstance.get(`${API_URL}/por-mes-e-login/${mesReferencia}/${login}`);
      return response.data;
  } catch (error) {
      throw new Error('Erro ao obter os limites por mes de referencia + login');
  }
}

