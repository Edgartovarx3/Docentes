import React, { useState, useEffect } from 'react';
import { View, Text, Button, Switch, Alert, ScrollView,StyleSheet,TouchableOpacity } from 'react-native';
import { eliminarTemasInteres, obtenerTemasInteres } from '../../Metodos';
import { useRoute } from '@react-navigation/native';
import { Buffer } from 'buffer';


export default function TemainteresVITScreen({ navigation }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const route = useRoute();
  const { Datos } = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');
  const [TemaInteres, setTemaInteres] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  cancelarbutton = () =>
    Alert.alert('Eliminar', '¿Estas seguro de que deseas eliminar?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed')
      },
      {text: 'Si', onPress: () =>{ handleEliminar()}},
    ]); 

  const obtenerDatos = async () => {
    try {
      const datos = await obtenerTemasInteres(credentials);
      setTemaInteres(datos);
    } catch (error) {
      // Maneja el error
      console.log(error);
    }
  };

  useEffect(() => {
    // Llama a la función obtenerDatosActualizados cada 5 segundos (5000 ms)
    const interval = setInterval(obtenerDatos, 5000);

    // Limpia el intervalo cuando el componente se desmonta o cambia
    return () => clearInterval(interval);
  }, []);

  const handleSwitchToggle = (id) => {
    // Verificar si el elemento ya está seleccionado
    const selectedIndex = selectedItems.indexOf(id);
    if (selectedIndex > -1) {
      // Si está seleccionado, eliminarlo de la lista
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      // Si no está seleccionado, agregarlo a la lista
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleEliminar = () => {
    // Realizar la lógica de eliminación aquí
    if (selectedItems.length > 0) {
        if(selectedItems>=1){
         eliminarTemasInteres(credentials,selectedItems)
           
        }else{
            for( i=0; i< selectedItems.length; i++){
              
              eliminarTemasInteres(credentials,selectedItems[i])
                
               
            }
           
        }


     
     
      // Reiniciar la lista de elementos seleccionados
      setSelectedItems([]);
    } else {
      // No hay elementos seleccionados
      Alert.alert('Error', 'Debes seleccionar al menos un elemento para eliminar.');
    }
  };

  return (
    <View style={styles.boxContainer}>
  <ScrollView>
    {TemaInteres.TemasInteres ? (
      TemaInteres.TemasInteres.map((opcion) => (
        <View key={opcion.idTemaInteres} style={styles.card}>
          <Switch
            value={selectedItems.includes(opcion.idTemaInteres)}
            onValueChange={() => handleSwitchToggle(opcion.idTemaInteres)}
          />
          <Text style={styles.title}>{opcion.areaProfesional}</Text>
          <Text style={styles.subtitle}>{opcion.experiencia}</Text>
          
        </View>
      ))
    ) : (
      <Text>Cargando Temas de interes...</Text>
    )}
  </ScrollView>
  {TemaInteres.TemasInteres ? TemaInteres.TemasIntereszx.length==0?<Text>No hay ni vergas</Text>:<></>:<></>}
  <View style={styles.container}>
  <View>
  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Agregar Tema",{ Datos:Datos})}>
    <Text style={styles.buttonText}>Añadir</Text>
  </TouchableOpacity>
  </View>
  <Text>      </Text>
  <View>
  <TouchableOpacity style={styles.button} onPress={cancelarbutton}>
    <Text style={styles.buttonText}>Eliminar</Text>
  </TouchableOpacity>
</View>
</View>
</View>
  );
}
const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  title: {
      top:-40,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
      top:-40,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'gray',
  },
  Descripcion:{
      top:-40,
      fontSize: 14,
     
      marginBottom: 5,
  },
  button: {
    backgroundColor: '#f0f1f4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
    

    
  },
  container: {
  
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: .1,
    marginVertical:10,   
    paddingHorizontal: 20,
    marginLeft: 10,
    marginRight: 10, 
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
});

