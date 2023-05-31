import React, { useState, useEffect } from 'react';
import { View, Text, Linking,Switch, Alert, ScrollView,StyleSheet,TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Buffer } from 'buffer';
import { eliminarPublicaciones, obtenerPublicaciones } from "../../Metodos";

const PublicacionesScreen = ({ navigation }) => {
 
  const [selectedItems, setSelectedItems] = useState([]);
  const route = useRoute();
  const { Datos } = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');
  const [Publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      const datos = await obtenerPublicaciones(credentials);
      setPublicaciones(datos);
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
            eliminarPublicaciones(credentials,selectedItems)
           
        }else{
            for( i=0; i< selectedItems.length; i++){
              
              eliminarPublicaciones(credentials,selectedItems[i])
                
               
            }
           
        }
     
     
      // Reiniciar la lista de elementos seleccionados
      setSelectedItems([]);
    } else {
      // No hay elementos seleccionados
      Alert.alert('Error', 'Debes seleccionar al menos un elemento para eliminar.');
    }
  }

  const abrirEnlace = (url) => {
    Linking.openURL(url);
  };
  return (
    <View>
      
  <ScrollView style={styles.container}>
    {Publicaciones.Usuarios ? (
      Publicaciones.Usuarios.map((opcion) => (
        <View key={opcion.idPublicaciones} style={styles.card}>
          
          <Switch
            value={selectedItems.includes(opcion.idPublicaciones)}
            onValueChange={() => handleSwitchToggle(opcion.idPublicaciones)}
          />
          <Text style={styles.title}>{opcion.tituloPublicaciones}</Text>
          <Text style={styles.description}>{opcion.descripcionPublicaciones}</Text>
          <TouchableOpacity onPress={() => abrirEnlace(opcion.linkPublicaciones) }>
            <Text style={styles.link}>{opcion.linkPublicaciones}</Text>
          </TouchableOpacity>
          
          
        </View>
      ))
    ) : (
      <Text>Cargando publicacines...</Text>
    )}
    <Text></Text>
    <Text></Text>
  <Text></Text>
  </ScrollView>
  <View style={styles.separator}>
  <View>
  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Agregar Publicacion",{ Datos:Datos})}>
    <Text style={styles.buttonText}>Añadir</Text>
  </TouchableOpacity>
  </View>
  <Text>      </Text>
 
  <View >
  <TouchableOpacity style={styles.button} onPress={handleEliminar}>
    <Text style={styles.buttonText}>Eliminar</Text>
  </TouchableOpacity>
  </View>
  </View>

  
 
  
</View>


  );

 
};

const styles = StyleSheet.create({
 
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'center',
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    alignSelf: 'center',
  },
  link: {
    fontSize: 12,
    color: 'blue',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  deleteButtonText: {
    fontSize: 12,
    color: 'red',
    textDecorationLine: 'underline',
  },
  addButtonContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 25,
    width: 150,
    height: 40,
    marginBottom: 28,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    
  },
  button: {
    top:-50,
   
    backgroundColor: '#f0f1f4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  separator:{
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

export default PublicacionesScreen;


