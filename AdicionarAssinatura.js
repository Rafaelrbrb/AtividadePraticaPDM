import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { db } from "../src/firebaseConnection";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState, useContext } from "react";
import { AuthContext } from "../src/auth-contexto";

export default function AdicionarAssinatura() {
  const [nome, setNome] = useState("");
  const [valorMensal, setValorMensal] = useState("");
  const [dataRenovacao, setDataRenovacao] = useState("");
  const [categoria, setCategoria] = useState("");

  const { uid } = useContext(AuthContext); // 👈 Pega o uid do usuário

  const adicionarAssinatura = async () => {
    if (!nome || !valorMensal || !dataRenovacao || !categoria) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      // 👇 Salva dentro de usuarios/{uid}/assinaturas
      await addDoc(collection(db, `usuarios/${uid}/assinaturas`), {
        nome,
        valor: parseFloat(valorMensal),
        dataRenovacao: Timestamp.fromDate(new Date(dataRenovacao)),
        categoria,
      });

      console.log("Assinatura salva com sucesso para UID:", uid);

      Alert.alert("Sucesso", "Assinatura adicionada com sucesso");
      setNome("");
      setValorMensal("");
      setDataRenovacao("");
      setCategoria("");
    } catch (error) {
      console.log("Erro ao adicionar assinatura:", error);
      Alert.alert("Erro", "Não foi possível adicionar a assinatura");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Assinatura</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.text}>Preço R$</Text>
      <TextInput
        style={styles.input}
        value={valorMensal}
        onChangeText={setValorMensal}
        keyboardType="numeric"
      />

      <Text style={styles.text}>Data da Renovação</Text>
      <TextInput
        style={styles.input}
        value={dataRenovacao}
        onChangeText={setDataRenovacao}
        placeholder="AAAA-MM-DD"
        keyboardType="numeric"
      />

      <Text style={styles.text}>Categoria</Text>
      <TextInput
        style={styles.input}
        value={categoria}
        onChangeText={setCategoria}
        placeholder="ex: Streaming, Educação, Software, Outros"
      />

      <Button title="Adicionar assinatura" onPress={adicionarAssinatura} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 30,
  },
  text: {
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
});
