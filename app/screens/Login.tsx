import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, ActivityIndicator, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { setToken } = useAuth();

    const signIn = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const token = await userCredential.user.getIdToken();
            setToken(token);
            console.log("Logged in with token:", token);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error);
                alert("Signing in failed: " + error.message);
            } else {
                console.error("An unexpected error occurred:", error);
                alert("Signing in failed due to an unexpected error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
                ) : (
                    <Button title="Login" onPress={signIn} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '80%',
        maxWidth: 400,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginVertical: 10,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    loadingIndicator: {
        marginTop: 10,
    },
});

export default Login;
