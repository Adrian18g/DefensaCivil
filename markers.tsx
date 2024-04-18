import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";

type RootStackParamList = {
  locations: {
    situaciones: any[];
  };
};

type DetailsRouteProp = RouteProp<RootStackParamList, "locations">;

type Props = {
  route: DetailsRouteProp;
  navigation: NavigationProp<any, any>;
};

export default function Markers({ route, navigation }: Props) {
  const { situaciones } = route.params;
  console.log("desde markers",situaciones);
  

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const newMarkers = situaciones.map((situacion) => {
      return {
        latitude: parseInt(situacion.latitud),
        longitude: parseInt(situacion.longitud),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
        titulo: situacion.titulo,
        estado: situacion.estado,
      };
    });

    setMarkers(newMarkers);
  }, [situaciones]);

  navigation.navigate("Map",);

  return null; // Este componente no renderiza nada visible, solo actualiza los marcadores
}
