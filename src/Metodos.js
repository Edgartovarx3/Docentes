import axios from 'axios';
import { Alert } from "react-native";


const API_URL = 'http://192.168.0.13:5000/';

export const obtenerTrayectoria = async (token) => {
    
    try {
        const response = await axios.get(API_URL+'consulta/Trayectoria', {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }); 
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
export const obtenerTrayectoriaIndividual = async (token,idTrayectoria) => {
    
    try {
        const response = await axios.get(API_URL+'/trayectorias/'+idTrayectoria, {
            headers: {
              Authorization: `Basic ${token}`,
            },
          });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
export const insertarTrayectoriaProfesional = async (token,trayectoriaProfesional) => {
    try {
        const response = await axios.post(API_URL+'/agregarTrayectoria',trayectoriaProfesional, {
            headers: {
              Authorization: `Basic ${token}`,
            },
          });
          Alert.alert("Exito", response.data.mensaje);
      return response.data;
    } catch (error) {
      // Maneja el error aquí
      console.log('Error al insertar trayectoria profesional:', error);
      throw error;
    }
  };
export const eliminarTrayectoriaProfesional = async (token, idTrayectoria) => {
    try {
      const response = await axios.delete(API_URL+'/trayectorias/'+idTrayectoria, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      console.log('Trayectoria profesional eliminada:', response.data);
      return response.data;
    } catch (error) {
      // Maneja el error aquí
      console.log('Error al eliminar trayectoria profesional:', error);
      throw error;
    }
  };


 export const handleAuthError = (error) => {
    // Verificar el código de error de autenticación en la respuesta
    if (error.response && error.response.status === 401) {
      // Mostrar mensaje de error personalizado para autenticación fallida
      Alert.alert('Error de autenticación', error.response.data.mensaje);
    } else if (error.response && error.response.status === 403) {
      // Mostrar mensaje de error personalizado para acceso denegado
      Alert.alert('Acceso denegado', error.response.data.mensaje);
    }else if (error.response && error.response.status === 405) {
      // Mostrar mensaje de error personalizado para acceso denegado
      Alert.alert('Error', "el tipo de metodo es incorrecto ");
    } else {
      // Mostrar mensaje de error genérico
      Alert.alert('Error', 'Ha ocurrido un error desconocido: ' +error);
    }
  };

  export const obtenerTemasInteres = async (token) => {
    
    try {
        const response = await axios.get(API_URL+'/temasinteres/consulta', {
            headers: {
              Authorization: `Basic ${token}`,
            },
          });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  export const InsertarTemasInteres = async (token,TemaInteres) => {
    try {
        const response = await axios.post(API_URL+'/temasinteres/agregar',TemaInteres, {
            headers: {
              Authorization: `Basic ${token}`,
            },
          });
          Alert.alert("Exito", response.data.mensaje);
      return response.data;
    } catch (error) {
      // Maneja el error aquí
      console.log('Error al insertar Tema interes:', error);
      throw error;
    }
  };
  export const eliminarTemasInteres = async (token, idTemaInteres) => {
    try {
      const response = await axios.delete(API_URL+'/temasinteres/eliminar/'+idTemaInteres, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      console.log('Tema de interes eliminado:', response.data);
      return response.data;
    } catch (error) {
      // Maneja el error aquí
      console.log('Error al eliminar el Tema de interes:', error);
      throw error;
    }
  };


  export const obtenerPublicaciones = async (token) => {
    
    try {
        const response = await axios.get(API_URL+'/publicaciones', {
            headers: {
              Authorization: `Basic ${token}`,
            },
          });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  export const InsertarPublicaciones = async (token,Publicacion) => {
    try {
        const response = await axios.post(API_URL+'/agregarPublicacion',Publicacion, {
            headers: {
              Authorization: `Basic ${token}`,
            },
          });
          Alert.alert("Exito", response.data.mensaje);
      return response.data;
    } catch (error) {
      // Maneja el error aquí
      console.log('Error al insertar trayectoria profesional:', error);
      throw error;
    }
  };
  export const eliminarPublicaciones = async (token, idPublicacion) => {
    try {
      const response = await axios.delete(API_URL+'/publicaciones/'+idPublicacion, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      console.log('Trayectoria profesional eliminada:', response.data);
      return response.data;
    } catch (error) {
      // Maneja el error aquí
      console.log('Error al eliminar trayectoria profesional:', error);
      throw error;
    }
  };

  export const obtenerTrabajosRealizados = async (token) => {
    
    try {
        const response = await axios.get(API_URL+'TrabajosRealizados', {
            headers: {
              Authorization: `Basic ${token}`,
            },
          });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  export const obtenerTrabajosRealizadosIndividual = async (token,idTrabajos) => {
    
    try {
        const response = await axios.get(API_URL+'/TrabajosRealizados/'+idTrabajos, {
            headers: {
              Authorization: `Basic ${token}`,
            },
          });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  export const InsertarTrabajosRealizados = async (token,Trabajo) => {
    try {
        const response = await axios.post(API_URL+'TrabajosRealizados',Trabajo, {
            headers: {
              Authorization: `Basic ${token}`,
            },
          });
         // Alert.alert("ok", response.data.mensaje);
      return response.data;
    } catch (error) {
      // Maneja el error aquí
      console.log('Error al insertar trabajo realizado:', error);
      throw error;
    }
  };

  export const InsertarDocumento = async (nombreDocumento, archivo, fk_id_trabajos_realizados,token) => {
   
      const formData = new FormData();
      formData.append('nombre_documento', nombreDocumento);
      formData.append('documento', {
        uri: archivo.uri,
        name: archivo.name,
        type: 'application/pdf',
      });
      formData.append('fk_id_trabajos_realizados', fk_id_trabajos_realizados);
      try {
      const response = await axios.post(API_URL+'/documentos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Basic ${token}`,
        },
      });
      Alert.alert("ok", response.data.mensaje)
      return response.data;
    } catch (error) {
       handleAuthError(error);
    }
  };

  export const obtenerDocumento = async (trabajoid, token) => {
    try {
        const response = await axios.get(`http://192.168.0.13:5000/documentos/${trabajoid}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      const pdfData = response.data;
      return pdfData
    } catch (error) {
      handleAuthError(error);
    }
  };
  
  
  