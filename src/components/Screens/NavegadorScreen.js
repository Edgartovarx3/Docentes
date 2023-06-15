import {  View,ScrollView, Text,Image,Alert,TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import React, { useState,useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { handleAuthError, obtenerGradosAcademicos, obtenerTrabajosRealizados, obtenerTrayectoria } from "../../Metodos";
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';




 function NavegadorScreen({ navigation }) {
const rutaFotoGuardadas = FileSystem.documentDirectory + 'foto.jpg';
 const imageUrl='https://i.pinimg.com/736x/3f/66/85/3f6685138ab5143add56e03925b4e5a1.jpg'
 const [MostrarTrayectoria, SetMostrarTrayectorias] = useState(false);
 const [MostrarPerfil, SetMostrarPerfil] = useState(false);
 const [MostrarGrados, SetMostrarGrados] = useState(false);
 const [MostrarTrabajos, SetMostrarTrabajos] = useState(false);
 const items = [];
 const route = useRoute();
 const { Datos } = route.params;
 const credentials = Buffer.from(`${Datos.usuario.correoUsuario}:${Datos.usuario.passwordUsuario}`).toString('base64');
 const [trayectoria, setTrayectoria] = useState([]);
 const [Trabajos, setTrabajos] = useState([]);
 const [rutaFotoGuardada, setRutaFotoGuardada] = useState(null);
 const [updateFoto, setUpdateFoto] = useState(false);
 const[GradosAcademicos,setGradosAcademicos]=useState([])

const inicio=async () =>{
SetMostrarGrados(false)
SetMostrarPerfil(true)
SetMostrarTrabajos(false)
SetMostrarTrayectorias(false)
}

useEffect(() => {
  inicio();

},[])
 useEffect(() => {
  if (Datos.usuario.tipoUsuario === 'D') {
    
    // Llama a la función por primera vez al cargar el componente
    obtenerDatos();
    obtenerTrabajos();
    obtenerGrados();
   

    const interval = setInterval(() => {
      if (MostrarTrayectoria) {
        obtenerDatos();
      } else if (MostrarTrabajos) {
        obtenerTrabajos();
      }
      else if(MostrarGrados){
        obtenerGrados();
      }
    }, 5000);

    // Limpia el intervalo cuando el componente se desmonta o cambia
    return () => clearInterval(interval);
  } else if (Datos.usuario.tipoUsuario === 'A') {
    obtenerDatos();
  }
}, [MostrarTrayectoria, MostrarPerfil, MostrarTrabajos, MostrarGrados]);


const obtenerDatos = async () => {
  try {
    const datos = await obtenerTrayectoria(credentials);
    setTrayectoria(datos);
  } catch (error) {
    
    // Maneja el error
   
  }
};

const obtenerTrabajos = async () => {
  try {
    const datos = await obtenerTrabajosRealizados(credentials);
    setTrabajos(datos);
  } catch (error) {
    
    // Maneja el error
   
  }
};

const obtenerGrados=async()=>{
  try{
    const Grados=await obtenerGradosAcademicos(credentials);
    setGradosAcademicos(Grados)
    //Alert.alert("Asies",Grados.opciones[0].Titulo)
    
  }catch(error){
   Alert.alert("Error",error )
    
  }
};


useEffect(() => {
  obtenerFoto();
}, [rutaFotoGuardadas]);

const obtenerFoto = async () => {
  const fileName = 'foto.jpg';
  const destinationUri = `${FileSystem.documentDirectory}${fileName}`;
  const fileInfo = await FileSystem.getInfoAsync(destinationUri);
  if (fileInfo.exists) {
    setRutaFotoGuardada(fileInfo.uri);
    console.log(rutaFotoGuardadas);
  } else {
    setRutaFotoGuardada(null);
  }
};
const eliminarFoto = async (data) => {
  try {
    // Verificar si la foto existe antes de eliminarla
    const fileInfo = await FileSystem.getInfoAsync(data);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(data);
      console.log("Foto eliminada con éxito "+data);
     
      // Actualizar la ruta de la foto guardada a null
      return setRutaFotoGuardada(null);
    } else {
      console.log("La foto no existe");
      return "";
    }
   
  } catch (error) {
    console.log("Error al eliminar la foto:", error);
  }
};


const saveImageToLocalDirectory = async (uri) => {
 
  try {
    
   
    const fileName = 'foto.jpg';
    const destinationUri = `${FileSystem.documentDirectory}${fileName}`;
    eliminarFoto(destinationUri);
    await FileSystem.copyAsync({ from: uri, to: destinationUri });
    Alert.alert('Éxito', 'La imagen se ha guardado en el directorio local.');
    setRutaFotoGuardada(destinationUri);
  } catch (error) {
    Alert.alert('Error', 'No se pudo guardar la imagen en el directorio local.');
  }
};

const handleImagePick = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  try {
    if (status !== 'granted') {
      throw new Error('Permiso denegado para acceder a la biblioteca de medios.');
    }

    const result = await ImagePicker.launchImageLibraryAsync();
     console.log(result)
    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {

        const selectedImageUri = result.assets[0].uri;
        await saveImageToLocalDirectory(selectedImageUri);
      }
    }
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};




 useEffect(() => {
    // Llama a la función obtenerDatosActualizados cada 1 segundos (1000 ms)
    const interval = setInterval(renderItems, 5000);
  
    // Limpia el intervalo cuando el componente se desmonta o cambia
    return () => clearInterval(interval);
  }, []);
 
 const renderItems = () => {
  
        
   
      const docente = {
        nombre:Datos.usuario.nombreUsuario,
        apellidoPaterno:Datos.usuario.apellidoPaUsuario,
        apellidoMaterno: Datos.usuario.apellidoMaUsuario,
        correo: Datos.usuario.correoUsuario,
        tipoUsuario:Datos.usuario.tipoUsuario
      }; 
   
         if(MostrarTrayectoria){
          if(Datos.usuario.tipoUsuario=='A'){
            items.push(
              <>
              <Text>Un administrador no tiene trayectorias weon!</Text>
              
              </>
              
                
              );
            
          }
          try{
          for (let i = 0; i < trayectoria.opciones.length; i++) {
            items.push(
              <>
              <View style={styles.card}>
                <Text style={styles.title}>{trayectoria.opciones[i].tituloParticipacion}</Text>
                
                {trayectoria.opciones[i].idTrayectoria && (
                  <Button
                    title="Más"
                    onPress={() =>
                      navigation.navigate('Trayectoria', {
                        Datos: Datos,
                        idTrayectoria: trayectoria.opciones[i].idTrayectoria,
                      })
                    }
                  />
                )}
              </View>
            </>
            
              
            );
          }
          if(trayectoria.opciones.length==0){
            items.push(
              <>
              <Text style={styles.vacio}>No existen trayectorias</Text>
              </>
              );
          }

         
        }catch(error){
          handleAuthError(error);
        }
        }
         if(MostrarPerfil){
        
            items.push(<>
            <Text style={styles.title}>Datos de perfil</Text>
           
            <Text style={styles.description}>{docente.nombre +' '+docente.apellidoPaterno+' '+docente.apellidoMaterno}</Text>
            <Text style={styles.description}>{docente.correo}</Text>
            <Text style={styles.description}>{docente.tipoUsuario==='D'?'Docente':docente.tipoUsuario==='A'?'Administrador':<></> }</Text>
          
            
            </>);

        }
         if(MostrarTrabajos){
         
          if(Datos.usuario.tipoUsuario=='A'){
            items.push(
              <>
              <Text>Un administrador no tiene Trabajos realizados weon!</Text>
              
              </>
              
                
              );
            
          }
          try{
          for (let i = 0; i < Trabajos.Trabajos.length; i++) {
            items.push(
              <>
              <View style={styles.card}>
                <Text style={styles.title}>{Trabajos.Trabajos[i].titulo}</Text>
                
                {Trabajos.Trabajos[i].id && (
                  <Button
                    title="Más"
                    onPress={() => {
                      navigation.navigate('Trabajo Realizado', {
                        Datos: Datos,
                        idTrabajos: Trabajos.Trabajos[i].id,
                      });}
                    }
                  />
                )}
              </View>
            </>
            
              
            );
          }   
          if(Trabajos.Trabajos.length==0){
            items.push(
              <>
              <Text style={styles.vacio}>No existen Trabajos</Text>
              </>
              );
          }
        }catch(error){
          handleAuthError(error);
        }
        }
        if(MostrarGrados){
         
          if(Datos.usuario.tipoUsuario=='A'){
            items.push(
              <>
              <Text>Un administrador no tiene Trabajos realizados weon!</Text>
              
              </>
              
                
              );
            
          }
          try{
          for (let i = 0; i < GradosAcademicos.opciones.length; i++) {
           
            items.push(
              <>
              <View style={styles.card}>
                <Text style={styles.title}>{GradosAcademicos.opciones[i].Titulo}</Text>
                
                {GradosAcademicos.opciones[i].id && (
                  <Button
                    title="Más"
                    onPress={() => {
                      navigation.navigate('Ver Grado', {
                        Datos: Datos, idGrado: GradosAcademicos.opciones[i].id
                        //idTrabajos: Trabajos.Trabajos[i].id,
                      });}
                    }
                  />
                )}
              </View>
            </>
            
              
            );
          }   
          if(GradosAcademicos.opciones.length==0){
            items.push(
              <>
              <Text style={styles.vacio}>No existen grados Academicos</Text>
              </>
              );
          }
        }catch(error){
          handleAuthError(error);
        }
        
        }
       
        
    


    return items;
  };

  return (
    <View style={styles.transparente}>
     <View style={styles.container}>
          <View style={styles.foto}>
         
          <TouchableOpacity onPress={handleImagePick}>
      {!rutaFotoGuardada ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Image source={{ uri: rutaFotoGuardadas }} style={styles.image} />
      )}
    </TouchableOpacity>
   
        </View>
        
        <View style={styles.mover}>
          <Button title={Datos.usuario.tipoUsuario==='D'?'Informacion Docente':Datos.usuario.tipoUsuario==='A'?'Informacion Administrador':<></> }
          onPress={() => { 
              SetMostrarPerfil(true);
              SetMostrarTrayectorias(false);
              SetMostrarTrabajos(false);
              SetMostrarGrados(false)
              }}
              titleStyle={styles.buttonText} 
              buttonStyle={styles.button} />
    
          <Button title="Trayectoria Profesional" 
          onPress={() => { 
              SetMostrarTrayectorias(true);
              SetMostrarPerfil(false);
              SetMostrarTrabajos(false);
              SetMostrarGrados(false);
              }} titleStyle={styles.buttonText} buttonStyle={styles.button}/>
    
          <Button title="Grados Academicos" 
           onPress={() => {
               SetMostrarGrados(true);
               SetMostrarPerfil(false);
               SetMostrarTrabajos(false);
               SetMostrarTrayectorias(false);
               }} titleStyle={styles.buttonText} buttonStyle={styles.button}/>
        
          <Button title="Trabajos Realizados" 
          onPress={() => { 
            SetMostrarTrabajos(true); 
            SetMostrarPerfil(false);
            SetMostrarTrayectorias(false); 
            SetMostrarGrados(false);
          }} titleStyle={styles.buttonText} buttonStyle={styles.button}/>

        </View>
        
        <ScrollView style={styles.boxContainer}>
        {MostrarTrayectoria ?  renderItems() :<></>}
        {MostrarPerfil ?  renderItems() :<></>}
        {MostrarTrabajos ?  renderItems() :<></>}
        {MostrarGrados ?  renderItems() :<></>}
        
           
        </ScrollView>
        
       </View>
       <View style={styles.buttonContainer}>
       {Datos.usuario.tipoUsuario === 'D' && (
  <>
    {MostrarTrayectoria ? (
      <>
        <TouchableOpacity style={styles.separator} onPress={() => navigation.navigate("Eliminar Trayectoria", { Datos: Datos })}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.separator} onPress={() => navigation.navigate("Agregar Trayectoria", { Datos: Datos })}>
          <Text style={styles.buttonText}>Añadir</Text>
        </TouchableOpacity>
      </>
    ) : (
      <></>
    )}

{MostrarTrabajos ? (
      <>
        <TouchableOpacity style={styles.separator} onPress={() => navigation.navigate("Eliminar Trabajos Realizados", { Datos: Datos })}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.separator} onPress={() => navigation.navigate("Agregar Trabajo Realizado", { Datos: Datos })}>
          <Text style={styles.buttonText}>Añadir</Text>
        </TouchableOpacity>
      </>
    ) : (
      <></>
    )}
  {MostrarGrados ? (
      <>
        <TouchableOpacity style={styles.separator} onPress={() => navigation.navigate("Eliminar Grados Academicos", { Datos: Datos })}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.separator} onPress={() => navigation.navigate("Agregar Grado Academico", { Datos: Datos })}>
          <Text style={styles.buttonText}>Añadir</Text>
        </TouchableOpacity>
      </>
    ) : (
      <></>
    )}
  </>
  
)}

