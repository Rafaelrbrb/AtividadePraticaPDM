import {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../src/fireBaseConnections';
import { AntDesign } from '@expo/vector-icons'; //ARRUMAR ESSA PARTE E USAR OS ICONES QUE ELE ENSINOU

const TelaInicial = () => {
  const [assinaturas, setAssinaturas] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    buscarAssinaturas();
  }, []);

  const buscarAssinaturas = async () => {
    try{
      const consulta = await getDocs(collection(db, 'assinaturas'));
      const lista = [];

      consulta.forEach((doc) => {
        lista.push({id: doc.id, ...doc.data()});
      });

      const ordenadas = lista.sort((a, b) => new Date(a.dataRenovacao) - new Date(b.dataRenovacao));

      setAssinaturas(ordenadas);
    }catch (error) {
      console.error('Erro ao buscar assinaturas:', error);
    }
  };

 const calcularGastoTotal = () => {
    return assinaturas.reduce((total, item) => total + parseFloat(item.valorMensal || 0), 0).toFixed(2);
  };


  const proximasRenovacoes = assinaturas.slice(0, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gasto Total Mensal R$ {calcularGastoTotal()}</Text>

      <Text style={styles.subtitulo}>Próximas Renovações:</Text>
      <FlatList
        data={proximasRenovacoes}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>R$ {item.valorMensal}</Text>
            <Text>Renovação: {item.dataRenovacao}</Text>
          </View>
        )}
      />

      <Button title="Ver Lista Completa" onPress={() => navigation.navigate('ListaAssinaturas')}
      style={styles.botao} />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Adicionar Assinatura')}
      >
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default TelaInicial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  nome: {
    fontWeight: 'bold',
  },
  botao: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 50,
  },
});
