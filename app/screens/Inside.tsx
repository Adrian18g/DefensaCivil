import React, { useRef } from 'react';
import { View, StyleSheet, Text, Animated, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const imagenes = [
  "https://i.pinimg.com/564x/c4/d1/d1/c4d1d1242729d84a0b5c4b4d98ae27b4.jpg",
  "https://i.pinimg.com/564x/4c/43/d1/4c43d1389bcd37ab01c6a4d2ac1cdd31.jpg",
  "https://i.pinimg.com/564x/a2/76/3a/a2763ac30c322a4ddf65b28aa84780b4.jpg",
];

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Inside: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="menu"
        size={30}
        style={styles.menuIcon}
        onPress={() => navigation.openDrawer()}
      />
      <Animated.FlatList
        data={imagenes}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  imageContainer: {
    width: width,
    height: height * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.75,
    resizeMode: 'cover',
    borderRadius: 20,
  }
});

export default Inside;
