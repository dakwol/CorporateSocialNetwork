import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './components/app/routes/AppRoutes';

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <AppRoutes />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',  // Устанавливаем цвет фона
  },
});

export default App;
