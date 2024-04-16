import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

interface Video {
  id: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  link: string;
}

const VideosScreen: React.FC = () => {
  const videos: Video[] = [
    {
      "id": "1",
      "fecha": "2022-11-08",
      "titulo": "Defensa Civil: Héroes sin capa de la Republica Dominicana",
      "descripcion": "La defensa civil ayuda mucho a la ciudadania.",
      "link": "PMW8U0SPyEo"
    },
    {
      "id": "2",
      "fecha": "2022-04-12",
      "titulo": "RCP para una persona con paro cardiorespiratorio",
      "descripcion": "“Aprendiendo a Salvar Vidas”, es una iniciativa de la Defensa Civil, que tiene como finalidad sensibilizar a la ciudadanía sobre la importancia de aprender primeros auxilios básicos, para responder a tiempo ante una emergencia que ponga en peligro la vida de las personas durante la Semana Santa.",
      "link": "66ReM0pvFLs"
    },
    {
      "id": "3",
      "fecha": "2024-03-20",
      "titulo": "Participación de la Defensa Civil en el Desfile Militar 2023",
      "descripcion": "A pesar de no ser militares, estamos presentes y ayudando, esta vez en el desfile.",
      "link": "4cfUMCdpD_g"
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {videos.map((video, index) => (
        <Card key={index} video={video} />
      ))}
    </ScrollView>
  );
};

const Card: React.FC<{ video: Video }> = ({ video }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{video.titulo}</Text>
      <Text style={styles.description}>Description: {video.descripcion}</Text>
      <View style={styles.videoContainer}>
        <YoutubePlayer
          videoId={video.link}
          width={300}
          height={180}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
  },
  videoContainer: {
    alignItems: 'center',
  }
});

export default VideosScreen;
