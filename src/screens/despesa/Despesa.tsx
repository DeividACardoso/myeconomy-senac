import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, update, remove, getByLogin } from '../../services/DespesaService';

const DespesaScreen = () => {
    const [descricao, setDescricao] = useState('');
    const [gasto, setGasto] = useState('');
    const [mesReferencia, setMesReferencia] = useState('');
    const [email, setEmail] = useState(''); // State to hold email value
    const [expenses, setExpenses] = useState([]);
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

    const handleEdit = (id) => {
        const expense = expenses.find((exp) => exp.id === id);
        if (expense) {
            setDescricao(expense.descricao);
            setGasto(expense.gasto.replace('R$', ''));
            setExpenses(expenses.filter((exp) => exp.id !== id));
        }
    };

    const handleDelete = (id: number) => {
        remove(id);
        setExpenses(expenses.filter((exp) => exp.id !== id));
    };

    const fillDespesaListByEmail = async (userEmail) => {
        const despesas = await getByLogin(userEmail);
        setExpenses(despesas);
    };

    const handleSave = () => {
        if (!mesReferencia || mesReferencia === '') {
            setMesReferencia(getCurrentYearMonth());
        }
        if (descricao && gasto && mesReferencia) {
            const newExpense = { id: (expenses.length + 1).toString(), descricao, gasto, mesReferencia };
            create(newExpense);
            setExpenses([...expenses, newExpense]);
            setDescricao('');
            setGasto('');
            setMesReferencia('');
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
            <DatePicker
                style={styles.picker}
                date={mesReferencia}
                mode="date"
                format="YYYY-MM-01"
                onDateChange={setMesReferencia}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>SALVAR</Text>
            </TouchableOpacity>
            <Text style={styles.historyTitle}>Histórico</Text>

            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
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
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
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

    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
        backgroundColor: '#E0E0E0',
        padding: 8,
        marginBottom: 8,
    },
    expenseText: {
        fontSize: 16,
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
});

export default DespesaScreen;
