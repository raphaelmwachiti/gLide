import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";

const DriverScreen = ({ navigation }) => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const currentUser = auth().currentUser;

    if (currentUser) {
      const uid = currentUser.uid;
      const userRef = db().ref(`/users/${uid}/name`);

      userRef
        .once("value")
        .then((snapshot) => {
          const userName = snapshot.val();
          if (userName) {
            fetchRides(userName);
          } else {
            console.log("User name is not set in the database.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  }, []);

  const fetchRides = (userName) => {
    const ridesRef = db().ref("/rides");
  
    ridesRef
      .orderByChild("driver")
      .equalTo(userName)
      .once("value", (snapshot) => {
        const ridesData = snapshot.val();
        if (ridesData) {
          // Filter for rides where the driver is the userName and the status is Open
          const openRides = Object.keys(ridesData)
            .filter((key) => ridesData[key].status === "Open")
            .map((key) => ({
              id: key,
              ...ridesData[key],
            }));
          setRides(openRides);
        } else {
          console.log("No rides found for this driver.");
        }
      })
      .catch((error) => {
        console.error("Error fetching ride data: ", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.pageTitle}>Your Posted Rides</Text>
      </View>

      <ScrollView style={styles.rideListContainer} contentContainerStyle={styles.scrollViewContent}>
        {rides.map((ride) => (
          <View key={ride.id} style={styles.rideCard}>
            <View style={styles.rideDetails}>
              <Text style={styles.rideName}>{ride.from} - {ride.to}</Text>
                <Text style={styles.rideDetail}>Departure: {ride.timeDate} on {ride.dateTimeString}</Text>
              <Text style={styles.rideDetail}>Estimated Duration: {ride.time}h</Text>
              <Text style={styles.rideDetail}>Passenger Limit: {ride.passengerLimit}</Text>
              <Text style={styles.rideDetail}>Allow Stops: {ride.allowStops ? "Yes" : "No"}</Text>
            </View>

            <View style={styles.buttonsColumn}>
              <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditRide", {rideId: ride.id })}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>${ride.price}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.addButton, {backgroundColor: '#17920b'}]}
        onPress={() => navigation.navigate("AddEditRideScreen")}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.safetyTipsButton, {backgroundColor: 'black'}]}
        onPress={() => navigation.navigate("SafetyScreen")}
      >
        <Text style={styles.buttonText}>Safety Tips</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  searchContainer: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
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
  rideDetails: {
    flex: 1,
  },
  buttonsColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  rideName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rideDetail: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  editButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 8,
  },
  startRideButton: {
    backgroundColor: "#17920b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 8,
  },

  priceContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 3,
  },
  priceText: {
    backgroundColor: "#ECF0F1",
    borderRadius: 4,
    padding: 8,
    color: "#2C3E50",
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  safetyTipsButton: {
    padding: 20,
    backgroundColor: 'black', 
    position: 'absolute',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DriverScreen;
