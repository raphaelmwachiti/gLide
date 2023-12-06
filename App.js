import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <MainNavigator />
    </NavigationContainer>
  );
}
