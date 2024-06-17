import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, remove, update, getByMesReferenciaAndLogin } from '../../services/LimiteService';
import { formatDate } from '../../utils/DateFormatter';
import styles from './LimiteStyle';

const LimiteScreen = () => {
  const [valor, setValor] = useState('');
  const [mesReferencia, setMesReferencia] = useState(new Date());
  const [mesReferenciaHistorico, setMesReferenciaHistorico] = useState(new Date());
  const [email, setEmail] = useState('');
  const [limites, setLimites] = useState([]);
  const [showDatePickerSave, setShowDatePickerSave] = useState(false);
  const [showDatePickerHistory, setShowDatePickerHistory] = useState(false);
  const [editingLimites, setEditingLimite] = useState(null);

  useEffect(() => {
    initialize();
  }, [mesReferenciaHistorico]);

  const initialize = async () => {
    const userEmail = await AsyncStorage.getItem('login');
    console.log('userEmail:', userEmail);
    if (userEmail) {
      setEmail(userEmail);
      await fillLimiteListByLoginAndMonthYear(mesReferenciaHistorico, userEmail);
    }
  };

  const fillLimiteListByLoginAndMonthYear = async (mesReferenciaHistorico, userEmail) => {
    const limitesAtualizadas = await getByMesReferenciaAndLogin(userEmail, mesReferenciaHistorico.toISOString().split('T')[0]);
    setLimites(limitesAtualizadas);
  };

  const handleSave = async () => {
    if (!valor || !mesReferencia) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const mesAtual = new Date().getMonth();
    const mesSelecionado = mesReferencia.getMonth();

    if (mesSelecionado < mesAtual) {
      Alert.alert('Error', 'Não é possível adicionar limites em meses anteriores.');
      return;
    }

    // if (isNaN(parseFloat(valor)) || parseFloat(valor) <= 0) {
    //   Alert.alert('Error', 'Por favor insira um valor válido.');
    //   return;
    // }

    const novoLimite = {
      valor:  valor,
      referenciaMes: mesReferencia.toISOString().split('T')[0],
      usuarioEmail: email,
    };

    try {
      let response;
      if (editingLimites) {
        console.log("Atualizando...")
        response = await update(editingLimites.id, novoLimite);
        setLimites(limites.map((exp) => (exp.id === editingLimites.id ? response : exp)));
        setEditingLimite(null);
      } else {
        console.log("Criando...")
        response = await create(novoLimite);
        setLimites([...limites, response]);
      }
      setValor('');
      setMesReferencia(new Date());
      Alert.alert('Success', `Limite ${editingLimites ? 'atualizada' : 'criada'} com sucesso.`);
    } catch (error) {
      console.error('Error creating/updating expense:', error);
      Alert.alert('Error', `Failed to ${editingLimites ? 'update' : 'create'} expense.`);
    }
  };

  const handleDelete = async (id) => {
    const currentMonth = new Date().getMonth();
    const selectedMonth = mesReferenciaHistorico.getMonth();
    if (selectedMonth >= currentMonth) {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this expense?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              await remove(id);
              setLimites(limites.filter((exp) => exp.id !== id));
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('Error', 'Não é possível excluir limites de meses anteriores.');
    }
  };

  const handleEdit = (item) => {
    if (mesReferenciaHistorico.getMonth() >= new Date().getMonth()) {
      setEditingLimite(item);
      setValor(item.valor.toString());
      setMesReferencia(new Date(item.referenciaMes));
    } else {
      Alert.alert('Error', 'Não é possível editar limites de meses anteriores.');
    }
  };

  const onChangeSaveDate = (event, selectedDate) => {
    setShowDatePickerSave(false);
    if (selectedDate) {
      setMesReferencia(selectedDate);
    }
  };

  const onChangeHistoryDate = (event, selectedDate) => {
    setShowDatePickerHistory(false);
    if (selectedDate) {
      console.log('selectedDate no change:', selectedDate);
      selectedDate.setDate(1);
      console.log('selectedDate date change:', selectedDate);
      setMesReferenciaHistorico(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Limites</Text>

      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.datepicker} onPress={() => setShowDatePickerSave(true)}>
        <TextInput
          style={styles.input}
          placeholder="Mês do limite."
          value={formatDate(mesReferencia)}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      {showDatePickerSave && (
        <DateTimePicker
          value={mesReferencia}
          mode="date"
          display="spinner"
          onChange={onChangeSaveDate}
        />)}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{editingLimites ? 'ATUALIZAR' : 'SALVAR'}</Text>
      </TouchableOpacity>
      <Text style={styles.historyTitle}>Histórico</Text>
      <TouchableOpacity style={styles.datepicker} onPress={() => setShowDatePickerHistory(true)}>
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
      <FlatList
        data={limites}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum limite encontrada</Text>}
        renderItem={({ item }) => (
          <View style={styles.limiteItem}>
            <Text style={styles.limiteText}>{item.referenciaMes}</Text>
            <Text style={styles.limiteText}>R${item.valor}</Text>
            <View style={styles.limiteActions}>
              <TouchableOpacity
                onPress={() => handleEdit(item)}
                style={[styles.actionButton, mesReferenciaHistorico.toDateString >= new Date().getMonth().toString ? null : styles.disabledButton]}
                disabled={mesReferenciaHistorico.toDateString >= new Date().getMonth().toString}
              >
                <Text style={styles.actionButtonText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(Number(item.id))}
                style={[styles.actionButton, mesReferenciaHistorico.toDateString >= new Date().getMonth().toString ? null : styles.disabledButton]}
                disabled={mesReferenciaHistorico.toDateString >= new Date().getMonth().toString}
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
