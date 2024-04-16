import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Details: {
    id: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    estado: string;
    foto: string;
  };
};

type DetailsRouteProp = RouteProp<RootStackParamList, "Details">;

type Props = {
  route: DetailsRouteProp;
};

const Details: React.FC<Props> = ({ route }) => {
  const { id, titulo, descripcion, fecha, foto, estado } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.data}>{descripcion}</Text>
        <Text style={styles.label}>Fecha de reporte:</Text>
        <Text style={styles.data}>{fecha}</Text>
        <View style={styles.imageContainer}>
          {foto ? (
            <Image
              source={{ uri: "data:image/jpeg;base64," + foto }}
              style={styles.image}
            />
          ) : null}
        </View>
      </View>

      <View>
        <Text>
          Reporte No. <Text style={{ fontWeight: "bold" }}>{id}</Text>
        </Text>
        <Text>
          Estado: <Text style={{ fontWeight: "bold" }}>{estado}</Text>
        </Text>
      </View>
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
    backgroundColor: "white",
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textDecorationLine: "underline",
  },
  label: {
    fontWeight: "bold",
  },
  textarea: {
    height: 100,
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
  data: {
    marginBottom: 10,
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

export default Details;
