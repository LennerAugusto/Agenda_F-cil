import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { supabase } from '../utils/supabase'; 

export default function CadastroServico({ route, navigation }) {
  const [nomeServico, setNomeServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');

  const { barbeariaId } = route.params;

  const handleCadastroServico = async () => {
    const { data, error } = await supabase
      .from('servicos')
      .insert([{ nome: nomeServico, descricao, preco, barbearia_id: barbeariaId }]);

    if (error) {
      alert('Erro ao cadastrar serviço');
    } else {
      alert('Serviço cadastrado com sucesso!');
      navigation.goBack();
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Cadastro de Serviço</Text>
      <TextInput
        placeholder="Nome do Serviço"
        value={nomeServico}
        onChangeText={setNomeServico}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Cadastrar Serviço" onPress={handleCadastroServico} />
    </View>
  );
}
