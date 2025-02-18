import React, { useState } from 'react';
import { ScrollView, View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { supabase } from '../utils/supabase';

export default function CadastroBarbearia({ navigation }) {
  const [nomeBarbearia, setNomeBarbearia] = useState('');
  const [enderecoBarbearia, setEnderecoBarbearia] = useState('');
  const [telefoneBarbearia, setTelefoneBarbearia] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [telefoneUsuario, setTelefoneUsuario] = useState('');
  const [nomesServicos, setNomesServicos] = useState('');


const handleCadastro = async () => {
  try {
    const { data: usuarioData, error: usuarioError } = await supabase
      .from('Usuarios')
      .insert([{
        nome: nomeUsuario,
        email: emailUsuario,
        admin: true
      }])
      .select('*')  
      .single();

    if (usuarioError || !usuarioData) {
      throw new Error('Erro ao cadastrar o usuário: ' + (usuarioError?.message || 'Usuário não retornado.'));
    }

    console.log('Usuário cadastrado:', usuarioData);

    const { data: barbeariaData, error: barbeariaError } = await supabase
      .from('Barbearias')
      .insert([{
        nome: nomeBarbearia,
        endereço: enderecoBarbearia, 
        telefone: telefoneBarbearia,
        email: emailUsuario,
        adminId: usuarioData.id
      }])
      .select('*')  
      .single();

    if (barbeariaError || !barbeariaData) {
      throw new Error('Erro ao cadastrar a barbearia: ' + (barbeariaError?.message || 'Barbearia não retornada.'));
    }

    console.log('Barbearia cadastrada:', barbeariaData);

    if (nomesServicos.trim() !== '') {
      const nomesServicosArray = nomesServicos.split(',').map(nome => nome.trim());
      const servicosData = nomesServicosArray.map(nome => ({
        nome,
        barbeariaId: barbeariaData.id
      }));

      const { error: servicoError } = await supabase
        .from('ServicosOferecidos')
        .insert(servicosData);

      if (servicoError) {
        throw new Error('Erro ao cadastrar os serviços: ' + servicoError.message);
      }

      console.log('Serviços cadastrados:', servicosData);
    }

    alert('Sucesso', 'Barbearia, usuário e serviços cadastrados com sucesso!');
    navigation.goBack();
  } catch (error) {
    console.error('Erro no cadastro:', error);
    Alert.alert('Erro', error.message);
  }
};



  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.header}>Cadastro da Barbearia</Text>

        <TextInput
          placeholder="Nome da Barbearia"
          value={nomeBarbearia}
          onChangeText={setNomeBarbearia}
          style={styles.input}
        />
        <TextInput
          placeholder="Endereço da Barbearia"
          value={enderecoBarbearia}
          onChangeText={setEnderecoBarbearia}
          style={styles.input}
        />
        <TextInput
          placeholder="Telefone da Barbearia"
          value={telefoneBarbearia}
          onChangeText={setTelefoneBarbearia}
          style={styles.input}
        />

        <TextInput
          placeholder="Nome do Usuário"
          value={nomeUsuario}
          onChangeText={setNomeUsuario}
          style={styles.input}
        />
        <TextInput
          placeholder="E-mail do Usuário"
          value={emailUsuario}
          onChangeText={setEmailUsuario}
          style={styles.input}
        />

        <TextInput
          placeholder="Nomes dos serviços (separados por vírgula)"
          value={nomesServicos}
          onChangeText={setNomesServicos}
          style={styles.input}
        />

        <Button title="Cadastrar" onPress={handleCadastro} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
});
