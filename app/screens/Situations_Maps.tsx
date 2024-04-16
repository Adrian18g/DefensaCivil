import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Alert, PermissionsAndroid, ActivityIndicator } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";

interface Markers {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  titulo: string;
  estado:  string;

}

type RootStackParamList = {
  locations: {
    markers: Markers[];
  };
};

type DetailsRouteProp = RouteProp<RootStackParamList, "locations">;

type Props = {
  route: DetailsRouteProp;
};

interface Coordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export default function Situations_Map({route}:Props) {
  const requestLocationPermission = async () => {
    try {
       await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    } catch (err) {
      console.warn(err);
    }}
    if (!PermissionsAndroid.RESULTS.GRANTED) {
      requestLocationPermission();
    }
    const { markers } = route.params;
    console.log(markers);
    

  

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
      {/* <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={Initial_Regions}
        showsUserLocation = {true}
        showsMyLocationButton = {true}
        ref={mapRef}
      >
        {markers.map((marker, index) => (
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
        ))}
      </MapView> */}
    </View>
  );
}
