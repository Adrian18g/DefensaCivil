import React, {useState} from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Button, TextInput, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;


    const signIn = async () => {
        setLoading(true);
        try {
          const response = await signInWithEmailAndPassword(auth, email, password);
          console.log(response);
        } catch (error:any) {
          console.error(error);
          alert("Signing in failed: " + error.message);
        } finally {
          setLoading(false);
        }
      };
    
      const signUp = async () => {
        setLoading(true);
        try {
          const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log(response);
          alert("Checks your emails!");
        } catch (error:any) {
          console.error(error);
          alert("Create account failed: " + error.message);
        } finally {
          setLoading(false);
        }
      };

    return (
        <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
        <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text: string) => setEmail(text)}
        ></TextInput>
        <TextInput
            value={password}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
        ></TextInput>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Login" onPress={signIn} />
          <Button title="Create Account" onPress={signUp} />
        </>
      )}
        </KeyboardAvoidingView>
    </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      flex: 1,
      justifyContent: "center",
    },
  
    input: {
      marginVertical: 4,
      height: 50,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor: "#fff",
    },
  });