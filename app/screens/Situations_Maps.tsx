import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const DEFAULT_LATITUDE_DELTA = 0.1;
const DEFAULT_LONGITUDE_DELTA = 0.1;

interface Coordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export default function Situations_Map() {
  const { token } = useAuth();

  const requestLocationPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    } catch (err) {
      console.warn(err);
    }
  };
  if (!PermissionsAndroid.RESULTS.GRANTED) {
    requestLocationPermission();
  }

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
        console.log(response.data.datos);
        setSituaciones(response.data.datos);
        console.log(situaciones);


        
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
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();

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
    Alert.alert(marker.name);
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
        {/* {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
          >
            <Callout>
              <View style={{padding:10}}>
                <Text style={{fontSize:24}}>{marker.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))} */}
      </MapView>
    </View>
  );
}
