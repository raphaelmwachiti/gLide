import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import db from '@react-native-firebase/database';

const InputETAScreen = ({ route, navigation }) => {
    const { rideId } = route.params;
    const [eta, setETA] = useState('');
  
    const handleStartRide = async () => {
      if (eta.trim() === '') {
        Alert.alert('Error', 'Please enter ETA.');
        return;
      }
  
      try {
        // Update ETA and status in Firebase Realtime Database
        await db().ref(`/rides/${rideId}`).update({
          eta: parseInt(eta, 10), // Convert ETA to integer (or use parseFloat if needed)
          status: 'On the way',
        });
  
        // For demonstration purposes, show an alert and navigate back
        Alert.alert('Success', 'ETA updated successfully.');
        navigation.goBack();
      } catch (error) {
        console.error('Error updating ETA:', error);
        Alert.alert('Error', 'Failed to update ETA. Please try again.');
      }
    };
  
    const sendStatusUpdate = async (status) => {
      try {
        // Update status in Firebase Realtime Database
        await db().ref(`/rides/${rideId}`).update({
          status,
        });
  
        // For demonstration purposes, show an alert and navigate back
        Alert.alert('Success', `${status} updated successfully.`);
        navigation.goBack();
      } catch (error) {
        console.error(`Error updating ${status}:`, error);
        Alert.alert('Error', `Failed to update ${status}. Please try again.`);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Input ETA</Text>
        <TextInput
          style={styles.input}
          placeholder="ETA (in minutes)"
          keyboardType="numeric"
          value={eta}
          onChangeText={(text) => setETA(text)}
        />
        <TouchableOpacity
          style={styles.startRideButton}
          onPress={handleStartRide}
        >
          <Text style={styles.buttonText}>Start Ride</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => sendStatusUpdate('Cancelled')}
        >
          <Text style={styles.buttonText}>Cancel Ride</Text>
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  startRideButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InputETAScreen;
