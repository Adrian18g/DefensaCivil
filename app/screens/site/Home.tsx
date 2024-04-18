import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

const imagenes = [
  "https://blogger.googleusercontent.com/img/a/AVvXsEhwtjqiA2Rtik_-OhK5fZX8O5AhswC9Qkm2_jLLiTfZHy9IEJHRZ3Sy7ywTupcog-_JIC7CnOtTUmI-gWWFn3QmBp-H85noK1OuozN-XQJSz7oCeSI3tPoUqyWiKQ1b2GjaorNFXIFpmsEm9WJ08RwqyjaXuW8RfDnceP3iyNg_aYPUqxKtwkHRSLuV=s320",
  "https://noticiasmedicas.do/wp-content/uploads/2022/01/defensa-civil-rd.jpg",
  "https://www.defensacivil.gob.do/images/docs/DC-logo-2017.png",
  "https://presidencia.gob.do/sites/default/files/styles/large/public/news/2022-10/310690518_170442345577808_2718689553182378246_n%20%281%29.jpg?itok=4ZF7puvW",
  "https://hoy.com.do/wp-content/uploads/2022/04/Defensa-CIvil.jpeg",
];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Home: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcons
          name="menu"
          size={30}
          style={styles.menuIcon}
          onPress={() => navigation.openDrawer()}
        />
      ),
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
      <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 20,
            textDecorationLine: "underline",
          }}
        >
          Bienvenidos a la Defensa Civil
        </Text>
        <Animated.FlatList
          data={imagenes}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => console.log("Image pressed")}
            >
              <Image source={{ uri: item }} style={styles.image} />
            </TouchableOpacity>
          )}
        />
        <View style={styles.card}>
          <Text style={{padding: 6, textAlign: 'justify'}}>
            La Defensa Civil tiene por objetivo principal asegurar que los
            operativos del país sean adecuados para los perjuicios que se
            originen por los desastres causados por inundación, terremoto,
            tormenta, huracán, fuego, escasez o distribución deficiente de
            suministro de materiales, u otros motivos similares, y en general
            para proveer el orden, salud y bienestar económico, seguridad
            pública, preservación de la vida y de la propiedad.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  menuIcon: {
    display: "none",
  },
  imageContainer: {
    width: width * 0.6,
    height: height * 0.4,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
});

export default Home;
