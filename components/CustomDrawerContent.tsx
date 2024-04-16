import React from 'react';
import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ padding: 20, backgroundColor: '#f6f6f6', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Defensa Civil</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default CustomDrawerContent;
