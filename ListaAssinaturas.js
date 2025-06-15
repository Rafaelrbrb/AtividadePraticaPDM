import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../src/firebaseConnection";
import { doc, deleteDoc } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../src/auth-contexto";

export default function ListaAssinaturas({ assinaturas, titulo }) {
  const { uid } = useContext(AuthContext);

  const excluirAssinatura = (id) => {
    Alert.alert(
      "Excluir assinatura",
      "Tem certeza que deseja excluir esta assinatura?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, `usuarios/${uid}/assinaturas/${id}`));
            } catch (err) {
              console.error("Erro ao excluir:", err);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text>
            R$ {typeof item.valor === "number" ? item.valor.toFixed(2) : "0,00"}
          </Text>
          <Text>
            {item.dataRenovacao?.toDate
              ? item.dataRenovacao.toDate().toLocaleDateString()
              : "Sem data"}
          </Text>
          <Text style={styles.categoria}>{item.categoria}</Text>
        </View>
        <TouchableOpacity onPress={() => excluirAssinatura(item.id)}>
          <Ionicons name="trash" size={24} color="#f00" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <FlatList
        data={assinaturas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#eee",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categoria: {
    marginTop: 6,
    fontStyle: "italic",
    color: "#555",
  },
});
