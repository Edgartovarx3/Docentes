import React, { useState, useEffect } from 'react';
import { View, Text, Button, Switch, Alert, ScrollView,StyleSheet,TouchableOpacity } from 'react-native';
import { eliminarGradosAcademicos, eliminarTrayectoriaProfesional, obtenerGradosAcademicos, obtenerTrayectoria } from '../../Metodos';
import { useRoute } from '@react-navigation/native';
import { Buffer } from 'buffer';

const EliminarGradosScreen = ({navigation}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const route = useRoute();
  const { Datos } = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');
  const [grados, setGrados] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  cancelarbutton = () =>
    Alert.alert('Cancelar', '¿Estas seguro de que quieres eliminar?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed')
      },
      {text: 'Si', onPress: () => {handleEliminar(); navigation.goBack()}},
    ]);
  const obtenerDatos = async () => {
    try {
      const datos = await obtenerGradosAcademicos(credentials);
      setGrados(datos);
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
            eliminarGradosAcademicos(credentials,selectedItems)
           
        }else{
            for( i=0; i< selectedItems.length; i++){
              
                eliminarGradosAcademicos(credentials,selectedItems[i])
                
               
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
    <View>
    <View style={styles.boxContainer}>
  <ScrollView style={styles.Scroll}>
    {grados.opciones ? (
      grados.opciones.map((opcion) => (
        <View key={opcion.id} style={styles.card}>
          <Switch
            value={selectedItems.includes(opcion.id)}
            onValueChange={() => handleSwitchToggle(opcion.id)}
          />
          <Text style={styles.title}>{opcion.Titulo}</Text>
          <Text style={styles.subtitle}>{opcion.Tipo}</Text>
          <Text style={styles.Descripcion}>{opcion.Descripcion}</Text>
        </View>
      ))
    ) : (
      <Text>Cargando Grados Academicos...</Text>
    )}
  </ScrollView>
  <TouchableOpacity style={styles.button} onPress={cancelarbutton}>
    <Text style={styles.buttonText}>Eliminar</Text>
  </TouchableOpacity>
</View>

</View>
  );
};
const styles = StyleSheet.create({
    boxContainer: {
      backgroundColor: 'lightgray',
      padding: 10,
      borderRadius: 5,
      margin: 10,
    },
    Scroll:{
      width:"102%",
      height:"92%",
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
      color: 'red',
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
    buttonText: {
      color: '#000000',
      fontSize: 16,
    },
  });
  
export default EliminarGradosScreen;