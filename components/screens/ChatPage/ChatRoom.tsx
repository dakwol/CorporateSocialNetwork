import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ChatRoom = ({ route }) => {
  const { chatName } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: inputText },
      ]);
      setInputText(''); // Очистить поле ввода
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        style={{backgroundColor: '#06151F'}}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Введите сообщение..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Отправить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06151F',
  },
  messageList: {
    padding: 10,
  },
  messageContainer: {
    backgroundColor: '#4CAFA1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#06151F'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#4CAFA1',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#4CAFA1',
    padding: 10,
    borderRadius: 25,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatRoom;
