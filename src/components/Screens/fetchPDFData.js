
import { obtenerDocumento } from '../../Metodos';
import { Buffer } from 'buffer';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import  React,{  useState,useEffect } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import Pdf from 'react-native-pdf';

const FetchPDFData = () => {
  const route = useRoute();
  const { Datos, Trabajo } = route.params;
  const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');
  const onlineSource = { uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf", cache: true };
  const [pdfSource, setPdfSource] = useState(onlineSource);

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
      <Pdf
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