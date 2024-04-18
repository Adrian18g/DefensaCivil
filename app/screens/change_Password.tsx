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
import { NavigationProp ,RouteProp} from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';


interface RouterProps {
  navigation: NavigationProp<any, any>;
}
type SituationsRouteParams = {
  token: string;
};

const ChangePass = ({ navigation }: RouterProps) => {
  const [clave_anterior, setClaveAnterior] = useState("");
  const [clave_nueva, setClaveNueva] = useState("");
  const [confirmar_clave, setClaveConfirmar] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const route = useRoute<RouteProp<Record<string, SituationsRouteParams>, 'changePass'>>();
  const token = route.params?.token;

  const NewPass = async () => {
    setLoading(true);
    if (clave_nueva != confirmar_clave) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("clave_anterior", clave_anterior);
      formData.append("clave_nueva", clave_nueva);

      const response = await axios.post(
        "https://adamix.net/defensa_civil/def/cambiar_clave.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(response.data);

      if (response.data.exito) {
        Alert.alert("Clave cambiada con exito.");
        return navigation.navigate("Home", {
          token: response.data.datos.token,
        });
      }
      Alert.alert(
        "Ha ocurrido un error, intente nuevamente.",
        "Error: " + response.data.error
      );
    } catch (error: any) {
      console.error(error);
      Alert.alert("Changes have failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.h1}>Cambiar Contraseña</Text>
        <TextInput
          value={clave_anterior}
          style={styles.input}
          placeholder="Clave Anterior"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text: string) => setClaveAnterior(text)}
        ></TextInput>
        <TextInput
          value={clave_nueva}
          style={styles.input}
          placeholder="Nueva Clave"
          secureTextEntry={true}
          onChangeText={(text: string) => setClaveNueva(text)}
        ></TextInput>
        <TextInput
          value={confirmar_clave}
          style={styles.input}
          placeholder="Repetir Clave"
          secureTextEntry={true}
          onChangeText={(text: string) => setClaveConfirmar(text)}>
          </TextInput>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TouchableOpacity style={styles.btn} onPress={NewPass}>
              <Text>Confirmar</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChangePass;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
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
    backgroundColor: "#F3CD58",
    color: "#fff",
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 10,
    marginLeft: 20,
    alignItems: "center",
    width: "40%",
  },
});
