import React, {useState} from "react";
import { View, StyleSheet, Alert,TextInput, Button } from "react-native";
import { InsertarPublicaciones } from "../../Metodos";
import { Buffer } from 'buffer';
import { useRoute } from '@react-navigation/native';

export default function AddPublicacionScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [link, setLink] = useState('');
  const route = useRoute();

  const { Datos} = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');

  const handleSubmit = async () => {
    try {
      const datos = {
        descripcionPublicaciones: descripcion, // Asegúrate de que el nombre coincida con la columna en la tabla (mayúscula inicial)
        fkIdUsuario: Datos.usuario.idUsuario,
        linkPublicaciones: link,
        tituloPublicaciones: titulo
      };
      const response = await InsertarPublicaciones(credentials, datos);

      // Limpiar los campos del formulario
      setTitulo('');
      setLink('');
      setDescripcion('');

      // Mostrar una notificación de éxito
     

      console.log('Respuesta fuera de la clase:', response);

    } catch (error) {
      // Mostrar una notificación de error
      Alert.alert('Error', 'Ha ocurrido un error al insertar los datos.'+ error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enlace"
          value={link}
          onChangeText={setLink}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Agregar"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonContainer: {
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    width: 150,
  },
});