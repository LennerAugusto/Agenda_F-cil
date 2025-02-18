import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { supabase } from '../utils/supabase';

export default function MeusAgendamentos({ route, navigation }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { usuarioId } = route.params;

  useEffect(() => {
    const fetchAgendamentos = async () => {
      setLoading(true);

      if (!usuarioId) {
        alert('Usuário não autenticado');
        return;
      }

      const dataAtual = new Date().toISOString();

      const { data, error } = await supabase
        .from('Agendamentos')
        .select('id, data, Barbearias(nome)')
        .eq('usuarioId', usuarioId)
        .gte('data', dataAtual) 
        .order('data', { ascending: true });

      if (error) {
        alert('Erro ao buscar agendamentos');
      } else {
        setAgendamentos(data);
      }

      setLoading(false);
    };

    fetchAgendamentos();
  }, [usuarioId]);

  const formatarData = (dataISO) => {
    const dataObj = new Date(dataISO);
    return dataObj.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour12: false,
    });
  };
    const formatarHora = (dataISO) => {
    const dataObj = new Date(dataISO);
    return dataObj.toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Meus Agendamentos</Text>

      {loading ? (
        <Text>Carregando...</Text>
      ) : agendamentos.length === 0 ? (
        <Text>Você ainda não tem agendamentos futuros.</Text>
      ) : (
        <FlatList
          data={agendamentos}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>📅 {formatarData(item.data)}</Text>
              <Text>⏰ {formatarHora(item.data)}</Text>
              <Text>🏢 Barbearia: {item.Barbearias?.nome}</Text> 
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}
