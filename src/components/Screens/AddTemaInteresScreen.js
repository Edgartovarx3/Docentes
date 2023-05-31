import { TextInput } from "@react-native-material/core";
import { React, useState } from "react";
import { StyleSheet, Text, View, Button, Alert} from "react-native";
import { useRoute } from '@react-navigation/native';
import { Buffer } from 'buffer';
import { InsertarTemasInteres } from "../../Metodos";


export default function AddTemainteresScreen({ navigation }) {
  const [NombreTemaInteres, setNombreTemaInteres] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const route = useRoute();
  const { Datos } = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');

  cancelarbutton = () =>
    Alert.alert('Cancelar', '¿Estas seguro de que quieres cancelar?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed')
      },
      {text: 'Si',  onPress:()=>navigation.goBack()}
    ]);
  
    const handleSubmit = async () => {
      try {
        const addTemaInteres = {
          areaProfesional:NombreTemaInteres , // Asegúrate de que el nombre coincida con la columna en la tabla (mayúscula inicial)
          fkIdUsuario: Datos.usuario.idUsuario,
          experiencia: descripcion
          
        };
        const response = await InsertarTemasInteres(credentials, addTemaInteres);
       
  
        console.log('Respuesta fuera de la clase:', response);
  
      } catch (error) {
        // Mostrar una notificación de error
        Alert.alert('Error', 'Ha ocurrido un error al insertar los datos.'+ error);
      }
    };
  return (
    <View>
      <Text style={styles.text}>Hola, {Datos.usuario.nombreUsuario} {Datos.usuario.apellidoPaUsuario} {Datos.usuario.apellidoMaUsuario}</Text>
      <TextInput
        style={styles.input}
        maxLength={40}
        onChangeText={setNombreTemaInteres}
        placeholder="Escribe el Tema de interes"
      />
      <TextInput
        style={styles.input1}
        editable
        multiline
        numberOfLines={15}
        maxLength={200}
        onChangeText={(text) => setdescripcion(text)}
        value={descripcion}
        placeholder="Escribe una descripcion sobre el tema de interes"
      />

      <Button
        title="Confirmar"
        onPress={()=> {handleSubmit(); navigation.goBack() }}
      />
      <Button
        title="cancelar"
        onPress={this.cancelarbutton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    textAlignVertical: "top",
    textAlign: "center",
    borderColor: "gray",
    borderWidth: 1,
    minWidth: 200,
    margin: 20,
  },
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
});