import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { supabase } from '../utils/supabase';
import LogoutButton from '../components/LogoutButton';

export default function Barbearias({ route, navigation }) {
  const [barbearias, setBarbearias] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = route.params;

  useEffect(() => {
    const fetchBarbearias = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('Barbearias').select('*');

      if (error) {
        alert('Erro ao buscar barbearias');
      } else {
        setBarbearias(data);
      }
      setLoading(false);
    };

    fetchBarbearias();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione uma Barbearia</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#00875F" />
      ) : (
        <FlatList
          data={barbearias}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.barbershopName}>{item.nome}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('Agendamento', {
                    barbeariaId: item.id,
                    usuarioId: userId,
                  })
                }>
                <Text style={styles.buttonText}>Agendar</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma barbearia cadastrada.</Text>
          }
        />
      )}

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() =>
          navigation.navigate('MeusAgendamentos', { usuarioId: userId })
        }>
        <Text style={styles.secondaryButtonText}>Meus Agendamentos</Text>
      </TouchableOpacity>

      <LogoutButton navigation={navigation} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, 
  },
  barbershopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00875F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#DDD',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 20,
  },
});
