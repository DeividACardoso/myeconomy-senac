import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { signup } from '../../services/Auth/UserService';

interface SignupData {
  name: string;
  login: string;
  password: string;
  birthDate: string;
}

const Signup = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSignup = async () => {
    if (password !== passwordConfirm) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      await signup({ login, nome, password, dtNascimento: birthDate.toISOString().split('T')[0] });
      navigation.navigate('Signin');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRIAR</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={login}
        onChangeText={setLogin}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.datepicker} onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Data de nascimento"
          value={birthDate.toISOString().split('T')[0]}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 5,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    marginTop: 12,
    color: 'red',
  },
  link: {
    marginTop: 12,
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
  backText: {
    textAlign: 'center',
    color: 'gray',
  },
  datepicker:{
    width: '100%',
    alignItems: 'center'
  },
});

export default Signup;
