// App.tsx
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

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        return onAuthStateChanged(FIREBASE_AUTH, setUser);
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

