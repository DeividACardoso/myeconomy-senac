import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, remove, getByLogin, update, getByMesReferenciaAndLogin } from '../../services/DespesaService';
import { formatDate } from '../../utils/DateFormatter';
import styles from './DespesaStyle';

const DespesaScreen = () => {
    const [descricao, setDescricao] = useState('');
    const [gasto, setGasto] = useState('');
    const [mesReferencia, setMesReferencia] = useState(new Date());
    const [mesReferenciaHistorico, setMesReferenciaHistorico] = useState(new Date());
    const [email, setEmail] = useState('');
    const [despesas, setDespesas] = useState([]);
    const [showDatePickerSave, setShowDatePickerSave] = useState(false);
    const [showDatePickerHistory, setShowDatePickerHistory] = useState(false);
    const [editingDespesa, setEditingDespesa] = useState(null);

    useEffect(() => {
        initialize();
    }, [mesReferenciaHistorico]);

    const initialize = async () => {
        const userEmail = await AsyncStorage.getItem('login');
        if (userEmail) {
            setEmail(userEmail);
            await fillDespesaListByLoginAndMonthYear(mesReferenciaHistorico, userEmail);
        }
    };

    const fillDespesaListByLoginAndMonthYear = async (mesReferenciaHistorico, userEmail) => {
        const despesasAtualizadas = await getByMesReferenciaAndLogin(userEmail, mesReferenciaHistorico.toISOString().split('T')[0]);
        setDespesas(despesasAtualizadas);
    };

    const handleSave = async () => {
        if (!descricao || !gasto || !mesReferencia) {
            Alert.alert('Error', 'Please fill out all fields.');
            return;
        }

        const mesAtual = new Date().getMonth();
        const mesSelecionado = mesReferencia.getMonth();

        if (mesSelecionado < mesAtual) {
            Alert.alert('Error', 'Não é possível adicionar despesas em meses anteriores.');
            return;
        }

        if (isNaN(parseFloat(gasto)) || parseFloat(gasto) <= 0) {
            Alert.alert('Error', 'Por favor insira um valor válido.');
            return;
        }

        const novaDespesa = {
            descricao,
            gasto: parseFloat(gasto),
            referenciaMes: mesReferencia.toISOString().split('T')[0],
            usuarioEmail: email,
        };

        try {
            let response;
            if (editingDespesa) {
                response = await update(editingDespesa.id, novaDespesa);
                setDespesas(despesas.map((exp) => (exp.id === editingDespesa.id ? response : exp)));
                setEditingDespesa(null);
            } else {
                response = await create(novaDespesa);
                setDespesas([...despesas, response]);
            }
            setDescricao('');
            setGasto('');
            setMesReferencia(new Date());
            Alert.alert('Success', `Despesa ${editingDespesa ? 'atualizada' : 'criada'} com sucesso.`);
        } catch (error) {
            console.error('Error creating/updating expense:', error);
            Alert.alert('Error', `Failed to ${editingDespesa ? 'update' : 'create'} expense.`);
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
                            setDespesas(despesas.filter((exp) => exp.id !== id));
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            Alert.alert('Error', 'Não é possível excluir despesas de meses anteriores.');
        }
    };

    const handleEdit = (item) => {
        if (mesReferenciaHistorico.getMonth() >= new Date().getMonth()) {
            setEditingDespesa(item);
            setDescricao(item.descricao);
            setGasto(item.gasto.toString());
            setMesReferencia(new Date(item.referenciaMes));
        } else {
            Alert.alert('Error', 'Não é possível editar despesas de meses anteriores.');
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
            selectedDate.setDate(1);
            setMesReferenciaHistorico(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Despesa</Text>
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
            />

            <TextInput
                style={styles.input}
                placeholder="Valor"
                value={gasto}
                onChangeText={setGasto}
                keyboardType="numeric"
            />
            {/* Data para salvar */}
            <TouchableOpacity style={styles.datepicker} onPress={() => setShowDatePickerSave(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Mês da despesa."
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
                <Text style={styles.saveButtonText}>{editingDespesa ? 'ATUALIZAR' : 'SALVAR'}</Text>
            </TouchableOpacity>
            <Text style={styles.historyTitle}>Histórico</Text>
            {/* Data para o histórico */}
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
                data={despesas}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma despesa encontrada</Text>}
                renderItem={({ item }) => (
                    <View style={styles.expenseItem}>
                        <Text style={styles.expenseText}>{item.descricao}</Text>
                        <Text style={styles.expenseText}>R${item.gasto}</Text>
                        <View style={styles.expenseActions}>
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

export default DespesaScreen;
