// MembersScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';

interface Member {
  id: string;
  foto: string;
  nombre: string;
  cargo: string;
}

const MembersScreen: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const url = 'https://adamix.net/defensa_civil/def/miembros.php';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.exito && Array.isArray(result.datos)) {
          setMembers(result.datos);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {members.map((member) => (
        <View key={member.id} style={styles.card}>
          <Image source={{ uri: member.foto }} style={styles.image} />
          <Text style={styles.name}>{member.nombre}</Text>
          <Text style={styles.position}>{member.cargo}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 40,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  position: {
    fontSize: 16,
  },
});

export default MembersScreen;