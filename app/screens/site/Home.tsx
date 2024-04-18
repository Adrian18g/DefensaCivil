import React, { useRef } from 'react';
import { View, StyleSheet, Text, Animated, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const imagenes = [
  "https://www.defensacivil.gob.do/images/docs/DC-logo-2017.png",
  "https://blogger.googleusercontent.com/img/a/AVvXsEhwtjqiA2Rtik_-OhK5fZX8O5AhswC9Qkm2_jLLiTfZHy9IEJHRZ3Sy7ywTupcog-_JIC7CnOtTUmI-gWWFn3QmBp-H85noK1OuozN-XQJSz7oCeSI3tPoUqyWiKQ1b2GjaorNFXIFpmsEm9WJ08RwqyjaXuW8RfDnceP3iyNg_aYPUqxKtwkHRSLuV=s320",
  "https://presidencia.gob.do/sites/default/files/styles/large/public/news/2022-10/310690518_170442345577808_2718689553182378246_n%20%281%29.jpg?itok=4ZF7puvW",
  "https://hoy.com.do/wp-content/uploads/2022/04/Defensa-CIvil.jpeg",
  "https://noticiasmedicas.do/wp-content/uploads/2022/01/defensa-civil-rd.jpg"
];

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Home: React.FC = () => {
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
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => console.log('Image pressed')}
          >
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
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
    width: width * 0.7,
    height: height * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'cover',
    borderRadius: 10,
  }
});

export default Home;