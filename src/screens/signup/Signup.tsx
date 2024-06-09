import { View, Text } from "react-native";
import { styles } from "./SignupStyle";
import AppTitle from "../../components/appTitle/AppTitle";
import AppInput from "../../components/appInput/AppInput";
import AppButton from "../../components/appButton/AppButton";
import AppLink from "../../components/appLink/AppLink";
import { useMemo, useState } from "react";

export default function Login({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const goToSignin = () => {
    navigation.navigate("Signin");
  };

  const isValidForm = useMemo(() => {
    return (
      password === confirmPassword &&
      !!name &&
      !!email &&
      !!password &&
      confirmPassword
    );
  }, [name, email, password, confirmPassword]);

  const register = async () => {
    try {
      navigation.navigate("Signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <AppTitle text="Sign Up" />
      </View>

      <View style={styles.inputs}>
        <View style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <AppInput setText={setName} text={name} inputField />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <AppInput setText={setEmail} text={email} inputField />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Senha</Text>
          <AppInput
            isPassword
            setText={setPassword}
            text={password}
            inputField
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <AppInput
            setText={setConfirmPassword}
            isPassword
            text={confirmPassword}
            inputField
          />
        </View>
      </View>

      <View style={styles.cta}>
        <AppButton action={register} disabled={!isValidForm} text="REGISTRAR" />
        <AppLink action={goToSignin} size="sm" text="Voltar" />
      </View>
    </View>
  );
}
