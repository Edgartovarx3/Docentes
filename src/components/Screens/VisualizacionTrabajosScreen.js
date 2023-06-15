import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert,TextInput } from 'react-native';
import { Buffer } from 'buffer';
import { useRoute } from '@react-navigation/native';
import { EditarTrabajosRealizados, obtenerTrabajosRealizadosIndividual } from '../../Metodos';



const VisualizacionTrabajosScreen = ({ navigation }) => {
  const route = useRoute();
  const { Datos, idTrabajos} = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');
  const [Editable, setEditable]=useState(false)
  const[TrabajosEditable, setTrabajosEditable]=useState({})
  const [Trabajos,setTrabajos]=useState([]);
  
  useEffect(() => {
    obtenerDatos_individual();
  }, [Editable]);

  const obtenerDatos_individual = async () => {
   
    try {
      const datos = await obtenerTrabajosRealizadosIndividual(credentials,idTrabajos);
      setTrabajos(datos);
      setTrabajosEditable(datos);
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
  const handleGuardar = async () => {
    try{
    await EditarTrabajosRealizados(credentials,Trabajos.id,TrabajosEditable);
    setEditable(false);
    }catch(error){
     console.log("error: "+error)
    }
  };
     cancelarbutton = () =>
     Alert.alert('Actualizar Trabajos', '¿Estas seguro de que deseas Actualizar?', [
       {
         text: 'No',
         onPress: () => setEditable(false)
       },
       {text: 'Si', onPress: () =>{ handleGuardar()}},
     ]); 
 

  return (
    <View style={styles.container}>
    {!Editable? (
     <View style={styles.tarjeta}>
        <Text style={styles.titulo}>{trabajo.titulo}</Text>
        <Text style={styles.descripcion}>{trabajo.descripcion}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Subir Documento",{ Datos:Datos, Trabajo:Trabajos.id})}>
            <Text style={styles.link}>Cargar documento</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Visualizador",{ Datos:Datos, Trabajo:Trabajos.id})}>
            <Text style={styles.link}>Ver Documento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setEditable(true)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          
          
      </View>
  ):(
    <View style={styles.cardContainer}>
   
    <Text style={styles.label}>Título del Trabajo</Text>
    <TextInput
      style={styles.input}
      value={TrabajosEditable.titulo}
      onChangeText={(text) =>
        setTrabajosEditable((prevEdicion) => ({ ...prevEdicion, titulo: text }))
      }
    />


    <Text style={styles.label}>Descripción</Text>
    <TextInput
      style={styles.input}
      value={TrabajosEditable.descripcion}
      onChangeText={(text) =>
        setTrabajosEditable((prevEdicion) => ({ ...prevEdicion, descripcion: text }))
      }
      multiline
    />
     <TouchableOpacity style={styles.button} onPress={cancelarbutton}>
      <Text style={styles.buttonText}>Guardar</Text>
    </TouchableOpacity>

    
  </View>
  )
    
    }
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
  }, cardWrapper: {
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
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  button: {
    backgroundColor: '#f0f1f4',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
  },
});


export default VisualizacionTrabajosScreen;
