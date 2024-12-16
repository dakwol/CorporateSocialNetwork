import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import LoginForm from '../../features/auth/ui/LoginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: { email: string, password: string }) => {
    const { email, password } = data;
    setIsLoading(true); 

    try {
      const response = await fetch('http://192.168.0.14:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const { token } = responseData;

    
        AsyncStorage.setItem('authToken', token);

      
        navigation.replace('MainTabs');
      } else {
        const errorText = await response.text();
        Alert.alert('Error', errorText); 
      }
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Error', 'An error occurred during login.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#06151F'
  },
});

export default LoginPage;
