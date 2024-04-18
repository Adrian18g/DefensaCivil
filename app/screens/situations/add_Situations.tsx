import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { RouteProp } from '@react-navigation/native';
import axios from "axios";

type RootStackParamList = {
  auth: {
    token: string;
  };
};

type AddSituationRouteProp = RouteProp<RootStackParamList, "auth">;

type Props = {
  route?: AddSituationRouteProp;
  navigation: NavigationProp<any, any>; // Define navigation prop in Props
};


const Add_Situations: React.FC<Props> = ({ route, navigation }) =>{
  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { token } = route?.params || { token: '' };
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const backAction = () => {
      confirmSaveAndExit();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const confirmSaveAndExit = () => {
    Alert.alert('Guardar Situación', '¿Desea guardar la situación?', [
      {
        text: 'Cancelar',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Sí',
        onPress: () => {
          saveSituations();
          BackHandler.exitApp();
        },
      },
    ]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = result.assets[0].base64;
      const empty = "";
      setImage(base64 ?? empty);
    }
  };

  async function saveSituations() {
    try {
      const formData = new FormData();
      formData.append("titulo", title);
      formData.append("descripcion", description);
      formData.append("foto", image);
      formData.append("latitud", latitude);
      formData.append("longitud", longitude);
      formData.append("token", token);

      const response = await axios.post(
        "https://adamix.net/defensa_civil/def/nueva_situacion.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(response.data);
      if (response.data.exito) {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          value={title}
          style={[styles.input, { flex: 1 }]}
          placeholder="Title"
          autoCapitalize="none"
          onChangeText={(text: string) => setTitle(text)}
        />

        <TouchableOpacity
          onPress={pickImage}
          style={{
            width: 44,
            height: 44,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            marginLeft: 10,
          }}
        >
          <Ionicons name="image" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TextInput
        value={latitude}
        style={styles.input}
        placeholder="Latitude"
        autoCapitalize="none"
        onChangeText={(text: string) => setLatitude(text)}
      />
      <TextInput
        value={longitude}
        style={styles.input}
        placeholder="Longitude"
        autoCapitalize="none"
        onChangeText={(text: string) => setLongitude(text)}
      />

      <TextInput
        style={styles.textarea}
        multiline={true}
        onChangeText={(text: string) => setDescription(text)}
        value={description}
        placeholder="Write here a description..."
      />
      <View style={styles.imageContainer}>
        {image ? (
          <Image
            source={{ uri: "data:image/jpeg;base64," + image }}
            style={styles.image}
          />
        ) : null}
      </View>
      <TouchableOpacity
        onPress={() => {
          saveSituations();
          setTitle("");
          setLatitude("");
          setLongitude("");
          setDescription("");
          setImage("");
        }}
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: "black",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 150,
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlignVertical: "top", // Para alinear el texto en la parte superior
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 4,
  },
});

export default Add_Situations;