import React, { useState } from 'react';
import { TextInput, Button, View, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as MediaLibrary from 'expo-media-library';

const Emergencies: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState<{ uri: string | null }>({ uri: null });
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handlePhotoChange = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
        } else {
            launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    if (response.assets && response.assets[0].uri) {
                        const source = { uri: response.assets[0].uri };
                        setPhoto(source);
                    }
                }
            });
        }
    };

    return (
        <View>
            <TextInput
                value={title}
                onChangeText={(text: string) => setTitle(text)}
                placeholder="Title"
            />
            <TextInput
                value={description}
                onChangeText={(text: string) => setDescription(text)}
                placeholder="Description"
            />
            <Button title="Select Photo" onPress={handlePhotoChange} />
            <TextInput
                value={latitude}
                onChangeText={(text: string) => setLatitude(text)}
                placeholder="Latitude"
            />
            <TextInput
                value={longitude}
                onChangeText={(text: string) => setLongitude(text)}
                placeholder="Longitude"
            />
            <Button title="Submit" onPress={() => {}} />
        </View>
    );
};

export default Emergencies;