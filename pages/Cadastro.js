import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Cadastro({ navigation }) {
  const [isBarbearia, setIsBarbearia] = useState(false);

  const handleCadastro = () => {
    if (isBarbearia) {
      navigation.navigate('CadastroBarbearia'); 
    } else {
      navigation.navigate('CadastroUsuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o tipo de cadastro</Text>

      <TouchableOpacity
        style={[styles.optionButton, isBarbearia && styles.selectedButton]}
        onPress={() => setIsBarbearia(true)}
      >
        <Text style={styles.optionText}>Cadastrar como Barbearia</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.optionButton, !isBarbearia && styles.selectedButton]}
        onPress={() => setIsBarbearia(false)}
      >
        <Text style={styles.optionText}>Cadastrar como Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.confirmButton} onPress={handleCadastro}>
        <Text style={styles.confirmText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionButton: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  confirmButton: {
    marginTop: 20,
    width: '80%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#28a745',
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
