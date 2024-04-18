import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/auth/Login";
import Home from "./app/screens/site/Home";
import Situations_Details from "./app/screens/situations/Situations_Details";
import { useEffect, useState } from "react";
import Add_Situations from "./app/screens/situations/add_Situations";
import Situations_Maps from "./app/screens/situations/Situations_Maps";
import CreateUser from "./app/screens/auth/create_User";
import ChangePass from "./app/screens/auth/change_Password";
import Markers from "./markers";
import Services from "./app/screens/site/Services";
import News from "./app/screens/site/News";
import Videos from "./app/screens/site/VideosScreen";
import Shelter from "./app/screens/site/Shelter";
import SafetyMeasures from "./app/screens/site/SafetyMeasures";
import Members from "./app/screens/site/Members";
import AboutUs from "./app/screens/AboutUs";



const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={AboutUs} options={{headerShown:false}} />
      <Stack.Screen name="SignUp" component={CreateUser} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
            name="Initial"
            component={InsideLayout}
            options={{ headerShown: false,  }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
