import React from 'react';
import { Image, View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function FindRide({ navigation }) {
  const rides = [
    { id: 1, name: 'Lambo Urus', price: '5.787$', arriveBy: '12:03 am', rating: '2/7', color: 'silver' },
    { id: 2, name: 'Ferrari Urus', price: '5.787$', arriveBy: '11:03 am', rating: '2/7', color: 'silver' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.pageTitle}>Find Your Ride</Text>
        <View style={styles.searchInputContainer}>
          <TextInput placeholder="Your location" style={styles.input} />
          <TextInput placeholder="Your destination" style={styles.input} />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={() => {}}>
          <Text style={[styles.buttonText, { color: '#FFF' }]}>Search Rides</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.rideListContainer} contentContainerStyle={styles.scrollViewContent}>
        {rides.map((ride) => (
          <View key={ride.id} style={styles.rideCard}>
            <Image source={require('../assets/pp.jpg')} style={styles.profilePic} />
            <View style={styles.rideDetails}>
              <Text style={styles.rideName}>{ride.name}</Text>
              <Text style={styles.rideInfo}>Price: {ride.price}</Text>
              <Text style={styles.rideInfo}>Arrive by: {ride.arriveBy}</Text>
              <Text style={styles.rideInfo}>Rating: {ride.rating} - {ride.color}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('ConfirmationScreen')}>
                <MaterialIcons name="directions-car" size={24} color="#FFF" />
                <Text style={[styles.buttonText, { marginLeft: 8 }]}>Book</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reviewButton} onPress={() => navigation.navigate('ReviewRideScreen')}>
                <MaterialIcons name="star" size={24} color="#FFD700" />
                <Text style={[styles.buttonText, { marginLeft: 8 }]}>Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.safetyTipsButton} onPress={() => navigation.navigate('SafetyScreen')}>
        <Text style={[styles.buttonText, { color: '#FFF' }]}>Safety Tips</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
  },
  searchContainer: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  searchInputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#ECF0F1',
  },
  searchButton: {
    backgroundColor: '#21d111' ,// Bright green color
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'white',
  },
  rideListContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    elevation: 3,
  },
  rideCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#BDC3C7',
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  rideDetails: {
    flex: 1,
    marginLeft: 16,
  },
  rideName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rideInfo: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'column', // Changed to column layout
    alignItems: 'center',
    marginTop: 8, // Added margin to separate the buttons
  },
  bookButton: {
    flexDirection: 'row',
    backgroundColor: '#E74C3C',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  reviewButton: {
    flexDirection: 'row',
    backgroundColor: '#3498DB',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8, // Added margin to separate the buttons
    alignItems: 'center',
    
  },
  safetyTipsButton: {
    padding: 20,
    backgroundColor: '#21d111', // Green color
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
