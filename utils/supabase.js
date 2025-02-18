//import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// URL e Chave Anônima do Supabase
const SUPABASE_URL = 'https://cyogesxbckdxdrzmllqe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5b2dlc3hiY2tkeGRyem1sbHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxOTIzNDIsImV4cCI6MjA1NDc2ODM0Mn0.C8UnEQUK18cql-SNw6IxGQzLwBD3M9nHZDUPovm89dw';

// Criando o cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Função para fazer login com e-mail e senha
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Armazenar o token do usuário
    await AsyncStorage.setItem('supabase_token', data.access_token);
    return data;
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    throw new Error(error.message);
  }
};

// Função para fazer logout
export const signOut = async () => {
  try {
    await supabase.auth.signOut();
    // Limpar o token de autenticação
    await AsyncStorage.removeItem('supabase_token');
  } catch (error) {
    console.error('Erro ao fazer logout:', error.message);
  }
};

// Função para verificar se o usuário está logado
export const checkUserSession = async () => {
  const session = await supabase.auth.getSession();
  if (session.data.session) {
    return session.data.session.user;
  }
  return null;
};

// Função para registrar um novo usuário
export const signUp = async (email, password) => {
  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return user;
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.message);
    throw new Error(error.message);
  }
};

// Função para recuperar informações do perfil do usuário
export const getUserProfile = async () => {
  const user = await supabase.auth.getUser();
  return user.data;
};

// Função para atualizar as informações do perfil do usuário
export const updateUserProfile = async (profileData) => {
  try {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('users') // Supondo que você tenha uma tabela de usuários
      .upsert([{ id: user.data.id, ...profileData }]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error.message);
    throw new Error(error.message);
  }
};

// Função para buscar os agendamentos de uma barbearia
export const getAppointments = async (barbershopId) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, users(name), services(name)')
    .eq('barbershop_id', barbershopId)
    .order('date', { ascending: true });

  if (error) {
    console.error('Erro ao buscar agendamentos:', error.message);
    return [];
  }

  return data;
};

// Função para buscar todas as barbearias disponíveis

// Função para buscar todos os serviços oferecidos
export const getServices = async () => {
  const { data, error } = await supabase.from('services').select('*');

  if (error) {
    console.error('Erro ao buscar serviços:', error.message);
    return [];
  }

  return data;
};
