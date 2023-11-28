import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTabBar from '../components/CustomTabBar'
import FindRideScreen from '../screens/findRide'
import DriverScreen from '../screens/DriverScreen'

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function GlideDriveTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Glide" component={FindRideScreen} />
      <Tab.Screen name="Drive" component={DriverScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="GlideDriveTabs" 
        component={GlideDriveTabs}
        options={{ headerShown: false }} 
      />
    
    </Stack.Navigator>
  );
}

export default AppNavigator;
