import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Buffer } from 'buffer';
import { useRoute } from '@react-navigation/native';
import { InsertarDocumento } from '../../Metodos';

const AddDocumentoScreen = () => {
  const [archivo, setArchivo] = useState(null);
  const route = useRoute();
  const { Datos, Trabajo } = route.params;
  const credentials = Buffer.from(
    `${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`
  ).toString('base64');


  const seleccionarArchivo = async () => {
    try {
      
      const document = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (document && document.type === 'success') {
        setArchivo(document);
      
      }else{
        setArchivo(null);
       
      }
    } catch (error) {
      console.log(error)
     return;
    
    }
     
  };

  const handleGuardarDocumento = async () => {
    if(archivo){
    try {
      await InsertarDocumento(
        archivo.name,
        archivo,
        Trabajo,
        credentials
      );
    } catch (error) {
      
      console.log(error.message);
    }
  }else {
    Alert.alert("error",'Error al seleccionar el archivo');
  }
  };

  return (
    <View>
     

      <Button title="Seleccionar Archivo" onPress={seleccionarArchivo} />

      <Button
        title="Guardar Documento"
        onPress={handleGuardarDocumento}
      />
    </View>
  );
};

export default AddDocumentoScreen;
