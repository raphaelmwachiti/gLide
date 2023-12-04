import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FindRideScreen from '../screens/findRide'
import ReviewRideScreen from '../screens/ReviewRideScreen'
import DriverScreen from '../screens/DriverScreen'

// Screens
import HomeScreen from '../screens/home';
// ... other imports

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create a stack navigator for the Glide section
function GlideStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Glide" component={FindRideScreen} />
      <Stack.Screen name="ReviewRideScreen" component={ReviewRideScreen} />
      {/* ... other Glide related screens */}
    </Stack.Navigator>
  );
}

// Create a stack navigator for the Drive section
function DriveStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drive" component={DriverScreen} />
      {/* ... other Drive related screens */}
    </Stack.Navigator>
  );
}

// Bottom tab navigator that holds the main sections of the app
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Determine icon based on the route name
          // ...
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="GlideStack" component={GlideStack} />
      <Tab.Screen name="DriveStack" component={DriveStack} />
      {/* ... other tabs and stacks as needed */}
    </Tab.Navigator>
  );
}

// Export the bottom tab navigator instead of the stack navigator
export default BottomTabNavigator;
