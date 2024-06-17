import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const AppProgressBar = ({ despesa, limite, hasLimite, progressLevel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Progresso</Text>
      <ProgressBar progress={progressLevel} color={'#4CAF50'} style={styles.progressBar} />
      {hasLimite && (
        <Text style={styles.text}>
          Progresso: R${despesa.toFixed(2)} / R${limite.toFixed(2)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginVertical: 8,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
});

export default AppProgressBar;
