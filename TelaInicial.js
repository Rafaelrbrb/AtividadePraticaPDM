import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../src/firebaseConnection";
import { AuthContext } from "../src/auth-contexto";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TelaInicial() {
  const { uid } = useContext(AuthContext);
  const [assinaturas, setAssinaturas] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (!uid) return;

    const q = query(
      collection(db, `usuarios/${uid}/assinaturas`),
      orderBy("dataRenovacao", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        dataRenovacao: doc.data().dataRenovacao?.toDate?.() || new Date(),
      }));
      setAssinaturas(lista);
    });

    return () => unsub();
  }, [uid]);

  const total = assinaturas.reduce(
    (soma, item) => soma + parseFloat(item.valor || 0),
    0
  );

  const proximas = assinaturas.slice(0, 5); // já vem ordenado por data

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo Financeiro</Text>
      <Text style={styles.total}>
        Gasto total mensal: R$ {total.toFixed(2)}
      </Text>

      <Text style={styles.subtitulo}>Próximas renovações:</Text>
      <FlatList
        data={proximas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>R$ {item.valor.toFixed(2)}</Text>
            <Text>
              {item.dataRenovacao.toLocaleDateString()} ({item.categoria})
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  total: {
    fontSize: 18,
    color: "#222",
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 18,
    marginTop: 12,
    marginBottom: 8,
  },
  item: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    marginBottom: 8,
  },
  nome: {
    fontWeight: "bold",
  },
  botaoVerTodas: {
    marginTop: 10,
    alignSelf: "center",
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});
