import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

interface Video {
  id: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  link: string;
}

const VideosScreen: React.FC = () => {

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const url = 'https://adamix.net/defensa_civil/def/videos.php';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.exito && Array.isArray(result.datos)) {
          setVideos(result.datos);
        } else {
          throw new Error("Data is not in expected format or request failed");
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

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
    marginVertical: 40,
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