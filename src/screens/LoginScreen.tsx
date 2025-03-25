import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, FirebaseAuthTypes } from '@react-native-firebase/auth';import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/taskTypes';
import { getApp } from '@react-native-firebase/app';
import globalStyles from '../styles/globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const authInstance = getAuth(getApp());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user: FirebaseAuthTypes.User | null) => {
      if (user) {
        // Navigate to the MainTabs (which contains Tasks and Settings)
        navigation.replace('MainTabs');
      }
    });
    return unsubscribe;
  }, [navigation, authInstance]);

  const handleEmailPasswordLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(authInstance, email, password);
      Alert.alert("Success", "Logged in successfully!");
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={globalStyles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={globalStyles.input}
        secureTextEntry
      />

      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleEmailPasswordLogin}
        disabled={loading}
      >
        <Text style={globalStyles.buttonText}>Login with Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
