import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
import AppCard from "../../components/appCard/AppCard";
import AppHeaderHome from "../../components/appHeaderHome/AppHeaderHome";
import AppProgressBar from "../../components/appProgressBar/AppProgressBar";
import AppTextFormDate from "../../components/appTextForm/AppTextFormDate";
// import { progressoMes } from "../../services/LimitService";
import { progressoMes } from "../../services/LimiteService";
import { formatDate } from "../../utils/DateFormatter";
import { styles } from "./HomeStyle";
import { useCallback, useEffect, useState } from "react";
import React from "react";

export default function Home({ navigation }) {
  const [nome, setNome] = useState("");
  const [date, setDate] = useState(new Date());
  const [limite, setLimite] = useState(0);
  const [despesa, setDespesa] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [hasLimite, setHasLimite] = useState(true);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProgresso(date)
      .then(() => setRefreshing(false));
  };

  const fetchProgresso = async (data: Date) => {
    const mes = formatDate(data)
    await progressoMes(mes)
      .then((response) => {
        if (response.data != null) {
          setDespesa(response.data.gasto);
          setLimite(response.data.limite);
          setProgresso(response.data.progresso);
        } else {
          setHasLimite(false);
          setDespesa(0);
          setLimite(0);
          setProgresso(0);
        }
      })
      .catch((error) => {
        Alert.alert('Erro', 'Erro ao buscar progresso');
      });
  }

  useEffect(() => {
    const retrieveNome = async () => {
      try {
        const value = await AsyncStorage.getItem('nome');
        if (value) {
          setNome(value);
        }
      } catch (error) {
        console.error('Erro: resgatando do AsyncStorage:', error);
      }
    };

    retrieveNome();
  }, []);

  const handleChangeDate = (data: Date) => {
    setDate(data)
    fetchProgresso(data)
  }

  return (
    <View style={styles.container}>
      <AppHeaderHome nome={nome} navigation={navigation} avatar={undefined} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ paddingHorizontal: 16 }}>
          <AppTextFormDate value={date} onChange={handleChangeDate} format='monthYear' />
          <AppCard progressLevel={progresso} />
          <AppProgressBar despesa={despesa} limite={limite} hasLimite={hasLimite} progressLevel={progresso / 100} />
        </View>
      </ScrollView>
    </View>
  );
}
