import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons'; 
import axios from 'axios';

export default function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({})
async function handleSearch() {
    if (input === "") {
      alert("Preencha algum cep!");
      return;
    }
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${input}/json`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      alert("ERRO AO BUSCAR");
      
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Procurar por um CEP</Text>
      <View style={styles.containerInput}>
        <TextInput 
        
        style={styles.input}
        placeholder='Digite um CEP...' 
        value={input}
        onChangeText={(text)=>setInput(text)} 
        />
<TouchableOpacity  style={styles.buttonAdd} onPress={handleSearch}>
<EvilIcons name="search" size={24} color="black" />
</TouchableOpacity>
      </View>

  <View style={styles.main}>
    <Text style={styles.span}>CEP: {cep.cep}</Text>
    <Text style={styles.span}>Rua: {cep.logradouro}</Text>
    <Text style={styles.span}>Bairro: {cep.bairro}</Text>
    <Text style={styles.span}>Cidade: {cep.localidade} - {cep.uf}</Text>

  </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#191919',
    paddingTop: 28,
  },
  title:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: '24',
    marginTop: '15%',
    paddingStart: '5%',
    marginBottom: 12
  },
  containerInput:{
    flexDirection: 'row',
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  input:{
    width: '75%',
    backgroundColor: '#FBFBFB',
    height: 44,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonAdd:{
    width: '15%',
    height: 44,
    backgroundColor: 'orange',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4

  }, 
 main:{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'baseline',
  
  
  width: 500,
  borderRadius: 8,
 
  backgroundColor: '#e0e0e0',
  
 }, 
 span:{
  marginBottom: 16,
  fontWeight: 'bold',
  marginLeft: 95,

 }

})