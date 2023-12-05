import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';


import AddEditRideScreen from '../screens/AddEditRideScreen';
import RideRequestScreen from '../screens/RideRequestScreen';
import ChatScreen from '../screens/ChatScreen';
import ReviewRideScreen from '../screens/ReviewRideScreen';
import FindRideScreen from '../screens/findRide';
import DriverScreen from '../screens/DriverScreen';
import CustomTabBar from '../components/CustomTabBar'
import ConfirmationScreen from '../screens/ConfirmationScreen'
import TrackRideScreen from '../screens/TrackRideScreen'
import RegisterScreen from '../screens/RegisterScreen';
import LogInScreen from '../screens/LogScreen';
import HomeScreen from '../screens/home';
import SafetyScreen from '../screens/SafetyScreen';
import RideHistory from '../screens/RideHistory';


const GlideBottomTab = createBottomTabNavigator();
const DriveBottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// Define your GlideBottomTabNavigator with screens specific to Glide
function GlideBottomTabNavigator() {
  return (
    <GlideBottomTab.Navigator>
      <GlideBottomTab.Screen name="FindRide" component={FindRideScreen} options={{ headerShown: false }} />
      <GlideBottomTab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
      <GlideBottomTab.Screen name="ReviewRide" component={ReviewRideScreen} options={{ headerShown: false }} />
      {/* Add icons and other configurations as needed */}
    </GlideBottomTab.Navigator>
  );
}

// Define your DriveBottomTabNavigator with screens specific to Drive
function DriveBottomTabNavigator() {
  return (
    <DriveBottomTab.Navigator>
      <DriveBottomTab.Screen name="Home" component={DriverScreen} options={{ headerShown: false }}/>
      <DriveBottomTab.Screen name="RideRequest" component={RideRequestScreen} options={{ headerShown: false }} />
      {/* Add icons and other configurations as needed */}
    </DriveBottomTab.Navigator>
  );
}

// Top Bar Navigator that switches between Glide and Drive
function TopBarNavigator() {
  return (
    <TopTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <TopTab.Screen name="Glide" component={GlideBottomTabNavigator} />
      <TopTab.Screen name="Drive" component={DriveBottomTabNavigator} />
    </TopTab.Navigator>
  );
}

// Main Navigator that holds the Top Bar and Bottom Bar Navigators
function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={TopBarNavigator} options={{ headerShown: false }} />
      {/* Other screens can be added here if needed */}
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LogIn"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainNavigator"
        component={MainNavigator}
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
        name="SafetyScreen"
        component={SafetyScreen}
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

export default MainNavigator;