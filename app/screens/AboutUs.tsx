import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, Dimensions } from 'react-native';
interface Persona {
    id: number;
    nombre: string;
    foto: string;
    descripcion: string;
}

const personas: Persona[] = [
    {
        id: 1,
        nombre: 'Adrian',
        foto: './././assets/Adrian.jpeg',
        descripcion: 'Desarrollador Movil',
    },
    {
        id: 2,
        nombre: 'Oscar',
        foto: '../../assets/Oscar.jpeg',
        descripcion: 'Desarrollador Movil',
    },
    {
        id: 3,
        nombre: 'Hendrix',
        foto: '../../assets/Hendrix.jpeg',
        descripcion: 'Desarrollador Movil',
    },
    {
        id: 4,
        nombre: 'Fraylian',
        foto: '../../assets/Fraylian.jpeg',
        descripcion: 'Desarrollador Movil',
    },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

const AboutUs: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {personas.map((persona) => (
                <View key={persona.id} style={styles.card}>
                <Image source={{ uri: persona.foto }} style={styles.image} />
                <Text style={styles.name}>{persona.nombre}</Text>
                <Text style={styles.position}>{persona.descripcion}</Text>
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

export default AboutUs;
