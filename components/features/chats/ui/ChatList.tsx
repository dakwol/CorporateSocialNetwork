import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MOCK_CHATS = [
  { id: '1', name: 'Иван Иванов', lastMessage: 'Привет! Как дела?', time: '12:34' },
  { id: '2', name: 'Мария Петрова', lastMessage: 'Завтра встреча в 10:00', time: '08:15' },
  { id: '3', name: 'Общий чат', lastMessage: 'Все готовы к презентации?', time: 'Вчера' },
];

const ChatList = () => {
  const navigation = useNavigation();

  const openChat = (chatName) => {
    navigation.navigate('ChatRoom', { chatName });
  };

  return (
    <FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        style={{backgroundColor: '#06151F'}}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={() => openChat(item.name)}>
            <View style={styles.chatItem}>
               <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                <Image
                    style={{width: 50, height: 50, borderRadius: 50}}
                    source={require('../../../../assets/news.jpg')}
                  />
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.lastMessage}>{item.lastMessage}</Text>
                </View>
               </View>
               
              <Text style={styles.time}>{item.time}</Text>
            </View>
        </TouchableOpacity>
        )}
    />
    );
};

const styles = StyleSheet.create({
chatItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#4CAFA1',
},
name: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#fff',
},
lastMessage: {
  fontSize: 14,
  color: '#4CAFA1',
},
time: {
  fontSize: 12,
  color: '#4CAFA1',
},
});

export default ChatList;
