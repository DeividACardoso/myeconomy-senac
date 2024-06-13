import React from 'react';
import { View, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { styles } from './AppProgressBarStyle';

const AppProgressBar = ({ despesa, limite, hasLimite, progressLevel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Progresso</Text>
      <ProgressBar progress={progressLevel} color={'#4CAF50'} />
      {hasLimite && (
        <Text style={styles.text}>
          Progresso: R${despesa.toFixed(2)}/R${limite.toFixed(2)}
        </Text>
      )}
    </View>
  );
};

export default AppProgressBar;
