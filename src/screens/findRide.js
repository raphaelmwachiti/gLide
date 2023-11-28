import React from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function FindRide() {
  const rides = [
    { id: 1, name: 'Lambo Urus', price: '5.787$', arriveBy: '12:03 am', rating: '2/7', color: 'silver' },
    { id: 2, name: 'Ferrari Urus', price: '5.787$', arriveBy: '11:03 am', rating: '2/7', color: 'silver' },
    // Add more rides as needed...
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Your location" style={styles.input} />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.buttonText}>Add Stop</Text>
        </TouchableOpacity>
        <TextInput placeholder="Your destination" style={styles.input} />
      </View>
      
      <View style={styles.filterContainer}>
       
      </View>
      
      <ScrollView style={styles.rideListContainer} contentContainerStyle={styles.scrollViewContent}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF', 
    },
    scrollViewContent: {
        paddingBottom: 80, 
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
      color: '#fff', 
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
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#EEE', 
      backgroundColor: '#FAFAFA',
      marginVertical: 8,
      borderWidth: 1,
      borderColor: '#DDD', 
      borderRadius: 10, 
      backgroundColor: '#FAFAFA', 
    },
    rideName: {
      fontWeight: 'bold',
      marginBottom: 5, 
    },
    rideDetail: {
      color: '#666', 
      marginBottom: 10
    },
    button: {
      backgroundColor: '#21d111', 
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignSelf: 'flex-start', 
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