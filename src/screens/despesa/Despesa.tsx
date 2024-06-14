import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, remove, getByLogin, update } from '../../services/DespesaService';

const DespesaScreen = () => {
    const [descricao, setDescricao] = useState('');
    const [gasto, setGasto] = useState('');
    const [mesReferencia, setMesReferencia] = useState(new Date());
    const [mesReferenciaHistorico, setMesReferenciaHistorico] = useState(new Date());
    const [email, setEmail] = useState(''); // State to hold email value
    const [expenses, setExpenses] = useState([]);
    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const months = [
        'Janeiro/2024',
        'Fevereiro/2024',
        'Março/2024',
        'Abril/2024',
        'Maio/2024',
        'Junho/2024',
        'Julho/2024',
        'Agosto/2024',
        'Setembro/2024',
        'Outubro/2024',
        'Novembro/2024',
        'Dezembro/2024',
    ];

    const getCurrentYearMonth = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        return `${year}-${formattedMonth}-01`;
    };

    const fillDespesaListByEmail = async (userEmail) => {
        const despesas = await getByLogin(userEmail);
        setExpenses(despesas);
    };

    const handleSave = () => {
        if (!mesReferencia) {
            setMesReferencia(new Date(getCurrentYearMonth()));
        }
        if (descricao && gasto && mesReferencia) {
            const currentMonth = new Date().getMonth();
            const selectedMonth = mesReferencia.getMonth();
            if (selectedMonth >= currentMonth) {
                const newExpense = { id: (expenses.length + 1).toString(), descricao, gasto, mesReferencia };
                create(newExpense);
                setExpenses([...expenses, newExpense]);
                setDescricao('');
                setGasto('');
                setMesReferencia(new Date());
            } else {
                alert('Não é possível adicionar despesas em meses anteriores.');
            }
        }
    };

    const handleEdit = async (id) => {
        const currentMonth = new Date().getMonth();
        const selectedMonth = mesReferencia.getMonth();
        if (selectedMonth >= currentMonth) {
            const despesaData = { descricao, gasto, mesReferencia };
            const response = await update(id, despesaData);
            return response;
        } else {
            alert('Não é possível editar despesas de meses anteriores.');
        }
    };

    const handleDelete = async (id) => {
        const currentMonth = new Date().getMonth();
        const selectedMonth = mesReferenciaHistorico.getMonth();
        if (selectedMonth >= currentMonth) {
            const response = await remove(id);
            setExpenses(expenses.filter((exp) => exp.id !== id));
            return response;
        } else {
            alert('Não é possível excluir despesas de meses anteriores.');
        }
    };

    useEffect(() => {
        const getEmailFromStorage = async () => {
            const userEmail = await AsyncStorage.getItem('login');
            if (userEmail) {
                setEmail(userEmail);
                fillDespesaListByEmail(userEmail);
            }
        };
        getEmailFromStorage();
    }, []);

    const onChangeDate1 = (event, selectedDate) => {
        const currentDate = selectedDate || mesReferencia;
        setShowDatePicker1(false);
        currentDate.setDate(1);
        const formattedDate = currentDate.toISOString().split('T')[0];
        setMesReferencia(new Date(formattedDate));
    };

    const onChangeDate2 = (event, selectedDate) => {
        const currentDate = selectedDate || mesReferenciaHistorico;
        setShowDatePicker2(false);
        currentDate.setDate(1);
        const formattedDate = currentDate.toISOString().split('T')[0];
        setMesReferenciaHistorico(new Date(formattedDate));
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
            <TouchableOpacity style={styles.datepicker} onPress={() => setShowDatePicker1(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Mês da despesa."
                    value={mesReferencia.toISOString().split('T')[0]}
                    editable={false}
                    pointerEvents="none"
                />
            </TouchableOpacity>
            {showDatePicker1 && (
                <DateTimePicker
                    value={mesReferencia}
                    mode="date"
                    display="spinner"
                    onChange={onChangeDate1}
                />)}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>SALVAR</Text>
            </TouchableOpacity>
            <Text style={styles.historyTitle}>Histórico</Text>
            <TouchableOpacity style={styles.datepicker} onPress={() => setShowDatePicker2(true)}>
                <TextInput
                    style={styles.input}
                    value={mesReferenciaHistorico.toISOString().split('T')[0]}
                    editable={false}
                    pointerEvents="none"
                />
            </TouchableOpacity>
            {showDatePicker2 && (
                <DateTimePicker
                    style={styles.datepicker}
                    value={mesReferenciaHistorico}
                    mode="date"
                    display="spinner"
                    onChange={onChangeDate2}
                />)}
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma despesa encontrada</Text>}
                renderItem={({ item }) => (
                    <View style={styles.expenseItem}>
                        <Text style={styles.expenseText}>{item.descricao} Valor: R${item.gasto}</Text>
                        <View style={styles.expenseActions}>
                            <TouchableOpacity onPress={() => handleEdit(Number(item.id))} style={styles.actionButton}>
                                <Text style={styles.actionButtonText}>✏️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(Number(item.id))} style={styles.actionButton}>
                                <Text style={styles.actionButtonText}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        color: 'black',
        fontWeight: '600',
    },
    picker: {
        height: 40,
        marginBottom: 16,
        alignSelf: 'center',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        alignItems: 'center',
        marginBottom: 16,
        borderRadius: 8,

    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 16,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    expenseItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: 8,
        marginBottom: 8,
    },
    expenseText: {
        fontSize: 16,
        color: '#fff',
    },
    expenseActions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 8,
    },
    actionButtonText: {
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
    },
    datepicker: {
        height: 40,
        marginBottom: 16,
        alignSelf: 'center',
        width: '100%',
    },
});

export default DespesaScreen;
