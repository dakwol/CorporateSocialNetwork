import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../../screens/LoginPage/LoginPage'; 
import MainTabs from '../navigation/MainTabs';
import RegisterPage from '../../screens/RegisterPage/RegisterPage';

const Stack = createStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
