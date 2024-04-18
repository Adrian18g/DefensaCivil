import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface Coordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface ShelterItem {
  ciudad: string;
  codigo: string;
  edificio: string;
  coordinador: string;
  telefono: string;
  capacidad: string;
  lat: string;
  lng: string;
}

export default function Shelters_Map() {
  const [markers, setMarkers] = useState<
    {
      ciudad: string;
      codigo: string;
      edificio: string;
      coordinador: string;
      telefono: string;
      capacidad: string;
      lat: number;
      lng: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const url = "https://adamix.net/defensa_civil/def/albergues.php";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        if (result.exito && Array.isArray(result.datos)) {
          const newMarkers = result.datos.map((shelter: ShelterItem) => ({
            lat: parseFloat(shelter.lng),
            lng: parseFloat(shelter.lat),
            codigo: shelter.codigo,
            ciudad: shelter.ciudad,
            edificio: shelter.edificio,
            coordinador: shelter.coordinador,
            telefono: shelter.telefono,
            capacidad: shelter.capacidad,
          }));
          setMarkers(newMarkers);
        } else {
          throw new Error("Data is not in expected format or request failed");
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };

    fetchMembers();
  }, []);

  const Initial_Regions: Coordinates = {
    // Coordenadas de la Ciudad de Santo Domingo Republica Dominicana
    latitude: 18.478360,
    longitude: -69.901083,
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
  const onMarkerPress = (marker: any) => {
    Alert.alert(
      `${marker.ciudad} No.${marker.codigo}`,
      `Edificio: ${marker.edificio}\nCoordinador: ${marker.coordinador}\nTelefono: ${marker.telefono}\nCapacidad: ${marker.capacidad}`
    );
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
              latitude: marker.lat ,
              longitude: marker.lng,
            }}
          >
            <Callout onPress={ () =>onMarkerPress(marker)}>
              <View style={{padding:10}}>
              <Text style={{fontSize:14}}>{marker.edificio}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
