import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
// import { Alert, ScrollView, View, Text, TextInput, Button, Picker, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { TextInput } from "react-native/Libraries/Components/TextInput/TextInput";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { DatePickerOptions } from "@react-native-community/datetimepicker";
import { Picker } from '@react-native-picker/picker';
import AppCard from "../../components/appCard/AppCard";
import AppHeaderHome from "../../components/appHeaderHome/AppHeaderHome";
import AppTextFormDate from "../../components/appTextForm/AppTextFormDate";
import { formatDate } from "../../utils/DateFormatter";
import { styles } from "./HomeStyle";

const meses = [
  "Janeiro/2024", "Fevereiro/2024", "Março/2024", "Abril/2024", 
  "Maio/2024", "Junho/2024", "Julho/2024", "Agosto/2024", 
  "Setembro/2024", "Outubro/2024", "Novembro/2024", "Dezembro/2024"
];

export default function Limit({ navigation }) {
  const [nome, setNome] = useState("");
  const [date, setDate] = useState(new Date());
  const [limite, setLimite] = useState(0);
  const [despesa, setDespesa] = useState(0);
  const [hasLimite, setHasLimite] = useState(true);
  const [dinheiro, setDinheiro] = useState("");

//   const [valor, setValor] = useState(Number);
  const [valor, setValor] = useState(0);
  const [texto, setTexto] = useState("");
  const [mes, setMes] = useState(meses[0]);
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const data = await AsyncStorage.getItem('despesas');
        if (data) {
          setDespesas(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error retrieving despesas from storage:', error);
      }
    };

    fetchDespesas();
  }, []);

  const handleSave = async () => {
    if (!valor || isNaN(valor)) {
      Alert.alert('Erro', 'Por favor, insira um valor válido.');
      return;
    }

    const novaDespesa = { valor: (valor), mes };
    const novasDespesas = [...despesas, novaDespesa];

    try {
      await AsyncStorage.setItem('despesas', JSON.stringify(novasDespesas));
      setDespesas(novasDespesas);
      setValor(Number);
      Alert.alert('Sucesso', 'Despesa salva com sucesso.');
    } catch (error) {
      console.error('Error saving despesas:', error);
    }
  };

  const handleDelete = async (index) => {
    const novasDespesas = despesas.filter((_, i) => i !== index);

    try {
      await AsyncStorage.setItem('despesas', JSON.stringify(novasDespesas));
      setDespesas(novasDespesas);
      Alert.alert('Sucesso', 'Despesa excluída com sucesso.');
    } catch (error) {
      console.error('Error deleting despesa:', error);
    }
  };

  const handleEdit = (index) => {
    const despesa = despesas[index];
    setValor(despesa.valor.toString());
    setMes(despesa.mes);
    handleDelete(index);
  };

  return (
    <View style={styles.container}>
       <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 60 }}></View>
        <Text style={styles.label}>Valor:</Text>
          <AppHeaderHome nome={nome} navigation={navigation} avatar={undefined} />
      <TextInput
        style={styles.input}
        value={texto}
        onChangeText={setTexto}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Mês:</Text>
      <Picker
        selectedValue={mes}
        style={styles.picker}
        onValueChange={(itemValue) => setMes(itemValue)}
      >
        {meses.map((mes, index) => (
          <Picker.Item key={index} label={mes} value={mes} />
        ))}
      </Picker>

      {/* <Button title="Salvar" onPress={handleSave} /> */}
        <View style={styles.buttons}>
            <AppTextFormDate value={date} onChange={handleSave} format='monthYear' />
        </View>

      <ScrollView style={styles.scrollView}>
        {despesas.map((despesa, index) => (
          <View key={index} style={styles.despesaItem}>
            <Text style={styles.despesaText}>Mês: {despesa.mes} - Valor: R${despesa.valor.toFixed(2)}</Text>
            <View style={styles.buttonsContainer}>
              {/* <TouchableOpacity onPress={() => handleEdit(index)} style={styles.buttonEdit}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.buttonDelete}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
