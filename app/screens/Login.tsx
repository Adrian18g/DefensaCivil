import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';


interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Login = ({ navigation }: RouterProps) => {
  const [cedula, setCedula] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { setToken } = useAuth();

  const signIn = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("cedula", cedula);
      formData.append("clave", clave);

      const response = await axios.post(
        "https://adamix.net/defensa_civil/def/iniciar_sesion.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(response.data);
      console.log(response.data.datos.token);
      
      if (response.data.exito) {
        setToken(response.data.datos.token);
        return navigation.navigate("Home", { token: response.data.datos.token })
      }
      Alert.alert("Ha ocurrido un error, intente nuevamente.",
        "Error: " + response.data.error
      );
    } catch (error: any) {
      console.error(error);
      Alert.alert("Signing in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.h1}>Inicio de Sesion</Text>
          <TextInput
            value={cedula}
            style={styles.input}
            placeholder="Cedula"
            autoCapitalize="none"
            onChangeText={(text: string) => setCedula(text)}
          ></TextInput>
          <TextInput
            value={clave}
            style={styles.input}
            placeholder="Clave"
            secureTextEntry={true}
            onChangeText={(text: string) => setClave(text)}
          ></TextInput>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('SignUp')}}>
                  <Text>Crear Cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={signIn}>
                  <Text>Iniciar Sesion</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    );
  };

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  h1:{
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    marginBottom: 20,
    textDecorationLine: "underline",
    //center the text
    textAlign: "center",
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
    backgroundColor: "#029EE4",
    color: "#fff",
    padding: 10,
    borderRadius: 4,
    marginVertical: 10,
    marginLeft: 20,
    alignItems: "center",
    width: "40%",
    //centrar los botones
  },
});
