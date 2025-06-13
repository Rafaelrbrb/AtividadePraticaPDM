import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AdicionarAssinatura from './screens/AdicionarAssinatura';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style = {{flex: 1}}>
      <AdicionarAssinatura />
    </SafeAreaView>
  );
}

