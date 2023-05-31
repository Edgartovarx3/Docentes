import {React,useState,useEffect }from "react";
import { Button, View,Text, TextInput,StyleSheet,Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import { obtenerTrayectoriaIndividual } from "../../Metodos";
import { Buffer } from 'buffer';

const DetallesTrayectoriaScreen = () => {
  const route = useRoute();
 
  const { Datos, idTrayectoria } = route.params;
  const [trayectoria, setTrayectoria] = useState([]);
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');

  useEffect(() => {
    obtenerDatos_individual();
  }, []);
  
  const obtenerDatos_individual = async () => {
   
    try {
      const datos = await obtenerTrayectoriaIndividual(credentials,idTrayectoria);
      setTrayectoria(datos);
      
    } catch (error) {
      // Maneja el error
      console.log(error);
    }
  };
  
  
  // Datos de ejemplo
  const detalleTrayectoria = {
    tipoParticipacion:trayectoria.tipoParticipacion ,
    tituloParticipacion: trayectoria.tituloParticipacion,
    descripcion: trayectoria.Descripcion,
  };

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardContainer}>
        <Text style={styles.label}>Título de Participación</Text>
        <Text style={styles.value}>{detalleTrayectoria.tituloParticipacion}</Text>
  
        <Text style={styles.label}>Tipo de Participación</Text>
        <Text style={styles.value}>{detalleTrayectoria.tipoParticipacion}</Text>
  
        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.value}>{detalleTrayectoria.descripcion}</Text>
      </View>
    </View>
  );
  
}
const styles = {
  cardWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Color semitransparente para el efecto de carta encima
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    marginBottom: 12,
  },
};

  

export default DetallesTrayectoriaScreen;