import {React,useState }from "react";
import { Button, View,ScrollView, Text, TextInput,StyleSheet,Alert,TouchableOpacity } from "react-native";
import { insertarTrayectoriaProfesional } from "../../Metodos";
import { Buffer } from 'buffer';
import { useRoute } from '@react-navigation/native';

export default function TrayectoriaScreen({navigation}) {
  const route = useRoute();
 
  const { Datos} = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
    const handleSubmit = async () => {
      try {
        const datos = {
          Descripcion: descripcion, // Asegúrate de que el nombre coincida con la columna en la tabla (mayúscula inicial)
          fkIdUsuario: Datos.usuario.idUsuario,
          tipoParticipacion: tipo,
          tituloParticipacion: titulo
        };
        await insertarTrayectoriaProfesional(credentials, datos);
       
  
      } catch (error) {
        // Mostrar una notificación de error
      }
    };
  //metodo agregar
  

  return (
    <ScrollView style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Título de trayectoria"
      value={titulo}
      onChangeText={text => setTitulo(text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Tipo de trayectoria"
      value={tipo}
      onChangeText={text => setTipo(text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Descripción de trayectoria"
      value={descripcion}
      onChangeText={text => setDescripcion(text)}
      multiline
    />
    <View style={styles.buttonContainer}>
   

<TouchableOpacity style={styles.button} onPress={() => {}}>
  <Text style={styles.buttonText}>Cancelar</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={()=>{handleSubmit();  navigation.goBack();}}>
  <Text style={styles.buttonText}>Agregar</Text>
</TouchableOpacity>
    </View>
  </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    
    flex: 1,
   top:100,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#e8e8e8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    top:-10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
  },buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    
  },
      input: {
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#333',
        marginBottom: 10,
      },
  })