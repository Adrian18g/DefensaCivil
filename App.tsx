import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import Inside from "./app/screens/Inside";
import ServicesScreen from "./app/screens/ServicesScreen";
import NewsScreen from "./app/screens/NewsScreen";
import SpecificNewsScreen from "./app/screens/SpecificNewsScreen";
import VideosScreen from "./app/screens/VideosScreen";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        return onAuthStateChanged(FIREBASE_AUTH, setUser);
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {user ? (
                    <>
                        <Stack.Screen name="Home" component={Inside} options={{ headerShown: false }}/>
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
