import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AdicionarAssinatura from "./screens/AdicionarAssinatura";
import React from "react";
import { SafeAreaView } from "react-native";
import ListaCompleta from "./screens/ListaCompleta";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/auth-contexto";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/IconButton";
import TelaInicial from "./screens/TelaInicial";

export default function App() {
  const Tab = createBottomTabNavigator();

  function BottonTabScreen() {
    return (
      <Tab.Navigator
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="add"
              size={24}
              onPress={() => {
                navigation.navigate("AdicionarAssinatura");
              }}
            />
          ),
        })}
      >
        <Tab.Screen
          name="TelaInicial"
          component={TelaInicial}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            tabBarLabel: "Tela Inicial",
            title: "Tela Inicial",
            tabBarLabelStyle: { fontSize: 12 },
          }}
        />

        <Tab.Screen
          name="ListaCompleta"
          component={ListaCompleta}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="library" size={size} color={color} />
            ),
            tabBarLabel: "Todas",
            title: "Todas as Assinaturas",
            tabBarLabelStyle: { fontSize: 12 },
          }}
        />
      </Tab.Navigator>
    );
  }

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Assinaturas"
            component={BottonTabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdicionarAssinatura"
            component={AdicionarAssinatura}
          />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
