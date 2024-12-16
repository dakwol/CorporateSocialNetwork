import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const CreateNewsPage = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateNews = async () => {
    if (!title || !content) {
      Alert.alert('Ошибка!', 'Заполните поля');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.14:5000/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to create news');
      }

      Alert.alert('Удачно', 'Новость создана');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Заголовок</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите заголовок"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Контент</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите контент"
        value={content}
        onChangeText={setContent}
        multiline
      />

        <TouchableOpacity
          style={{backgroundColor: '#0F232C', padding: 10, borderRadius: 12, marginTop: 20}}
          onPress={handleCreateNews}
        >
          <Text style={{textAlign: 'center', color: '#fff'}}>Создать новость</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#06151F',
    height: '100%',
    paddingTop: 300
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#4CAFA1'
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#4CAFA1',
    color: '#06151F',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
});

export default CreateNewsPage;
