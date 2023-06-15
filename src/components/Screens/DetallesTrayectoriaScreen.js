import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import { EditarTrayectoria, obtenerTrayectoriaIndividual } from "../../Metodos";
import { Buffer } from 'buffer';

const DetallesTrayectoriaScreen = () => {
  const route = useRoute();
  const [Editar, setEditar] = useState(false);
  const { Datos, idTrayectoria } = route.params;
  const [trayectoria, setTrayectoria] = useState({});
  const [edicionTrayectoria, setEdicionTrayectoria] = useState({});

  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');

  cancelarbutton = () =>
  Alert.alert('Cambiar Datos', '¿Estas seguro de que deseas Actualizar?', [
    {
      text: 'No',
      onPress: () => setEditar(false)
    },
    {text: 'Si', onPress: () =>{ handleGuardar()}},
  ]); 

  useEffect(() => {
    obtenerDatosIndividual();
  }, [Editar]);

  const obtenerDatosIndividual = async () => {
    try {
      const datos = await obtenerTrayectoriaIndividual(credentials, idTrayectoria);
      setTrayectoria(datos);
      setEdicionTrayectoria(datos);
    } catch (error) {
      // Manejar el error
      console.log(error);
    }
  };

  const handleGuardar = async () => {
    console.log(edicionTrayectoria)
    try{
    await EditarTrayectoria(credentials, edicionTrayectoria,trayectoria.idTrayectoria);
    setEditar(false);
    }catch(error){
     console.log("error: "+error)
    }
  };

  return (
    <View style={styles.cardWrapper}>
      {!Editar ? (
        <View style={styles.cardContainer}>
          <Text>{Editar}</Text>
          <Text style={styles.label}>Título de Participación</Text>
          <Text style={styles.value}>{trayectoria.tituloParticipacion}</Text>

          <Text style={styles.label}>Tipo de Participación</Text>
          <Text style={styles.value}>{trayectoria.tipoParticipacion}</Text>

          <Text style={styles.label}>Descripción</Text>
          <Text style={styles.value}>{trayectoria.Descripcion}</Text>

          <TouchableOpacity style={styles.button} onPress={() => setEditar(true)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
         
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <Text>{Editar}</Text>
          <Text style={styles.label}>Título de Participación</Text>
          <TextInput
            style={styles.input}
            value={edicionTrayectoria.tituloParticipacion}
            onChangeText={(text) =>
              setEdicionTrayectoria((prevEdicion) => ({ ...prevEdicion, tituloParticipacion: text }))
            }
          />

          <Text style={styles.label}>Tipo de Participación</Text>
          <TextInput
            style={styles.input}
            value={edicionTrayectoria.tipoParticipacion}
            onChangeText={(text) =>
              setEdicionTrayectoria((prevEdicion) => ({ ...prevEdicion, tipoParticipacion: text }))
            }
          />

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={styles.input}
            value={edicionTrayectoria.Descripcion}
            onChangeText={(text) =>
              setEdicionTrayectoria((prevEdicion) => ({ ...prevEdicion, Descripcion: text }))
            }
            multiline
          />
           <TouchableOpacity style={styles.button} onPress={cancelarbutton}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>

          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default DetallesTrayectoriaScreen;
