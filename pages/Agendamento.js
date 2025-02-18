import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../utils/supabase';

export default function Agendamento({ route, navigation }) {
  const { barbeariaId, usuarioId } = route.params;
  const [servicos, setServicos] = useState([]);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [servicosSelecionados, setServicosSelecionados] = useState([]);

  useEffect(() => {
    const fetchServicos = async () => {
      const { data, error } = await supabase
        .from('ServicosOferecidos')
        .select('*')
        .eq('barbeariaId', barbeariaId);

      if (error) {
        Alert.alert('Erro', 'Erro ao buscar serviços');
      } else {
        setServicos(data);
      }
    };

    fetchServicos();
  }, [barbeariaId]);

  const toggleServico = (id) => {
    setServicosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleAgendar = async () => {
  if (!data || !hora || servicosSelecionados.length === 0) {
    Alert.alert('Erro', 'Preencha todos os campos');
    return;
  }

  const { data: agendamentoExistente, error: errorCheck } = await supabase
    .from('Agendamentos')
    .select('*')
    .eq('barbeariaId', barbeariaId)
    .eq('data', `${data} ${hora}`);

  if (errorCheck) {
    alert('Erro ao verificar disponibilidade');
    return;
  }

  if (agendamentoExistente.length > 0) {
    alert('Erro, já existe um agendamento para esse horário');
    return;
  }

  const { data: novoAgendamento, error } = await supabase
  .from('Agendamentos')
  .insert([
    { usuarioId: usuarioId, barbeariaId: barbeariaId, data: `${data} ${hora}` }
  ])
  .select();

if (error) {
  alert("Erro ao agendar");
  return;
}

const agendamentoId = novoAgendamento[0].id;

const servicosParaInserir = servicosSelecionados.map(servicoId => ({
  agendamento_id: agendamentoId,
  servico_id: servicoId
}));

await supabase.from('agendamentos_servicos').insert(servicosParaInserir);

  };


  return (
    <View style={{ padding: 20 }}>
      <Text>Selecione os Serviços</Text>
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              marginVertical: 5,
              backgroundColor: servicosSelecionados.includes(item.id) ? '#ddd' : '#fff',
              borderWidth: 1,
              borderRadius: 5,
            }}
            onPress={() => toggleServico(item.id)}
          >
            <Text>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        placeholder="Data (YYYY-MM-DD)"
        value={data}
        onChangeText={setData}
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Hora (HH:mm)"
        value={hora}
        onChangeText={setHora}
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />
      <Button title="Agendar" onPress={handleAgendar} />
    </View>
  );
}
