import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { FIREBASE_AUTH } from "../../FirebaseConfig";

interface RouterProps { navigation: NavigationProp<any, any>; }

const Inside = ({navigation}: RouterProps) => {
    return (
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>

            <Button onPress={() => navigation.navigate('Emergencies')} title="Notify an Emergency" />
            <Button onPress={() => FIREBASE_AUTH.signOut()} title=" Logout" />
        </View>
            
    );
};

export default Inside;