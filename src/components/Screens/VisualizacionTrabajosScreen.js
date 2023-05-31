import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Buffer } from 'buffer';
import { useRoute } from '@react-navigation/native';
import { obtenerTrabajosRealizadosIndividual } from '../../Metodos';
import fetchPDFData from './fetchPDFData';


const VisualizacionTrabajosScreen = ({ navigation }) => {
  const route = useRoute();
  const { Datos, idTrabajos} = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');
  const [Trabajos,setTrabajos]=useState([]);
  
  useEffect(() => {
    obtenerDatos_individual();
  }, []);
  
  const obtenerDatos_individual = async () => {
   
    try {
      const datos = await obtenerTrabajosRealizadosIndividual(credentials,idTrabajos);
      setTrabajos(datos);
    } catch (error) {
      // Maneja el error
      console.log(error);
    }
  };
  // Datos de ejemplo para mostrar los trabajos
  const trabajo = { 
      titulo: Trabajos.titulo, 
      descripcion: Trabajos.descripcion
     }
  

 

  return (
    <View style={styles.container}>
     <View style={styles.tarjeta}>
        <Text style={styles.titulo}>{trabajo.titulo}</Text>
        <Text style={styles.descripcion}>{trabajo.descripcion}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Subir Documento",{ Datos:Datos, Trabajo:Trabajos.id})}>
            <Text style={styles.link}>Cargar documento</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Visualizador",{ Datos:Datos, Trabajo:Trabajos.id})}>
            <Text style={styles.link}>Ver Documento</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descripcion: {
    fontSize: 16,
  },
  link: {
    fontSize: 12,
    color: 'blue',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
});

export default VisualizacionTrabajosScreen;
