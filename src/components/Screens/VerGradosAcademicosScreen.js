import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Buffer } from 'buffer';
import { useRoute } from '@react-navigation/native';
import { obtenerGradosAcademicosIndividual } from '../../Metodos';
import { useEffect } from 'react';



const VerGradosAcademicosScreen = () => {
  const route = useRoute();
  const { Datos, idGrado} = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');
  const [grados,setGrados]=useState([])
  useEffect(() => {
    obtenerDatos_individual();
  }, []);
  
  const obtenerDatos_individual = async () => {
   
    try {
      const datos = await obtenerGradosAcademicosIndividual(credentials,idGrado);
      setGrados(datos);
      console.log(datos)
    } catch (error) {
      // Maneja el error
      console.log(error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.Title}>{grados.Titulo}</Text>
        <Text style={styles.Type}>{grados.Tipo}</Text>
        <Text style={styles.descripcion}>{grados.Descripcion}</Text>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  descripcion: {
    fontSize: 14,
    marginBottom: 8,
  },
  Title: {
    fontSize: 24,
    marginBottom: 8,
    textAlign:'center',
    fontWeight: 'bold'
  },
  Type: {
    fontSize: 16,
    marginBottom: 8,
    textAlign:'center',
    color:'red',
    fontWeight: 'bold'
  },
});

export default VerGradosAcademicosScreen;
