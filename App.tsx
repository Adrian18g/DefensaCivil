import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import Home from "./app/screens/Home";
import Situations_Details from "./app/screens/Situations_Details";
import { useEffect, useState } from "react";
import Add_Situations from "./app/screens/add_Situations";
import Situations_Maps from "./app/screens/Situations_Maps";
import CreateUser from "./app/screens/create_User";
import ChangePass from "./app/screens/change_Password";
import Markers from "./markers";
import { AuthProvider } from './context/AuthContext';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      <Stack.Screen name="SignUp" component={CreateUser} options={{headerShown:false}} />
      <Stack.Screen name="Home" component={Home} options={{title:"Situaciones"}} />
      <Stack.Screen name="Add_Situations" component={Add_Situations} options={{title:"Reportar Situaciones"}}  />
      <Stack.Screen name="Details" component={Situations_Details} />
      <Stack.Screen name="Map" component={Situations_Maps} options={{title:"Mapa de situaciones"}} />
      <Stack.Screen name="changePass" component={ChangePass} options={{headerTitle:'Cambiar contraseña'}} />
      <Stack.Screen name="markers" component={Markers}  />
      {/* <Stack.Screen name="aboutUS" component={}  /> */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
            name="Initial"
            component={InsideLayout}
            options={{ headerShown: false,  }}
          />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
