import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator } from 'react-native';

interface ShelterItem {
  ciudad: string;
  codigo: string;
  edificio: string;
  coordinador: string;
  telefono: string;
  capacidad: string;
  lat: string;
  lng: string;
}

const SheltersScreen = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ShelterItem[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const url = 'https://adamix.net/defensa_civil/def/albergues.php';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.exito && Array.isArray(result.datos)) {
          setData(result.datos);
        } else {
          throw new Error("Data is not in expected format or request failed");
        }
      } catch (error) {
        console.error('Failed to fetch members:', error);
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  const renderItem = ({ item }: { item: ShelterItem }) => (
    <View style={styles.item}>
      <Text>{item.ciudad}</Text>
      <Text>{item.edificio}</Text>
      <Text>{item.coordinador}</Text>
      <Text>{item.telefono}</Text>
      <Text>{item.lat}</Text>
      <Text>{item.lng}</Text>
      <Text>{item.capacidad}</Text>
    </View>
  );

  const filteredData = data.filter(item =>
    item.ciudad.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Albergues disponibles: {filteredData.length}
      </Text>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.codigo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
  },
  item: {
    backgroundColor: 'lightblue',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  header:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

export default SheltersScreen;