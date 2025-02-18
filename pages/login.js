import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import { supabase } from '../utils/supabase'; // Certifique-se de importar o supabase corretamente
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [isBarbearia, setIsBarbearia] = useState(false);

  const handleLogin = async () => {
  try {
    const { data, error } = await supabase
      .from('Usuarios')
      .select('id, nome, email, admin')
      .ilike('email', login)
      .single();

    if (error || !data) {
      alert('Email inexistente!');
      return;
    }

    if (data.admin) {
      navigation.navigate('AgendamentosList', { adminBarbeariaId: data.id });
    } else {
      navigation.navigate('Barbearias', { userId: data.id });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    alert('Erro ao tentar fazer login!');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        placeholder="Email"
        value={login}
        onChangeText={setLogin}
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />

      <View style={styles.footer}>
        <Text>Não tem uma conta?</Text>
        <Button title="Criar Conta" onPress={() => navigation.navigate('Cadastro')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
