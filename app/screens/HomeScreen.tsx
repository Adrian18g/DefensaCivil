import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native'; 
import { RootStackParamList } from '../../Types/navigationTypes';

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>; 

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <Text>Welcome to the Civil Defense App</Text>
            <Button title="Go to Emergencies" onPress={() => navigation.navigate('Emergencies')} />
            <Button title="View Services" onPress={() => navigation.navigate('Services')} />
            <Button title="Check News" onPress={() => navigation.navigate('News')} />
            <Button title="Watch Videos" onPress={() => navigation.navigate('Videos')} />
            <Button title="Emergency Details" onPress={() => navigation.navigate('Details')} />
            <Button title="Specific News" onPress={() => navigation.navigate('SpecificNews')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
});

export default HomeScreen;
