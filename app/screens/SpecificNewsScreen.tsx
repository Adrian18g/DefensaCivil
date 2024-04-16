import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';

interface NewsItem {
  titulo: string;
  contenido: string;
}

const SpecificNewsScreen: React.FC = () => {
  const { token } = useAuth(); 
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecificNews = async () => {
      if (!token) {
        const errorMsg = "No token provided.";
        Alert.alert("Error", errorMsg);
        setError(errorMsg);
        setLoading(false);
        return;
      }

      const url = `https://cors-anywhere.herokuapp.com/https://adamix.net/defensa_civil/def/noticias_especificas.php`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.exito) {
          setNews(data.datos);
        } else {
          throw new Error(data.mensaje);
        }
      } catch (error: any) { 
        setError(error.toString());
        Alert.alert("Error", error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchSpecificNews();
  }, [token]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <ScrollView style={styles.container}>
      {news.length > 0 ? (
        news.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.title}>{item.titulo}</Text>
            <Text>{item.contenido}</Text>
          </View>
        ))
      ) : (
        <Text>No specific news found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default SpecificNewsScreen;
