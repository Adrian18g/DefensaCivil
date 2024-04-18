import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import axios from "axios";

type SituationsRouteParams = {
  User: {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    token: string;
  };
  };

type UserRouteProp = RouteProp<SituationsRouteParams, "User">;
type Props = {
  route: UserRouteProp;
  navigation: NavigationProp<any, any>;
};


const Situations= ({navigation, route}:Props) =>{ // Add navigation prop to Situations component
  const [loading, setLoading] = useState<boolean>(true);
  const { id, nombre,apellido,correo,telefono,token } = route.params;
  
  const [situaciones, setSituaciones] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append("token", token);
        const response = await axios.post(
          "https://adamix.net/defensa_civil/def/situaciones.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSituaciones(response.data.datos);
        
        setLoading(false);
      } catch (error: any) {
        console.error(error);
        Alert.alert("An error has occurred: " + error.message);
      }
    };

    fetchData();
  }, [token]);


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
        <TouchableOpacity onPress={() => navigation.navigate('changePass', { token: token })}>
          <View style={{ padding: 10, flexDirection: "row" }}>
            <Text>Change Password</Text>
            <Ionicons name="key" size={24} color="black" />
          </View>
          </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('Map',
          {situaciones: situaciones}
        )}>
          <View style={{ padding: 10, flexDirection: "row" }}>
            <Text>Map</Text>
            <Ionicons name="location" size={24} color="black" />
          </View>
        </TouchableOpacity>
        </>
      ),
    });
  }, []);
  

  return (
    
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
            {situaciones.length === 0 ? (
                <Text style={styles.noDataText}>No data to display</Text>
            ) : (
                <FlatList
                data={situaciones}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                        navigation.navigate("Details", {
                        id: item.id,
                        titulo: item.titulo,
                        descripcion: item.descripcion,
                        fecha: item.fecha,
                        estado: item.estado,
                        comment: item.comentario,
                        foto: item.foto,
                        })
                    }
                    >
                    <View>
                        <Text style={styles.title}>{item.titulo}</Text>
                        <Text style={styles.fecha}>{item.fecha}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                    </TouchableOpacity>
                )}
                />
            )}
        </>
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("Add_Situations", { token: token })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fecha: {
    fontSize: 14,
    color: "#666",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Situations;
