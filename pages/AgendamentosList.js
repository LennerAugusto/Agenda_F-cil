import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import { supabase } from '../utils/supabase';
import LogoutButton from '../components/LogoutButton';
export default function AgendamentosBarbearia({ route, navigation }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { adminBarbeariaId } = route.params;

  useEffect(() => {
    const fetchAgendamentos = async () => {
      setLoading(true);

      if (!adminBarbeariaId) {
        alert('ID do administrador da barbearia não informado');
        setLoading(false);
        return;
      }

      const dataAtual = new Date().toISOString();

      const { data: barbearias, error: errorCheck } = await supabase
        .from('Barbearias')
        .select('id')
        .eq('adminId', adminBarbeariaId);

      if (errorCheck) {
        alert('Erro ao verificar disponibilidade.');
        setLoading(false);
        return;
      }

      if (!barbearias || barbearias.length === 0) {
        alert('Nenhuma barbearia encontrada para este administrador.');
        setLoading(false);
        return;
      }

      const barbeariaIds = barbearias.map(barbearia => barbearia.id);

      const { data, error } = await supabase
        .from('Agendamentos')
        .select('id, data, Usuarios(nome, telefone), Barbearias(nome)')
        .in('barbeariaId', barbeariaIds) 
        .gte('data', dataAtual) 
        .order('data', { ascending: true });

      if (error) {
        alert('Erro ao buscar agendamentos.');
      } else {
        setAgendamentos(data);
      }

      setLoading(false);
    };

    fetchAgendamentos();
  }, [adminBarbeariaId]);

  const formatarData = (dataISO) => {
    const dataObj = new Date(dataISO);
    return dataObj.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
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
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Agendamentos da Barbearia</Text>

      {loading ? (
        <Text>Carregando...</Text>
      ) : agendamentos.length === 0 ? (
        <Text>Nenhum agendamento futuro encontrado.</Text>
      ) : (
        <FlatList
          data={agendamentos}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>📅 {formatarData(item.data)}</Text>
              <Text>⏰ {formatarHora(item.data)}</Text>
              <Text>👤 Cliente: {item.Usuarios?.nome}</Text>
              <Text>📞 Telefone do cliente: {item.Usuarios?.telefone}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <Button title="Voltar" onPress={() => navigation.goBack()} />

      <LogoutButton navigation={navigation} />
    </View>
  );
}
