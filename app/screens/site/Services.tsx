import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image } from 'react-native';

interface Service {
  id: string;
  nombre: string;
  descripcion: string;
  foto: string;
}

const ServicesScreen: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            const url = 'https://adamix.net/defensa_civil/def/servicios.php';
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.exito && Array.isArray(data.datos)) {
                    setServices(data.datos);
                } else {
                    throw new Error("Data is not in expected format or request failed");
                }
            } catch (error) {
                console.error('Failed to fetch services:', error);
                setError(error instanceof Error ? error.message : String(error));
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <ScrollView style={styles.container}>
            {services.map((service) => (
                <View key={service.id} style={styles.card}>
                    <Image source={{ uri: service.foto }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{service.nombre}</Text>
                        <Text style={styles.description}>{service.descripcion}</Text>
                    </View>
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
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textContainer: {
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
    }
});

export default ServicesScreen;