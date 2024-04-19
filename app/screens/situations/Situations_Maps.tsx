import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  PermissionsAndroid,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";


interface Coordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Situation {
  latitud: string;
  longitud: string;
  titulo: string;
  id: string;
  descripcion: string;
  fecha: string;
  estado: string;
  foto: string;
}

export default function Situations_Map() {
  const [markers, setMarkers] = useState<
    {
      latitude: number;
      longitude: number;
      titulo: string;
      id: string;
      descripcion: string;
      fecha: string;
      estado: string;
      foto: string;
    }[]
  >([]);
  const { token } = useAuth();

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
        const newMarkers = response.data.datos.map((situacion: Situation) => ({
          latitude: parseFloat(situacion.latitud),
          longitude: parseFloat(situacion.longitud),
          titulo: situacion.titulo,
          id: situacion.id,
          descripcion: situacion.descripcion,
          fecha: situacion.fecha,
          estado: situacion.estado,
          foto: situacion.foto,
        }));
        setMarkers(newMarkers);
      } catch (error: any) {
        console.error(error);
        Alert.alert("An error has occurred: " + error.message);
      }
    };

    fetchData();
  }, [token]);

  const Initial_Regions: Coordinates = {
    // Coordenadas de la Ciudad de Santo Domingo Republica Dominicana
    latitude: 18.4861,
    longitude: -69.9312,
    latitudeDelta: 0.101,
    longitudeDelta: 0.101,
  };

  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

  const focusMap = () => {
    mapRef.current?.animateToRegion(Initial_Regions, 1000);
  };
  

  return (
    <View style={{ flex: 1 }}>
      <Text>Map</Text>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={Initial_Regions}
        showsUserLocation={true}
        showsMyLocationButton={true}
        ref={mapRef}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          >
            <Callout>
              <View style={{padding:10}}>
              <Text style={{fontSize:14}}>{marker.titulo}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
