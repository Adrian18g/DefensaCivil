import React from 'react';
import { View } from 'react-native';
import Situations from './Situations';
import { NavigationProp, RouteProp } from '@react-navigation/native';

interface RouterProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>; // Ensure RouteProp is imported
}

export default function Home({ navigation, route }: RouterProps) {
  return (
    <View style={{flex:1}}> 
      <Situations navigation={navigation}/>
    </View>
  );
}
