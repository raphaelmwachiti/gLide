import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import SafetyScreen from './SafetyScreen';
import db from "@react-native-firebase/database";

const TrackRideScreen = ({ route, navigation }) => {
    const [ride, setRide] = useState(null);
    const { rideId } = route.params;

  useEffect(() => {
    const rideRef = db().ref(`/rides/${rideId}`);
    rideRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setRide(data);
    });

    // Don't forget to unsubscribe from your real-time listener on unmount
    return () => rideRef.off('value');
  }, [rideId]);

  if (!ride) {
    return <Text>Loading ride details...</Text>; // Or a proper loading spinner/indicator
  }



  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <Text style={styles.titleText}>Thank you, you're ride has been confirmed! </Text>

        <View style={styles.profileInfo}> 
        <View style={styles.profileDetailClmn}> 
            <Text style={styles.profileName}>{ride.from} - {ride.to}</Text>
            <Text style={styles.profileDetail}>Price: ${ride.price}</Text>
            <Text style={styles.profileDetail}>Departure: {ride.timeDate} on {ride.dateTimeString} </Text>
            <Text style={styles.profileDetail}>Estimated Time for Trip: {ride.time}</Text>
            <Text style={styles.profileDetail}>Passenger Limit: {ride.passengerLimit}</Text>
            <Text style={styles.profileDetail}>Allow Stops: {ride.allowStops ? "Yes" : "No"}</Text>
            <Text style={styles.profileDetail}>Driver: {ride.driver}</Text>
          </View>
        </View>

          <TouchableOpacity style={styles.safetyTipsButton} onPress={() => navigation.navigate(SafetyScreen)}>
            <Text style={styles.safetyTipsText}>Safety tips</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.rideHistoryButton}
              onPress={() => navigation.navigate('GlideDriveTabs', { screen: 'Glide' })}
            >
              <Text style={styles.rideHistory}>Back to Home Screen</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rideHistoryButton: {
    backgroundColor: '#17920b', // Choose a color that fits your app's design
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  rideHistory: {
    color: '#ffffff',
    fontSize: 16,
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: 250,
    width: '100%',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    width: '90%',
    maxWidth: 600,
    position: 'relative',
  },
  homeButtonSafeArea: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  homeButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
  },
  homeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  profileImgClmn: {
    width: '20%',
  },
  profileDetailClmn: {
    width: '70%',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 60,
    marginLeft: -20,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
  },
  profileDetail: {
    fontSize: 16,
    marginBottom: 4,
  },
  aboutTitle: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 20,
  },
  aboutDetail: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
  cancelButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  shareButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  trackButton: {
    backgroundColor: '#17920b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  safetyTipsButton: {
    marginTop: 10,
  },
  safetyTipsText: {
    fontWeight: 'bold',
    color: '#17920b',
  },
});

export default TrackRideScreen;
