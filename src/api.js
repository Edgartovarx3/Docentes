import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Reemplaza con la URL de tu API Flask




export const login = async (correo, password) => {
  try {
    const response = await axios.post(API_URL+'/login', {
      correo: correo,
      password: password
     
    });
    
    // Aquí puedes guardar el token de acceso en AsyncStorage o en el estado de tu aplicación
    const accessToken = response.data.accessToken;

    // Puedes realizar cualquier acción adicional después de la autenticación exitosa
    
    return accessToken;
  } catch (error) {
    // Maneja el error de autenticación aquí
    throw new Error('Error de autenticación');
  }
};
