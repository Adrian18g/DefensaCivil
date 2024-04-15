import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { fetchSpecificNews } from './ApiService';

const SpecificNewsScreen: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchSpecificNews();
        setNews(data);
      } catch (error) {
        console.error('Failed to fetch specific news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Loading specific news...</Text>
      ) : (
        news.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        ))
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
