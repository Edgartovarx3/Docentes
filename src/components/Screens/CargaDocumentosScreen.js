import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const CargaDocumentosScreen = () => {
  const [documento, setDocumento] = useState(null);

  const seleccionarDocumento = async () => {
    
  };

  return (
    <View style={styles.container}>
      <Button
        title="Elegir archivo PDF"
        onPress={seleccionarDocumento}
      />
      {documento && (
        <View style={styles.documentoContainer}>
          <Text style={styles.documentoTexto}>Documento seleccionado: {documento}</Text>
          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  documentoContainer: {
    marginTop: 16,
  },
  documentoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CargaDocumentosScreen;

