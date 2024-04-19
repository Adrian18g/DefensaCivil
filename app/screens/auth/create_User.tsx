import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import axios from "axios";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const CreateUser = ({ navigation }: RouterProps) => {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [clave, setClave] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const signUp = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("cedula", cedula);
      formData.append("nombre", nombre);
      formData.append("apellido", apellido);
      formData.append("clave", clave);
      formData.append("correo", correo);
      formData.append("telefono", telefono);

      const response = await axios.post(
        "https://adamix.net/defensa_civil/def/registro.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(response.data);
      if (response.data.exito) {
        return navigation.navigate("Login");
      }
      Alert.alert("Ha ocurrido un error, intente nuevamente.",
        "Error: " + response.data.error
      );

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.h1}>Registro</Text>
        <Button title="Ya tengo una cuenta" onPress={()=>{navigation.navigate('Login')}} />
        <TextInput
          value={cedula}
          style={styles.input}
          placeholder="Cedula"
          autoCapitalize="none"
          onChangeText={(text: string) => setCedula(text)}
        ></TextInput>
        <TextInput
          value={nombre}
          style={styles.input}
          placeholder="Nombre"
          autoCapitalize="none"
          onChangeText={(text: string) => setNombre(text)}
        ></TextInput>
        <TextInput
          value={apellido}
          style={styles.input}
          placeholder="Apellido"
          autoCapitalize="none"
          onChangeText={(text: string) => setApellido(text)}
        ></TextInput>
        <TextInput
          value={clave}
          style={styles.input}
          placeholder="Contraseña"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text: string) => setClave(text)}
        ></TextInput>
        <TextInput
          value={correo}
          style={styles.input}
          placeholder="Correo Electronico"
          onChangeText={(text: string) => setCorreo(text)}
        ></TextInput>
        <TextInput
          value={telefono}
          style={styles.input}
          placeholder="Telefono"
          onChangeText={(text: string) => setTelefono(text)}
        ></TextInput>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TouchableOpacity style={styles.btn} onPress={signUp}>
              <Text>Registrate</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateUser;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },

  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  btn: {
    //centrar boton
    alignSelf: "center",
    backgroundColor: "#E23F44",
    color: "#fff",
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,

    marginVertical: 10,
    marginLeft: 20,
    alignItems: "center",
    width: "40%",
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    marginBottom: 20,
    textDecorationLine: "underline",
    //center the text
    textAlign: "center",
  },
});
