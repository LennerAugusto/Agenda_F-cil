import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { supabase } from '../utils/supabase'; // Aponte para onde seu supabase está configurado

const LogoutButton = ({ navigation }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();  // Desloga o usuário
    navigation.navigate('Login');   // Redireciona para a tela de login
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FA8072',   
    paddingVertical: 10,     
    paddingHorizontal: 20,   
    borderRadius: 5,         
    marginTop: 20,          
  },
  buttonText: {
    color: 'white',          
    fontSize: 16,         
    textAlign: 'center',    
  }
});

export default LogoutButton;