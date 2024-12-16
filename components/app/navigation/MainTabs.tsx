import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import FeedPage from '../../screens/FeedPage/FeedPage';
import ChatPage from '../../screens/ChatPage/ChatPage';
import ProfilePage from '../../screens/ProfilePage/ProfilePage';
import NewsPage from '../../screens/Admin/NewsPage';
import UsersPage from '../../screens/Admin/UserPage';
import CreateNewsPage from '../../features/admin/adminNewsList/ui/CreateNewsPage';
import { View } from 'react-native'; // Import View

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const isAdmin = true; // Set this based on your logic for checking if the user is an admin

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Лента') {
            iconName = focused ? 'view-list' : 'view-list';
          } else if (route.name === 'Профиль') {
            iconName = focused ? 'account-circle' : 'account-circle';
          } else if (route.name === 'Чаты') {
            iconName = focused ? 'chat' : 'chat';
          } else if (route.name === 'AdminUsers') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'AdminNews') {
            iconName = focused ? 'announcement' : 'announcement';
          } else if (route.name === 'CreateAdminNews') {
            iconName = focused ? 'create' : 'create';
          }

          // Scale the icon when it is focused (active tab)
          const iconSize = focused ? size * 1.3 : size;

          return (
            <View
              style={{
                alignItems: 'center', 
                justifyContent: 'center', 
                width: focused ? 50 : 'auto',
                height: focused ? 50 : 'auto', 
                borderRadius: 50,
                backgroundColor: focused ? '#0F232C' : 'transparent', 
                padding: focused ? 5 : 0,
                transform: focused ? [{ translateY: -10 }] : [{ translateY: 0 }],
              }}
            >
              <MaterialIcons
                name={iconName}
                size={iconSize}
                color={color}
              />
            </View>
          );
        },
        tabBarActiveTintColor: '#4CAFA1', // Active tab color
        tabBarInactiveTintColor: '#fff', // Inactive tab color
        tabBarStyle: {
          backgroundColor: '#0F232C', // Background color of the tab bar
          borderTopWidth: 0,
          height: 80, // Increase height of the tab bar
          paddingBottom: 10, // Adjust for some bottom padding
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Лента" component={FeedPage} />
      <Tab.Screen name="Чаты" component={ChatPage} />
      <Tab.Screen name="Профиль" component={ProfilePage} />
      {isAdmin && (
        <Tab.Screen
          name="AdminUsers"
          component={UsersPage}
          options={{ tabBarLabel: 'Пользователи' }}
        />
      )}
      {isAdmin && (
        <Tab.Screen
          name="AdminNews"
          component={NewsPage}
          options={{ tabBarLabel: 'Новости' }}
        />
      )}
      {isAdmin && (
        <Tab.Screen
          name="CreateAdminNews"
          component={CreateNewsPage}
          options={{ tabBarLabel: 'Создание новости' }}
        />
      )}
    </Tab.Navigator>
  );
};

export default MainTabs;
