import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTabBar from '../components/CustomTabBar'
import FindRideScreen from '../screens/findRide'
import DriverScreen from '../screens/DriverScreen'
import ReviewRideScreen from '../screens/ReviewRideScreen'
import ConfirmationScreen from '../screens/ConfirmationScreen'
import TrackRideScreen from '../screens/TrackRideScreen'
import AddEditRideScreen from '../screens/AddEditRideScreen'
import RideRequestScreen from '../screens/RideRequestScreen'
import ChatScreen from '../screens/ChatScreen'
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import RideHistory from '../screens/RideHistory'

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
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
      name='login'
      component={LoginScreen}
      options={{headerShown:false}}/>
      <Stack.Screen
      name='SignUp'
      component={SignupScreen}
      options={{headerShown:false}}/>

      


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
      <Stack.Screen 
        name="ReviewRideScreen" 
        component={ReviewRideScreen}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen 
        name="ConfirmationScreen" 
        component={ConfirmationScreen}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen 
        name="TrackRideScreen" 
        component={TrackRideScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddEditRideScreen" 
        component={AddEditRideScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="RideRequestScreen" 
        component={RideRequestScreen}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen 
        name="ChatScreen" 
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="RideHistory" 
        component={RideHistory}
        options={{ headerShown: false }}
      />
    
    </Stack.Navigator>
  );
}

export default AppNavigator;
