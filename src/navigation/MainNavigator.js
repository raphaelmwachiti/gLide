import React, { useState, useEffect } from 'react';
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
function GlideBottomTabNavigator({ setShowTopNav }) {
  return (
    <GlideBottomTab.Navigator>
      <GlideBottomTab.Screen name="FindRide">
        {(props) => <FindRideScreen {...props} setShowTopNav={setShowTopNav} />}
      </GlideBottomTab.Screen>

      <GlideBottomTab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
      <GlideBottomTab.Screen name="RideHistory" component={RideHistory} options={{ headerShown: false }} />
      {/* Add icons and other configurations as needed */}
    </GlideBottomTab.Navigator>
  );
}

// Define your DriveBottomTabNavigator with screens specific to Drive
function DriveBottomTabNavigator({ setShowTopNav }) {
  return (
    <DriveBottomTab.Navigator>
      <DriveBottomTab.Screen name="Home">
        {(props) => <DriverScreen {...props} setShowTopNav={setShowTopNav} />}
      </DriveBottomTab.Screen>
      <DriveBottomTab.Screen name="RideRequest" component={RideRequestScreen} options={{ headerShown: false }} />
      {/* Add icons and other configurations as needed */}
    </DriveBottomTab.Navigator>
  );
}

// Top Bar Navigator that switches between Glide and Drive
function TopBarNavigator() {
  const [showTopNav, setShowTopNav] = useState(false);
  return (
<TopTab.Navigator tabBar={(props) => <CustomTabBar {...props} showTopNav={showTopNav} />} >
      <TopTab.Screen name="Glide">
        {() => <GlideBottomTabNavigator setShowTopNav={setShowTopNav} />}
      </TopTab.Screen>
      <TopTab.Screen name="Drive">
        {() => <DriveBottomTabNavigator setShowTopNav={setShowTopNav} />}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
}


// Main Navigator that holds the Top Bar and Bottom Bar Navigators
function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName='Register'>
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
        name="GlideDriveTabs"
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