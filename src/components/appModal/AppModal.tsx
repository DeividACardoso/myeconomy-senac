import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { styles } from "./AppModalStyle";
import AppModalInputText from "./inputText/AppModalInputText";
import AppModalButton from "./button/AppModalButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generatePassword } from "../../services/passwordService";
import uuid from "react-native-uuid";
import { useMemo, useState } from "react";
import React from "react";

interface AppModal {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onConfirm: () => void;
  password: string;
}

export default function AppModal({
  modalVisible,
  password,
  setModalVisible,
  onConfirm,
}: AppModal) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const isValidForm = useMemo(() => {
    return !!name && !!password;
  }, [name, password]);

  const savePassword = async () => {
    const newPassword = generatePassword();
    const id = uuid.v4();

    const payload = {
      password: newPassword,
      id,
      local: name,
      show: false,
    };

    await storeData(payload);
  };

  const storeData = async (value) => {
    const currentPasswords = await getData();

    const passwordFound = (currentPasswords || []).find(
      (el) => el.local === value.local
    );

    if (passwordFound) {
      setNameError("Nome já cadastrado");
      return;
    }

    const newPasswords = [...currentPasswords, value];

    try {
      await AsyncStorage.setItem("passwords", JSON.stringify(newPasswords));
      onConfirm();
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const response = await AsyncStorage.getItem("passwords");
      return response ? JSON.parse(response) : [];
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      style={styles.modal}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Cadastro de senha</Text>

          <View style={styles.fieldContainer}>
            <Text>Nome do aplciativo</Text>
            <AppModalInputText setText={setName} text={name} />
            {!!nameError && <Text style={styles.error}>{nameError}</Text>}
          </View>

          <View style={styles.fieldContainer}>
            <Text>Senha gerada</Text>
            <AppModalInputText editable={false} text={password} />
          </View>

          <AppModalButton
            disabled={!isValidForm}
            action={savePassword}
            text="CRIAR"
          />
          <AppModalButton
            action={() => setModalVisible(false)}
            text="CANCELAR"
          />
        </View>
      </View>
    </Modal>
  );
}
