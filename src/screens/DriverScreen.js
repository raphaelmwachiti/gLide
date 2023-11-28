import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const DriverScreen = () => {
  // Replace with your state management and data fetching logic
  const rides = [
    // Sample data structure
    {
      id: 1,
      from: 'home',
      to: 'UBCO',
      time: '11:11 am',
      price: '5.787$',
      status: 'in-progress', // could be 'in-progress', 'pending', or 'requested'
      passengerLimit: 4,
    },
    // ... more rides
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {/* Tab buttons will go here if you're not using a library like react-navigation */}
      </View>
      <ScrollView style={styles.scrollView}>
        {rides.map((ride) => (
          <View key={ride.id} style={styles.rideContainer}>
            <View style={styles.rideDetails}>
              <Text style={styles.rideText}>From: {ride.from}</Text>
              <Text style={styles.rideText}>To: {ride.to}</Text>
              <Text style={styles.rideText}>Time: {ride.time}</Text>
              <Text style={styles.rideText}>Passenger (limit): {ride.passengerLimit}</Text>
              <Text style={styles.priceText}>{ride.price}</Text>
              <Text style={styles.statusText}>{ride.status}</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Review</Text>
              </TouchableOpacity>
              {ride.status === 'requested' && (
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
              )}
              {/* Other buttons based on status */}
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.buttonText}>Add Ride</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.safetyButton}>
        <Text style={styles.buttonText}>Safety tips</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  tabContainer: {
    flexDirection: 'row',
 
  },
  scrollView: {
 
  },
  rideContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  
  },
  rideDetails: {

  },
  rideText: {
    fontSize: 16,
    marginBottom: 4,

  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
 
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#21d111', 
  
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    
  },
  safetyButton: {
    position: 'absolute',
    bottom: 10, 
    alignSelf: 'center',
  },
});

export default DriverScreen;
