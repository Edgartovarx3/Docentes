import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import * as yup from 'yup';
import { InsertarTrabajosRealizados } from '../../Metodos';
import { Buffer } from 'buffer';
import { useRoute } from '@react-navigation/native';

const schema = yup.object().shape({
  title: yup.string().required('Este campo es requerido'),
  description: yup.string().required('Este campo es requerido'),
});

export default function AddTrabajosRealizadosScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState(null);
  const route = useRoute();
  const { Datos} = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');

  const handleSubmit = async () => {
    try {
      const datos = {
        descripcion: description, // Asegúrate de que el nombre coincida con la columna en la tabla (mayúscula inicial)
        fkIdUsuario: Datos.usuario.idUsuario,
        titulo: title
      };
      const response = await InsertarTrabajosRealizados(credentials, datos);

      // Limpiar los campos del formulario
      setTitle('');
      setDescription('');
      
      // Mostrar una notificación de éxito
      Alert.alert( response.estatus, response.mensaje );


    } catch (error) {
      // Mostrar una notificación de error
      Alert.alert('Error', 'Ha ocurrido un error al insertar los datos.'+ error);
    }
  };
  const handleSave = () => {
    let validationErrors = {};
    schema
      .validate({ title, description }, { abortEarly: false })
      .then(() => {
        setErrors(null);
        // Aquí se podría enviar los datos del formulario a un servidor o guardarlos en un almacenamiento local
      })
      .catch((err) => {
        setErrors(validationErrors);
        validationErrors = {}; 
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
       
      });
  };

  const handleVisualize = () => {
    navigation.navigate(
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Visualizacion Trabajos')}></TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View >
        
      </View>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, errors?.title && styles.inputError]}
      />
      {errors?.title && <Text style={styles.error}>{errors.title}</Text>}
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.multilineInput, errors?.description && styles.inputError]}
        multiline={true}
        numberOfLines={4}
      />
      {errors?.description && <Text style={styles.error}>{errors.description}</Text>}
      <TouchableOpacity style={styles.button} onPress={()=> {handleSave();  handleSubmit();}}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleVisualize}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(' Visualizacion Trabajos')}>
  <Text style={styles.buttonText}>Ver los trabajos</Text>
</TouchableOpacity>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleBar: {
    backgroundColor: '#2196F3',
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  job: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  }
});
;