import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from "../../FirebaseConfig";


interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Inside = ({ navigation }: RouterProps) => {
    return (
        <View style={styles.container}>
            <Button title="View Services" onPress={() => navigation.navigate('Services')} />
            <Button title="Check News" onPress={() => navigation.navigate('News')} />
            <Button title="Watch Videos" onPress={() => navigation.navigate('Videos')} />
            <Button title="Specific News" onPress={() => navigation.navigate('Specific News')} />
            <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    
});

export default Inside;
