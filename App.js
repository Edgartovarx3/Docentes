import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavegadorScreen from './src/components/Screens/NavegadorScreen';
import ProfileScreen from './src/components/Screens/ProfileScreen';
import TrayectoriaScreen from './src/components/Screens/TrayectoriaScreen';
import DetallesTrayectoriaScreen from './src/components/Screens/DetallesTrayectoriaScreen';
import EliminarTrayectoriaScreen from './src/components/Screens/EliminarTrayectoriaScreen ';
import PublicacionesScreen from './src/components/Screens/PublicacionesScreen';
import HomeScreen from './src/components/Screens/HomeScreen';
import VisualizacionTrabajosScreen from './src/components/Screens/VisualizacionTrabajosScreen';
import TemainteresVITScreen from './src/components/Screens/TemainteresVITScreen';
import AddTemainteresScreen from './src/components/Screens/AddTemaInteresScreen';
import AddPublicacionScreen from './src/components/Screens/AddPublicacionScreen';
import AddTrabajosRealizadosScreen from './src/components/Screens/AddTrabajosRealizadosScreen';
import AddDocumentoScreen from './src/components/Screens/AddDocumentoScreen';
import fetchPDFData from './src/components/Screens/fetchPDFData';




const Stack=createStackNavigator();
function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name=" login" component= {Ejemplo}/> 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component= {NavegadorScreen}/>
        <Stack.Screen name="Editar Perfil" component= {ProfileScreen}/>
        <Stack.Screen name="Agregar Trayectoria" component= {TrayectoriaScreen}/>
        <Stack.Screen name="Trayectoria" component= {DetallesTrayectoriaScreen}/>
        <Stack.Screen name="Eliminar Trayectoria" component= {EliminarTrayectoriaScreen}/>
        <Stack.Screen name="Publicaciones" component= {PublicacionesScreen}/>
        <Stack.Screen name="Agregar Publicacion" component= {AddPublicacionScreen}/>
        <Stack.Screen name="Agregar Trabajo Realizado" component= {AddTrabajosRealizadosScreen}/>
        <Stack.Screen name="Trabajo Realizado" component= {VisualizacionTrabajosScreen}/>
        <Stack.Screen name="Temas de Interes" component= {TemainteresVITScreen}/>
        <Stack.Screen name="Agregar Tema" component= {AddTemainteresScreen}/>
        <Stack.Screen name="Subir Documento" component= {AddDocumentoScreen}/>
        <Stack.Screen name="Visualizador" component= {fetchPDFData}/>
        
       
        
        </Stack.Navigator>
      </NavigationContainer>
  );
}
export default App;
