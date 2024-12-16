import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import NewsList from '../../features/news/ui/NewsList';
import TaskList from '../../features/tasks/ui/TaskList';

const Tab = createMaterialTopTabNavigator();

const FeedPage = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
        tabBarIndicatorStyle: { backgroundColor: '#4CAFA1' },
        tabBarStyle: { backgroundColor: '#0F232C', paddingTop: 20 },
    }}
    >
    <Tab.Screen name="Новости" component={NewsList} />
    <Tab.Screen name="Задачи" component={TaskList} />
    </Tab.Navigator>
  );
};

export default FeedPage;
