import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text,Alert } from 'react-native';
import * as Yup from 'yup';
import { InsertarDocentes } from '../../../Metodos';
import { useRoute } from '@react-navigation/native';
import { Buffer } from 'buffer';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  apellidoPaterno: Yup.string().required('El apellido paterno es obligatorio'),
  apellidoMaterno: Yup.string().required('El apellido materno es obligatorio'),
  correo: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
  tipoUsuario: Yup.string().required('El tipo de usuario es obligatorio'),
});

const AddDocenteScreen = () => {
const route = useRoute();
  const { Datos } = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState("D");
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    try {
      await validationSchema.validate({
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        password,
        tipoUsuario,
      });

      const datos = {
        nombreUsuario: nombre, // Asegúrate de que el nombre coincida con la columna en la tabla (mayúscula inicial)
        apellidoPaUsuario:apellidoPaterno,
        apellidoMaUsuario: apellidoMaterno,
        correoUsuario: correo,
        passwordUsuario:password,
        tipoUsuario:tipoUsuario
      };
      await InsertarDocentes(credentials, datos);
      // Realizar las acciones deseadas con los datos del formulario

      setNombre('');
      setApellidoPaterno('');
      setApellidoMaterno('');
      setCorreo('');
      setPassword('');
      setTipoUsuario('');
      setErrors({});
    } catch (error) {
        Alert.alert("Error",error.message)
      const validationErrors = {};
      error.inner.forEach((err) => {
        
        validationErrors[err.path] = err.message;
       

      });
      setErrors(validationErrors);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Apellido Paterno"
        value={apellidoPaterno}
        onChangeText={setApellidoPaterno}
      />
      {errors.apellidoPaterno && <Text style={styles.errorText}>{errors.apellidoPaterno}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Apellido Materno"
        value={apellidoMaterno}
        onChangeText={setApellidoMaterno}
      />
      {errors.apellidoMaterno && <Text style={styles.errorText}>{errors.apellidoMaterno}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
      />
      {errors.correo && <Text style={styles.errorText}>{errors.correo}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <TextInput
        style={styles.input}
        editable={false}
        value="Docente"
        onChangeText={tipoUsuario}
      
      />
      {errors.tipoUsuario && <Text style={styles.errorText}>{errors.tipoUsuario}</Text>}
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AddDocenteScreen;
