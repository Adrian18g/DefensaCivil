import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomDrawerContent from './components/CustomDrawerContent';
import { AuthProvider, useAuth } from './context/AuthContext';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Login from "./app/screens/auth/Login";
import Home from "./app/screens/site/Home";
import Situations_Details from "./app/screens/situations/Situations_Details";
import Add_Situations from "./app/screens/situations/add_Situations";
import Situations_Maps from "./app/screens/situations/Situations_Maps";
import CreateUser from "./app/screens/auth/create_User";
import ChangePass from "./app/screens/auth/change_Password";
import Services from "./app/screens/site/Services";
import News from "./app/screens/site/News";
import Videos from "./app/screens/site/VideosScreen";
import Shelters from "./app/screens/site/Shelters";
import SafetyMeasures from "./app/screens/site/SafetyMeasures";
import Members from "./app/screens/site/Members";
import AboutUs from "./app/screens/AboutUs";
import Situations from "./app/screens/situations/Situations";
import Shelters_Map from "./app/screens/site/Shelters_Map";
import History from "./app/screens/site/History";


const Stack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Situations" component={Situations} options={{title:"Situaciones"}} />
      <Stack.Screen name="SignUp" component={CreateUser} options={{headerShown:false}} />
      <Stack.Screen name="Add_Situations" component={Add_Situations} options={{title:"Reportar Situaciones"}}  />
      <Stack.Screen name="Details" component={Situations_Details} />
      <Stack.Screen name="Map" component={Situations_Maps} options={{title:"Mapa de situaciones"}} />
      {/* <Stack.Screen name="aboutUS" component={}  /> */}
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {  
  return (
    <AuthProvider>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component={Home} options={{ title: 'Defensa Civil' }} />
        <Drawer.Screen name="Historia" component={History} options={{ title: 'Historia' }} />
        <Drawer.Screen name="Services" component={Services} options={{ title: 'Servicios' }} />
        <Drawer.Screen name="News" component={News} options={{ title: 'Noticias' }} />
        <Drawer.Screen name="Videos" component={Videos} options={{ title: 'Videos' }} />
        <Drawer.Screen name="Shelters" component={Shelters} options={{ title: 'Albergues' }} />
        <Drawer.Screen name="Shelter_Map" component={Shelters_Map} options={{title: 'Mapa de Albergues' }} />
        <Drawer.Screen name="Safety_Measures" component={SafetyMeasures} options={{ title: 'Medidas Preventivas' }} />
        <Drawer.Screen name="Members" component={Members} options={{ title: 'Miembros' }} />
        <Drawer.Screen name="AboutUs" component={AboutUs} options={{ title: 'Acerca de Nosotros' }} />
        <Drawer.Screen name="Login" component={Login} options={{ headerShown: false}} />
        <Drawer.Screen name="Situaciones" component={InsideLayout} options={{ headerShown:false }} />
        <Drawer.Screen name="changePass" component={ChangePass} options={{headerTitle:'Cambiar contraseña'}} />
      </Drawer.Navigator>
    </NavigationContainer>
  </AuthProvider>
  );
}
