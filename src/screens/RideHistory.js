import React from 'react';
import { SafeAreaView } from 'react-native';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const RideHistory = ({ navigation }) => {
  const pastRides = [
    { id: 1, date: 'January 1, 2023', time: '12:03 am', location: 'From: YMCA', fare: '$10.50' },
    { id: 2, date: 'February 15, 2023', time: '11:03 am', location: 'From: Starbucks', fare: '$15.75' },
  
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>History</Text>
      <ScrollView style={styles.activityList}>
        {pastRides.map((ride) => (
          <View key={ride.id} style={styles.rideItem}>
            <View style={styles.rideDetails}>
              <Text style={styles.date}>{ride.date}</Text>
              <Text style={styles.time}>{ride.time}</Text>
              <Text style={styles.location}>{ride.location}</Text>
            </View>
            <Text style={styles.fare}>{ride.fare}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      paddingLeft: 16,
    },
    activityList: {
      flex: 1,
    },
    rideItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingVertical: 16,
    },
    rideDetails: {
      flex: 1,
      paddingLeft: 16,
      paddingRight: 16,
    },
    date: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    time: {
      color: '#888',
      marginTop: 4,
    },
    location: {
      color: '#888',
      marginTop: 4,
    },
    fare: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#2ecc71',
      marginTop: 8,
      paddingRight: 16,
    },
  });
  
export default RideHistory;
