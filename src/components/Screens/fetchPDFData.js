
import {eliminarDocumentos , obtenerDocumento } from '../../Metodos';
import { Buffer } from 'buffer';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import  React,{  useState,useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text,TouchableOpacity,Alert } from 'react-native';
import Pdf from 'react-native-pdf';

const FetchPDFData = ({navigation}) => {
  const route = useRoute();
  const { Datos, Trabajo } = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');
   const [pdfSource, setPdfSource] = useState(null);
 

   

   const EliminarDoc = async () => {
    try {
      const Doc = await eliminarDocumentos(Trabajo,credentials);
      Alert.alert("Estatus",Doc.mensaje);
      navigation.goBack()
    } catch (error) {
      
     handleAuthError(error)
     
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await obtenerDocumento(Trabajo, credentials);

        if (response.pdf) {
          setPdfSource({ uri: `data:application/pdf;base64,${response.pdf}`, cache: true })

      
         
        } else {
          console.log('No se encontró ningún documento');
        }
      } catch (error) {
        console.log('Error al obtener el documento:', error);
      }
    };

    fetchData();
  }, []);

 

  return (
    <SafeAreaView style={styles.container}>
     {pdfSource ?  <TouchableOpacity onPress={() => EliminarDoc()}>
            <Text >Eliminar pdf</Text>
          </TouchableOpacity>:<></>}
      
      {pdfSource ? 
      <Pdf
        trustAllCerts={false}
       
        source={pdfSource}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
      :<Text>No se Encontro un  Archivo PDF</Text>}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 32
  },
  pdf: {
    flex: 1,
    alignSelf: "stretch"
  }
});

export default FetchPDFData