import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { Stack, IconButton } from "@react-native-material/core";
import { useRoute } from '@react-navigation/native';
import { Buffer } from 'buffer';



import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function HomeScreen({ navigation }) {
  const route = useRoute();
 const { Datos } = route.params;

 return (
  <View style={styles.container}>
    <View >
      <View style={styles.buttonContainer}>
      <IconButton 
        icon={(props) => (
          <Icon
            name="account"
            size={30}
            {...props}
          />
        )}
        onPress={() => navigation.navigate("Menu", { Datos: Datos })}
        
      />
       <Text style={styles.buttonText}>Perfil</Text></View>
      
       <View style={styles.buttonContainer}>
      <IconButton 
        icon={(props) => <Icon name="clock" {...props} />}
       
      /> 
      <Text style={styles.buttonText}>Horario</Text>
      
       </View>
      
    </View>
    <View >
    <View style={styles.buttonContainer} >
      <IconButton 
        icon={(props) => (
          <Icon
            name="account-search"
            {...props}
          />
        )}
        onPress={()=> navigation.navigate("Temas de Interes",{ Datos:Datos})}
       
      />
        <Text style={styles.buttonText}>Temas de interes</Text>
      </View>


       <View style={styles.buttonContainer}>
      <IconButton 
        icon={(props) => (
          <Icon
            name="publish"
            {...props}
          />
        )}
        onPress={() => navigation.navigate("Publicaciones",{ Datos:Datos})}
       
      />
        <Text style={styles.buttonText}>Publicaciones</Text>
      </View>
    </View>
  </View>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    left:10,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    right: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    top:200,
   
    paddingHorizontal: 60,
  },
  buttonContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    borderRadius: 10,
    marginVertical: 10,
    marginRight:20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    marginTop: 5,
    fontSize: 12,
  },
});
