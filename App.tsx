// src/App.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Types/navigationTypes"; 
import Login from "./app/screens/Login";
import HomeScreen from "./app/screens/HomeScreen";
import Emergencies_Details from "./app/screens/Emergencies_Details";
import ServicesScreen from "./app/screens/ServicesScreen";
import NewsScreen from "./app/screens/NewsScreen";
import SpecificNewsScreen from "./app/screens/SpecificNewsScreen";
import VideosScreen from "./app/screens/VideosScreen";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, setUser);
        return () => unsubscribe(); // Clean up the subscription
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {user ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Emergencies" component={Emergencies_Details} />
                        <Stack.Screen name="Details" component={Emergencies_Details} />
                        <Stack.Screen name="Services" component={ServicesScreen} />
                        <Stack.Screen name="News" component={NewsScreen} />
                        <Stack.Screen name="SpecificNews" component={SpecificNewsScreen} />
                        <Stack.Screen name="Videos" component={VideosScreen} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
