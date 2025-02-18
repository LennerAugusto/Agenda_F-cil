import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/login';
import CadastroBarbearia from './pages/cadastroBarbearia';
import Cadastro from './pages/Cadastro';
import CadastroUsuario from './pages/cadastroUsuario';
import CadastroServico from './pages/cadastroServicos';
import AgendamentosList from './pages/AgendamentosList';
import Barbearias from './pages/barbeariasList';
import MeusAgendamentos from './pages/MeusAgendamentos';
import Agendamento from './pages/Agendamento';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="CadastroBarbearia" component={CadastroBarbearia} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
        <Stack.Screen name="CadastroServico" component={CadastroServico} />
        <Stack.Screen name="AgendamentosList" component={AgendamentosList} />
        <Stack.Screen name="Barbearias" component={Barbearias} />
        <Stack.Screen name="MeusAgendamentos" component={MeusAgendamentos}/> 
        <Stack.Screen name="Agendamento" component={Agendamento}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
