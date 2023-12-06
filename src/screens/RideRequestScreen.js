import React from 'react';
import { SafeAreaView } from 'react-native';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const RideRequestScreen = ({ navigation }) => {
  const rideRequests = [
    {
      id: 1,
      passenger: 'Mugi',
      from: 'UBCO',
      stops: ['Costco', 'Nesters', 'Downtown'],
      to: 'Walmart',
      departBy: '11:11 am',
      passengers: 5,
    },
    {
        id: 2,
        passenger: 'Mugi',
        from: 'UBCO',
        stops: ['Costco', 'Nesters', 'Downtown', 'Home'],
        to: 'Walmart',
        departBy: '11:11 am',
        passengers: 5,
      },
    
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Ride requests (3)</Text>
      {/* add scrollview for this section */}
      {rideRequests.map((request) => (
        <View key={request.id} style={styles.card}>
          <Text style={styles.passengerName}>Passenger - {request.passenger}</Text>
          <Text style={styles.rideDetail}>From: {request.from}</Text>
          {request.stops.map((stop, index) => (
            <Text key={index} style={[styles.rideDetail, {marginHorizontal: 40}]}>stop: {stop}</Text>
          ))}
          <Text style={styles.rideDetail}>To: {request.to}</Text>
          <Text style={styles.rideDetail}>Depart by: {request.departBy}</Text>
          <Text style={styles.rideDetail}>Passengers: {request.passengers}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.rejectButton}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate('GlideDriveTabs', { screen: 'Drive' })}>
        <Text style={styles.buttonText}>Return to all rides </Text>
     </TouchableOpacity>
      <TouchableOpacity style={styles.safetyTipsButton} onPress={()=> navigation.navigate('SafetyScreen')}>
        <Text style={styles.safetyTipsText}>Safety tips</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 10,
    marginTop:30,
    textDecorationLine: 'underline',
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  passengerName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  rideDetail: {
    fontSize: 14,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: '#17920b', 
    padding: 10,
    borderRadius: 5,
    width: '45%'
  },
  acceptButton: {
    backgroundColor: '#17920b', 
    padding: 10,
    borderRadius: 5,
    width: '45%'
  },
  rejectButton: {
    backgroundColor: '#f54e42', 
    padding: 10,
    borderRadius: 5,
    width: '45%'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  safetyTipsButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
   
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
returnButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    width: '77%',
    marginLeft: 45,
    marginBottom: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  safetyTipsText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  
});

export default RideRequestScreen;
