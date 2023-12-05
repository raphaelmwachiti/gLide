import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome!</Text>
      <Text style={styles.subText}>Will you be Gliding or Driving?</Text>
      <TouchableOpacity
        style={styles.glideButton}
        onPress={() => navigation.navigate('GlideDriveTabs', { screen: 'Glide' })}
      >
      
        <Text style={styles.buttonText}>👤 Glide</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.driveButton}
        onPress={() => navigation.navigate('GlideDriveTabs', { screen: 'Drive' })}
      >
        
        <Text style={styles.buttonText}>🚗 Drive</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  greeting: {
    fontSize: 32,
    marginBottom: 10,
    color: '#333',
  },
  subText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  glideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#21d111', 
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    elevation: 3,
  },
  driveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black', 
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
  },
});

export default HomeScreen;
