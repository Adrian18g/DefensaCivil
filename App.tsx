import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import Inside from "./app/screens/Inside";
import ServicesScreen from "./app/screens/ServicesScreen";
import NewsScreen from "./app/screens/NewsScreen";
import SpecificNewsScreen from "./app/screens/SpecificNewsScreen";
import VideosScreen from "./app/screens/VideosScreen";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { AuthProvider } from './context/AuthContext';
import CustomDrawerContent from './components/CustomDrawerContent';
import SheltersScreen from './app/screens/SheltersScreen';
import SafetyMeasuresScreen from './app/screens/SafetyMeasuresScreen';
import MembersScreen from './app/screens/MembersScreen';

// Dentro del Drawer.Navigator, agrega la pantalla para mostrar los miembros


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [shelters, setShelters] = useState<any[]>([]); // Estado para almacenar la lista de albergues

    useEffect(() => {
        return onAuthStateChanged(FIREBASE_AUTH, setUser);
    }, []);

    useEffect(() => {
        // Función para obtener la lista de albergues
        const fetchShelters = async () => {
            try {
                const response = await fetch('https://adamix.net/defensa_civil/def/albergues.php');
                const data = await response.json();
                setShelters(data);
            } catch (error) {
                console.error('Error fetching shelters:', error);
            }
        };

        fetchShelters(); // Llamar a la función al montar el componente
    }, []);

    return (
        <AuthProvider>
            <NavigationContainer>
                {user ? (
                    <Drawer.Navigator 
                      initialRouteName="Home"
                      drawerContent={props => <CustomDrawerContent {...props} />}
                    >
                        <Drawer.Screen name="Home" component={Inside} options={{ headerShown: false }} />
                        <Drawer.Screen name="Services" component={ServicesScreen} />
                        <Drawer.Screen name="News" component={NewsScreen} />
                        <Drawer.Screen name="Specific News" component={SpecificNewsScreen} />
                        <Drawer.Screen name="Videos" component={VideosScreen} />
                        {/* Agregar pantalla para mostrar la lista de albergues */}
                        <Drawer.Screen name="Shelters" component={SheltersScreen} initialParams={{ shelters }} />
                        <Drawer.Screen name="Medidas Preventivas" component={SafetyMeasuresScreen} initialParams={{ shelters }} />
                        <Drawer.Screen name="Members" component={MembersScreen} />



                    </Drawer.Navigator>
                ) : (
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </AuthProvider>
    );
}
