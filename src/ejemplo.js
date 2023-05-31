import React, { useState } from 'react';
import { View,Text, TextInput, Button, Alert ,StyleSheet,Image,TouchableOpacity} from 'react-native';
import axios from 'axios';
import { Buffer } from 'buffer';
import { ScrollView } from 'react-native-gesture-handler';







const LoginScreen = ({navigation}) => {

    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Datos, setDatos] = useState([]);
  const [token,setToken]=useState();

  const API_URL = 'http://192.168.0.13:5000/consultarUsuario';
 
  const handleLogin = async () => {
    try {
      // Realizar la solicitud HTTP al servidor Flask para autenticar al usuario
     
      const credentials = Buffer.from(`${username}:${password}`).toString('base64');
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });
    
      if (response.status === 200) {
        setDatos(response.data)
        
        console.log('Inicio de sesión exitoso');
        setToken(credentials);
        navigation.navigate('Home',{ Datos: response.data });
      } else {
        console.log('Inicio de sesión fallido');
      }
    }catch (error) {
      // Manejar los errores de la solicitud
      Alert.alert('Error', 'Ocurrió un error en la autenticación. Por favor, intenta nuevamente.: '+error);
    }
  };

  return (
   
    <ScrollView style={styles.container}>
      <Image source={{ uri: 'https://pbs.twimg.com/profile_images/862756451130818560/EfCjBf4C_400x400.jpg' }} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Correo Electronico"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    paddingHorizontal: 20,
  },
  image: {
    top:20,
    left:50,
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 100,
  },
  input: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#e8e8e8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default LoginScreen;
