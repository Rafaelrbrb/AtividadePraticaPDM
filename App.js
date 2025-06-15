import React from 'react';
import TelaInicial from './screens/TelaInicial';
import ListaCompleta from './screens/ListaCompleta';
import AdicionarAssinatura from './screens/AdicionarAssinatura';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tela Inicial" component={TelaInicial} />
        {/*<Stack.Screen name="Lista Completa" component={ListaCompleta} />*/}
        <Stack.Screen name="Adicionar Assinatura" component={AdicionarAssinatura}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
