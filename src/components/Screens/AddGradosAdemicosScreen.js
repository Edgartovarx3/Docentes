import { TextInput } from "@react-native-material/core";
import { React, useState } from "react";
import { StyleSheet, Text,View, Button, Alert, TouchableOpacity } from "react-native";
import {  Picker } from '@react-native-picker/picker';
import { InsertarGradosAcademicos } from "../../Metodos";
import { Buffer } from 'buffer';
import { useRoute } from '@react-navigation/native';

export default function AddGradosAdemicosScreen({ navigation }) {
  const route = useRoute();
  const [descripcion, setdescripcion] = useState("");
  const [selectedValue, setSelectedValue] = useState('Licenciatura');
  const[titulo,setTitulo]=useState('');
  const { Datos} = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');

 
  cancelarbutton = () =>
    Alert.alert('Cancelar', '¿Estas seguro de que quieres cancelar?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed')
      },
      {text: 'Si', onPress: () => navigation.goBack()},
    ]);
  
    const handleSubmit = async () => {
      try {
        const datos = {
          Titulo: titulo, // Asegúrate de que el nombre coincida con la columna en la tabla (mayúscula inicial)
          Descripcion: descripcion,
          Tipo: selectedValue
        };
        const response = await InsertarGradosAcademicos(credentials, datos);
        Alert.alert("Estatus",response.mensaje)
        // Limpiar los campos del formulario
        setTitulo('');
        setSelectedValue('');
        setdescripcion('');
        navigation.goBack()
  
      } catch (error) {
        // Mostrar una notificación de error
        Alert.alert('Error', 'Ha ocurrido un error al insertar los datos.'+ error);
      }
    };
  
  
  return (
    <View>
     
      <TextInput
      maxLength={25}
      onChangeText={(text) => setTitulo(text)}
      value={titulo}
      placeholder="ej. Ingeniería en Tecnologías de la Información y las Comunicaciones. "
      style={styles.input1}

      />
      <TextInput
        style={styles.input1}
        editable
        multiline
        numberOfLines={15}
        maxLength={40}
        onChangeText={(text) => setdescripcion(text)}
        value={descripcion}
        placeholder="Escribe la descripcion del proyecto"
      />
        <Picker
    selectedValue={selectedValue}
    onValueChange={(itemValue) => setSelectedValue(itemValue)}
  >
    <Picker.Item label="Licenciatura" value="Licenciatura" />
    <Picker.Item label="Maestría" value="Maestría" />
    <Picker.Item label="Doctorado" value="Doctorado" />
    <Picker.Item label="Especialidad" value="Especialidad" />
    
  </Picker>
<View style={styles.buttonContainer}>

<TouchableOpacity
  onPress={this.cancelarbutton}
  style={styles.separator}>
  <Text style={styles.buttonText}>Cancelar</Text>
</TouchableOpacity>
<TouchableOpacity
  onPress={() => handleSubmit()}
  style={styles.separator}>
  <Text style={styles.buttonText}>Confirmar</Text>
</TouchableOpacity>

</View>
    </View> 
  );
}

const styles = StyleSheet.create({
  input1: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    borderColor: "gray",
    borderWidth: 1,
    margin:20,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
    height: 30,
    margin: 5,
  },
  buttonText: {
    color: '#333333',
  fontSize: 16,
  textAlign: 'center',
  },
  separator: {
    backgroundColor: '#e8e8e8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    top:-10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
