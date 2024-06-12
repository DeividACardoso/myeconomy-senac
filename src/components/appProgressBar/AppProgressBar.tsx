import React from 'react';
import { View, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const AppProgressBar = ({ despesa, limite, hasLimite, progressLevel }) => {
  return (
    <View style={{ marginVertical: 16 }}>
      <Text>Progresso</Text>
      <ProgressBar progress={progressLevel} color={'#4CAF50'} />
      {hasLimite && (
        <Text>
          Progresso: R${despesa.toFixed(2)}/R${limite.toFixed(2)}
        </Text>
      )}
    </View>
  );
};

export default AppProgressBar;
