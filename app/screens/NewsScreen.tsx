import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';

interface NewsItem {
  id: string;
  fecha: string;
  titulo: string;
  contenido: string;
  foto: string;
}

const NewsScreen: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const url = 'https://adamix.net/defensa_civil/def/noticias.php';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.exito && Array.isArray(result.datos)) {
          setNews(result.datos);
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
      {news.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.title}>{item.titulo}</Text>
          <Text style={styles.date}>{item.fecha}</Text>
          <Image source={{ uri: item.foto }} style={styles.image} />
          <Text style={styles.content}>{item.contenido}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  }
});

export default NewsScreen;
