import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator, Text, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginForm = ({ onSubmit, isLoading }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (email && password) {
      onSubmit({ email, password });
    } else {
      Alert.alert('Ошибка', 'Заполните все поля');
    }
  };

  return (
    <ImageBackground
      source={require('../../../../assets/news.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', fontSize: 40, marginBottom: 50, fontWeight: '700', color: '#63BDB5' }}>KSS</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Пароль"
          secureTextEntry
          style={styles.input}
        />
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={{ marginBottom: 12, marginTop: 30 }}>
            <TouchableOpacity
                  style={{backgroundColor: '#0F232C', padding: 10}}
                  onPress={handleSubmit}
                >
                  <Text style={{textAlign: 'center', color: '#4CAFA1'}}>Вход</Text>
                </TouchableOpacity>
          </View>
        )}
          <TouchableOpacity
              style={{backgroundColor: '#0F232C', padding: 10}}
              onPress={() => navigation.navigate('Register')}
            >
            <Text style={{textAlign: 'center', color: '#4CAFA1'}}>Регистрация</Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 16,
    backgroundColor: '#06151F',
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#63BDB5',
    padding: 8,
    marginBottom: 12,
  },
});

export default LoginForm;
