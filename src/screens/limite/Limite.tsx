import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { TextInput } from "react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AppCard from "../../components/appCard/AppCard";
import AppHeaderHome from "../../components/appHeaderHome/AppHeaderHome";
import AppTextFormDate from "../../components/appTextForm/AppTextFormDate";
import { styles } from "./LimiteStyle";
import React from "react";

const meses = [
  "Janeiro/2024",
  "Fevereiro/2024",
  "Março/2024",
  "Abril/2024",
  "Maio/2024",
  "Junho/2024",
  "Julho/2024",
  "Agosto/2024",
  "Setembro/2024",
  "Outubro/2024",
  "Novembro/2024",
  "Dezembro/2024",
];

interface Limite {
  valor: number;
  mes: string;
}

interface LimitProps {
  navigation: any;
}

export default function Limit({ navigation }: LimitProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [limite, setLimite] = useState<number>(0);
  const [hasLimite, setHasLimite] = useState<boolean>(true);
  const [dinheiro, setDinheiro] = useState<string>("");

  const [valor, setValor] = useState<number | string>(0);
  const [mes, setMes] = useState(meses[0]);
  const [limites, setLimites] = useState<Limite[]>([]);

  useEffect(() => {
    const fetchLimites = async () => {
      try {
        const data = await AsyncStorage.getItem("limites");
        if (data) {
          setLimite(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error retrieving limites from storage:", error);
      }
    };
    fetchLimites();
  }, []);

  const handleSave = async () => {
    if (!valor || isNaN(Number(valor))) {
      Alert.alert("Erro", "Por favor, insira um limite válido.");
      return;
    }

    const novoLimite: Limite = { valor: parseFloat(valor as string), mes };
    const novosLimites = [...limites, novoLimite];

    try {
      await AsyncStorage.setItem("limite", JSON.stringify(novosLimites));
      setLimites(novosLimites);
      setValor(0); // Reset to 0
      Alert.alert("Sucesso", "Limite salvo com sucesso.");
    } catch (error) {
      console.error("Erro salvando o limite:", error);
    }
  };

  const handleDelete = async (index: number) => {
    const novosLimites = limites.filter((_, i) => i !== index);

    try {
      await AsyncStorage.setItem("limites", JSON.stringify(novosLimites));
      setLimites(novosLimites);
      Alert.alert("Sucesso", "Limite excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao deletar o limite:", error);
    }
  };

  const handleEdit = (index: number) => {
    const limite = limites[index];
    setValor(limite.valor.toString());
    setMes(limite.mes);
    handleDelete(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Limite</Text>
      {/* <View style={{ flexDirection: 'center', justifyContent: 'space-between', marginBottom: 100 }}></View> */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 60,
        }}
      ></View>
      <Text style={styles.label}>Valor:</Text>
      <TextInput
        style={styles.input}
        value={valor.toString()}
        onChangeText={(text) => setValor(parseFloat(text) || 0)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Mês:</Text>

      <Picker
        selectedValue={mes}
        style={styles.picker}
        onValueChange={(itemValue) => setMes(itemValue)}
      >
        {meses.map((mes) => (
          <Picker.Item key={mes} label={mes} value={mes} />
        ))}
      </Picker>

      {/* <View style={styles.button}>
        <Button onPress={handleSave}mode="contained">S</Button>
        <Text style={styles.buttonText}>Salvar</Text>
      </View> */}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        {limites.map((despesa, index) => (
          <View key={index} style={styles.despesaItem}>
            <Text style={styles.despesaText}>
              Mês: {despesa.mes} - Valor: R${despesa.valor.toFixed(1)}
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity 
                onPress={() => handleEdit(index)}
                style={styles.buttonEdit}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(index)}
                style={styles.buttonDelete}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
