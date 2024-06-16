import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Alert, FlatList, ScrollView, View } from "react-native";
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
import axios from "axios";
import { remove, create, update, getByMesReferenciaAndLogin } from "../../services/LimiteService";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../../utils/DateFormatter";

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
  id: number;
}

interface LimitProps {
  navigation: any;
}
const LimiteScreen = () => {
  // export default function Limit({ navigation }: LimitProps) {
  // {
  const [limite, setLimite] = useState<number>(0);
  const [hasLimite, setHasLimite] = useState<boolean>(true);
  const [nextId, setNextId] = useState<number>(0);
  const [resultados, setResultados] = useState<Limite[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [valor, setValor] = useState("");
  const [mes, setMes] = useState(meses[0]);
  const [limites, setLimites] = useState([]);
  const [mesReferenciaHistorico, setMesReferenciaHistorico] = useState(
    new Date()
  );
  const [editingLimite, setEditingLimite] = useState(null);
  const [mesReferencia, setMesReferencia] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [email, setEmail] = useState("");
  const [showDatePickerHistory, setShowDatePickerHistory] = useState(false);

  useEffect(() => {
    initialize();
}, [mesReferenciaHistorico]);

const initialize = async () => {
    const userEmail = await AsyncStorage.getItem('login');
    console.log('userEmail:', userEmail);
    if (userEmail) {
        setEmail(userEmail);
        await fillDespesaListByLoginAndMonthYear(mesReferenciaHistorico, userEmail);
    }
};

const fillDespesaListByLoginAndMonthYear = async (mesReferenciaHistorico, userEmail) => {
    const limitesAtualizados = await getByMesReferenciaAndLogin(userEmail, mesReferenciaHistorico.toISOString().split('T')[0]);
    setLimites(limitesAtualizados);
    console.log('limitesAtualizados:', limitesAtualizados);
};

  const handleSave = async () => {
    if (!valor || !mesReferencia) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    const mesAtual = new Date().getMonth();
    const mesSelecionado = mesReferencia.getMonth();
    if (mesSelecionado < mesAtual) {
      Alert.alert(
        "Error",
        "Não é possível adicionar limites em meses anteriores."
      );
      return;
    }

    // if ((valor) || (valor) != null) {
    //     Alert.alert('Error', 'Por favor insira um valor válido.');
    //     return;
    // }

    const novoLimite = {
      valor,
      referenciaMes: mesReferencia.toISOString().split("T")[0],
      usuarioEmail: email,
      // mesReferencia: Date
      // mesReferencia:mesReferencia.toISOString().split("T")[0],
    };

    try {
      let response;
      if (editingLimite) {
        response = await update(editingLimite.id, novoLimite);
        setLimites(
          limites.map((exp) => (exp.id === editingLimite.id ? response : exp))
        );
        setEditingLimite(null);
      } else {
        response = await create(novoLimite);
        setLimites([...limites, response]);
      }
      setValor("");
      setMesReferencia(new Date());
      Alert.alert(
        "Success",
        `Limite ${editingLimite ? "atualizada" : "criada"} com sucesso.`
      );
    } catch (error) {
      console.error("Error creating/updating limit:", error);
      Alert.alert(
        "Error",
        `Failed to ${editingLimite ? "update" : "create"} limit.`
      );
    }
  };

  // const handleDelete = async (index: number) => {
  //   const novosLimites = limites.filter((_, i) => i !== index);

  //   try {
  //     await AsyncStorage.setItem("limites", JSON.stringify(novosLimites));
  //     setLimites(novosLimites);
  //     Alert.alert("Sucesso", "Limite excluído com sucesso.");
  //   } catch (error) {
  //     console.error("Erro ao deletar o limite:", error);
  //   }
  // };
  const handleDelete = async (id) => {
    const currentMonth = new Date().getMonth();
    const selectedMonth = mesReferenciaHistorico.getMonth();
    if (selectedMonth >= currentMonth) {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this limit?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              await remove(id);
              setLimites(limites.filter((exp) => exp.id !== id));
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Error",
        "Não é possível excluir limites de meses anteriores."
      );
    }
  };

  // const handleEdit = (id: number) => {
  //   const limite = limites.find(l => l.id === id);
  //   if (limite) {
  //     setValor(limite.valor.toString());
  //     setMes(limite.mes);
  //     setEditId(limite.id);
  //   }
  // };
  const handleEdit = (item) => {
    if (mesReferenciaHistorico.getMonth() >= new Date().getMonth()) {
      setEditingLimite(item);
      setValor(item.valor.toString());
      setMesReferencia(new Date(item.referenciaMes));
    } else {
      Alert.alert(
        "Error",
        "Não é possível editar os limites de meses anteriores."
      );
    }
  };

  const onChangeHistoryDate = (event, selectedDate) => {
    setShowDatePickerHistory(false);
    if (selectedDate) {
      console.log("selectedDate no change:", selectedDate);
      selectedDate.setDate(1);
      console.log("selectedDate date change:", selectedDate);
      setMesReferenciaHistorico(selectedDate);
    }
  };

  // const handleSearch = () => {
  //   const results = limites.filter(
  //     (limite) =>
  //       limite.mes.includes(searchTerm) ||
  //       limite.valor.toString().includes(searchTerm)
  //   );
  //   setResultados(results);
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Limite</Text>

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
        onChangeText={(text) => setValor(text)}
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

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>
          {editingLimite ? "Atualizar" : "Salvar"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.historyTitle}>Histórico</Text>
      {/* Data para o histórico */}
      <TouchableOpacity
        style={styles.datepicker}
        onPress={() => setShowDatePickerHistory(true)}
      >
        <TextInput
          style={styles.input}
          placeholder="Mês do histórico."
          value={formatDate(mesReferenciaHistorico)}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      {showDatePickerHistory && (
        <DateTimePicker
          value={mesReferenciaHistorico}
          mode="date"
          display="spinner"
          onChange={onChangeHistoryDate}
        />
      )}

      <View></View>
      {/* <TouchableOpacity style={styles.buttonPesquisa} onPress={handleSearch}>
        <Text style={styles.buttonText}>Pesquisar</Text>
      </TouchableOpacity> */}

      {/* <ScrollView style={styles.scrollView}>
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
      </ScrollView> */}
      <FlatList
        data={limites}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum limite encontrado</Text> }
        renderItem={({ item }) => (
          <View style={styles.limiteItem}>
            <Text style={styles.limiteText}>{item.referenciaMes}</Text>
            <Text style={styles.limiteText}>R${item.valor}</Text>
            <View style={styles.limitActions}>
              <TouchableOpacity
                onPress={() => handleEdit(item)}
                style={styles.actionButton}
              >
                <Text style={styles.actionButtonText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(Number(item.id))}
                style={styles.actionButton}
              >
                <Text style={styles.actionButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default LimiteScreen;
