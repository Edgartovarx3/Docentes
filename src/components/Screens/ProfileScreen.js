import React, { useState } from 'react';
import {Text, Button, View, TextInput,Image,TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import ModalSelector from 'react-native-modal-selector';

export default function ProfileScreen({ navigation }) {
    const imageUrl='https://i.pinimg.com/736x/3f/66/85/3f6685138ab5143add56e03925b4e5a1.jpg'
    const [Nombre, setNombre] = useState('');
    const [ApellidoPa, setApellidoPa] = useState('');
    const [ApellidoMa, setApellidoMa] = useState('');

        const [selectedOption, setSelectedOption] = useState('');
      
        
        
    
    const handleOptionChange = (option) => {
        setSelectedOption(option.label);
      };
    
    const data = [
        { key: 1, label: 'Ingeniería En Sistemas' },
        { key: 2, label: 'Ingeniería En ITCS' },
        { key: 3, label: 'Arquitectura' },
      ];
    
  return (
    <ScrollView style={styles.transparente}>
    <View style={styles.container}>
         <View style={styles.foto}>
       <Image
       source={{ uri: imageUrl }}
       style={styles.image}
     />
       </View>
       <View style={{justifyContent: 'space-between', top:50, }}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={Nombre}
        onChangeText={text => setNombre(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido Paterno"
        value={ApellidoPa}
        onChangeText={text => setApellidoPa(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido Materno"
        value={ApellidoMa}
        onChangeText={text => setApellidoMa(text)}
        multiline
      />







      <View style={styles.buttonContainer}>
      <Button title="Cancelar" onPress={() => {navigation.navigate("Menu")}}  />
    
      <View>
      <Button title="Editar" onPress={() => {}} buttonStyle={styles.separator}   />
      </View></View>  
     
     
      </View>
      <ScrollView style={{top:-100}}>
<ModalSelector
        data={data}
        initValue="Carrera"
        onChange={handleOptionChange}
        style={styles.modalSelector}
        selectStyle={styles.selectButton}
        selectTextStyle={styles.selectButtonText}
        optionStyle={styles.optionStyle}
        optionTextStyle={styles.optionTextStyle}
        cancelStyle={styles.cancelStyle}
        cancelTextStyle={styles.cancelTextStyle}
      >
        <TouchableOpacity style={styles.selectButton}>
          <Text style={styles.selectButtonText}>{selectedOption}</Text>
        </TouchableOpacity>
      </ModalSelector>
    </ScrollView>
      </View>
    </ScrollView>);
  }
const styles ={
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalSelector: {
        width:250,
        flex: 1,
        marginTop: 10,
        left:0,
        backgroundColor: '#ffffff',
      },
      selectButton: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 10,
      },
      selectButtonText: {
        color: '#333333',
        fontSize: 16,
      },
      optionStyle: {
        backgroundColor: '#ffffff',
        padding: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      },
      optionTextStyle: {
        color: '#333333',
        fontSize: 16,
      },
      cancelStyle: {
        backgroundColor: '#e0e0e0',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
      },
      cancelTextStyle: {
        color: '#333333',
        fontSize: 16,
      },
      selectedOptionText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
      },
    transparente: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo transparente con 50% de opacidad
      },
    foto: {
        top:10,
        left:5,
        width: 140,
        height: 140,
        borderRadius: 80,
        overflow: 'hidden',
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      input: {
        
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#333',
        marginBottom: 10,
       
      },
     
      buttonContainer: {
       
        backgroundColor: 'rgba(0, 0, 0, 0)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin:50,
     
        
        
      },
      separator: {
        margin:50,
        top:-10,
        marginVertical: 10,
        marginHorizontal: 10,
      },
    };