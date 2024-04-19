import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const VideosScreen: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const url = 'https://adamix.net/defensa_civil/def/videos.php';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("API Response:", data);  

       
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error('Expected an array but got:', typeof data);
          setVideos([]); 
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
        setVideos([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Loading videos...</Text>
      ) : (
        videos.length > 0 ? videos.map((video, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.title}>{video.title}</Text>
            <Text>URL: {video.url}</Text>
          </View>
        )) : <Text>No videos found.</Text>  
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

export default VideosScreen;
