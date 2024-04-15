import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const ServicesScreen: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const url = 'https://adamix.net/defensa_civil/def/servicios.php';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Loading services...</Text>
      ) : (
        services.map((service, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.title}>{service.title}</Text>
            <Text>{service.description}</Text>
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

export default ServicesScreen;
