import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const RegisterPage = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
    const response = await fetch('http://192.168.0.14:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
        }),
    });
        
      const result = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        reset();
        navigation.navigate('Login'); // Перейти к экрану логина
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error registering user');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>

      <Text style={styles.label}>Имя пользователя</Text>
      <Controller
        control={control}
        name="username"
        rules={{ required: 'username is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              placeholder="Имя"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />
        <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput  
              style={[styles.input, error && styles.errorInput]}
              placeholder="Email"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>Пароль</Text>
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              placeholder="Enter password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>Подтверждение пароля</Text>
      <Controller
        control={control}
        name="confirmPassword"
        rules={{ required: 'Confirm Password is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              placeholder="Подтверждение пароля"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

       <TouchableOpacity
          style={{backgroundColor: '#0F232C', padding: 10, marginTop: 20}}
          onPress={handleSubmit(onSubmit)}
        >
        <Text style={{textAlign: 'center', color: '#4CAFA1'}}>Регистрация</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20,     backgroundColor: '#06151F', height: '100%', paddingTop: 120 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#4CAFA1' },
  label: { marginTop: 10, fontSize: 16, color: '#4CAFA1' },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#4CAFA1'
  },
  errorInput: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginBottom: 10 },
});

export default RegisterPage;
