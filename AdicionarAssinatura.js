import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import {db} from '../src/firebaseConnection';
import {collection, addDoc} from 'firebase/firestore';
import { useState } from "react";

    export default function AdicionarAssinatura(){
            const [nome, setNome] = useState('');
            const [valorMensal, setValorMensal] = useState('');
            const [dataRenovacao, setDataRenovacao] = useState('');
            const [categoria, setCategoria] = useState('');
        
            const adicionarAssinatura = async () =>{
                if(!nome || !valorMensal || !dataRenovacao || !categoria){
                    Alert.alert('Preencha todos os campos');
                    return;
                }
        
                try{
                    await addDoc(collection(db, 'uid'),{
                        nome,
                        valorMensal: parseFloat(valorMensal),
                        dataRenovacao: data,
                        categoria,
                    });
        
                Alert.alert('Assinatura adicionada');
                setNome('');
                setValorMensal('');
                setDataRenovacao('');
                setCategoria('');
                }catch(error){
                    console.log('Erro ao adicionar assinatura: ', error);
                }
            }

        return(
            <View style = {styles.container}>
                <Text style = {styles.text}> Assinatura </Text>
                <TextInput 
                 style = {styles.input} 
                 value = {nome}
                 onChangeText={setNome}
                 />

                 <Text style = {styles.text}>Preço R$</Text>
                 <TextInput
                 style = {styles.input}
                 value = {valorMensal}
                 onChangeText = {setValorMensal}
                 />

                 <Text style = {styles.text}> Data da renovação </Text> {/*ARRUMAR*/}
                 <TextInput
                 style = {styles.input}
                 value = {dataRenovacao}
                 onChangeText = {setDataRenovacao}
                 />

                 <Text style = {styles.text}> Categoria </Text>
                 <TextInput
                 style = {styles.input}
                 value = {categoria}
                 onChangeText = {setCategoria}
                 placeholder={"ex: Streaming, Educação, Software, Outros"}
                 />

                 <Button title = 'Adicionar assinatura' onPress = {AdicionarAssinatura}/>
            </View>

        )
    }

    const styles = StyleSheet.create({
        container: {
          padding: 16,
          marginTop: 30,
        },
        text: {
          marginBottom: 4,
          fontWeight: 'bold',
        },
        input: {
          borderWidth: 1,
          borderColor: '#999',
          padding: 8,
          marginBottom: 12,
          borderRadius: 4,
        },
      });
