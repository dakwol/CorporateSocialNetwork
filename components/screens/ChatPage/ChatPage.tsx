import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatList from '../../features/chats/ui/ChatList';
import ChatRoom from './ChatRoom';

const Stack = createStackNavigator();

const ChatPage = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0F232C',
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{ title: 'Чаты' }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({ route }) => ({
          title: route.params.chatName,
        })}
      />
    </Stack.Navigator>
  );
};

export default ChatPage;
