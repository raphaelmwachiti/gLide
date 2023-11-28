import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function FindRide() {
  const rides = [
    { id: 1, name: 'Lambo Urus', price: '5.787$', arriveBy: '12:03 am', rating: '2/7', color: 'silver' },
    { id: 2, name: 'Ferrari Urus', price: '5.787$', arriveBy: '11:03 am', rating: '2/7', color: 'silver' },
    // Add more rides as needed...
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Your location" style={styles.input} />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.buttonText}>Add Stop</Text>
        </TouchableOpacity>
        <TextInput placeholder="Your destination" style={styles.input} />
      </View>
      
      <View style={styles.filterContainer}>
       
      </View>
      
      <ScrollView style={styles.rideListContainer}>
        {rides.map((ride) => (
          <View key={ride.id} style={styles.rideCard}>
            <Text style={styles.rideName}>{ride.name} - {ride.price}</Text>
            <Text style={styles.rideDetail}>Arrive by: {ride.arriveBy}</Text>
            <Text style={styles.rideDetail}>Rating: {ride.rating} - {ride.color}</Text>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.safetyTipsButton}>
        <Text style={styles.buttonText}>Safety Tips</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF', 
    },
    searchContainer: {
      padding: 20, 
    },
    input: {
      borderWidth: 1,
      borderColor: '#DDD', 
      borderRadius: 5,
      padding: 10,
      marginBottom: 10, 
    },
    buttonText: {
      color: 'blue', 
      textAlign: 'center',
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#EEE', 
    },
    rideListContainer: {
      flex: 1, 
      marginTop: 10, 
    },
    rideCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#EEE', 
      backgroundColor: '#FAFAFA', 
    },
    rideName: {
      fontWeight: 'bold',
    },
    rideDetail: {
      color: '#666', 
    },
    button: {
      backgroundColor: '#FFD700', 
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    safetyTipsButton: {
      padding: 20,
      backgroundColor: '#DDDDDD', 
      position: 'absolute',
      bottom: 0,
      width: '100%',
      textAlign: 'center', 
    },
  });