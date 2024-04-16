import React from 'react';
import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps, DrawerItem  } from '@react-navigation/drawer';
import { FIREBASE_AUTH } from "../FirebaseConfig";

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ padding: 20, backgroundColor: '#f6f6f6', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Defensa Civil</Text>
            </View>
            <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Cerrar Sesión" onPress={() => FIREBASE_AUTH.signOut()} />
    </DrawerContentScrollView>
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;