{MostrarPerfil && Datos.usuario.tipoUsuario === 'A' && (
  <TouchableOpacity style={styles.separator} onPress={() => navigation.navigate("Editar Perfil")}>
    <Text style={styles.buttonText}>Editar</Text>
  </TouchableOpacity>
)}
        
      </View>
       
     </View>
   
  );
  
};
const styles ={
  mover:{
    top:30,
  },
  vacio:{
    color:"gray",
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
    title: {
      textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
      },
      description: {
        textAlign: 'justify',
        fontSize: 14,
        color: '#000000',
      },
    transparente: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo transparente con 50% de opacidad
      },
    foto: {
        top:-250,
        left:230,
        width: 140,
        height: 140,
        borderRadius: 80,
        overflow: 'hidden',
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
    container: {
        width: '160%',
        height: '160%',
      top:40,
      left:-150,
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
       boxContainer: {
        width: '60%',
        height: '52%',
        top: 10,
       left:-80,
        flex: 1,
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
      },
    button: {
        top: -10,
        width: '55%',
        marginTop: 10,
        backgroundColor: 'f0f1f4',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#b2b3b6',
      },
    buttonText: {
      color: '#333333',
    fontSize: 16,
    textAlign: 'center',
     
    },
    button1:{
         width: '30%',
        height: '15%',
        flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        
      },
      separator: {
        backgroundColor: '#e8e8e8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        top:-10,
        marginVertical: 10,
        marginHorizontal: 10,
      },

  };

  export default NavegadorScreen