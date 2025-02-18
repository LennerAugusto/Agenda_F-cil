import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, Alert, StyleSheet } from 'react-native';
import { supabase } from '../utils/supabase';

export default function CadastroBarbearia({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleCadastro = async () => {
    if (nome.trim() === '' || email.trim() === '') {
      Alert.alert('Erro, Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const { error } = await supabase
      .from('Usuarios')
      .insert([{ nome, email, telefone }]);

    if (error) {
      alert('Erro ao cadastrar usuário');
    } else {
      alert('Sucesso, usuário cadastrado com sucesso!');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuario</Text>

      <TextInput
        placeholder="Nome do usuário"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  button: {
    backgroundColor: '#00875F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
