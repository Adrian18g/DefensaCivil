import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Button } from 'react-native';
import { FIREBASE_AUTH } from "../../FirebaseConfig";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Inside = ({ navigation }: RouterProps) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="View Services" onPress={() => navigation.navigate('Services')} />
            <Button title="Check News" onPress={() => navigation.navigate('News')} />
            <Button title="Watch Videos" onPress={() => navigation.navigate('Videos')} />
            <Button title="Specific News" onPress={() => navigation.navigate('SpecificNews')} />
            <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
        </View>
    );
};

export default Inside;
