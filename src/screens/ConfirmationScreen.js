import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import db from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

const ConfirmationScreen = ({ route, navigation }) => {
  const [ride, setRide] = useState(null);
  const { rideId } = route.params;

  useEffect(() => {
    if (rideId) {
      const rideRef = db().ref(`/rides/${rideId}`);

      rideRef
        .once("value")
        .then((snapshot) => {
          const rideData = snapshot.val();
          if (rideData) {
            setRide({ id: rideId, ...rideData });
          } else {
            console.log("Ride data not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching ride data: ", error);
        });
    }
  }, [rideId]);

  // If ride data has not been loaded yet, you can return null or a loading spinner here
  if (!ride) {
    return <Text>Loading ride details...</Text>; // Or a proper loading spinner/indicator
  }

  const confirmRide = () => {
    const currentUser = auth().currentUser;
  
    if (ride && rideId && currentUser) {
      const updates = {
        status: 'Booked',
        rider: currentUser.uid // Assuming you want to store the UID of the rider
      };
  
      db().ref(`/rides/${rideId}`).update(updates)
        .then(() => {
          // After a successful update, navigate to TrackRideScreen with the rideId
          navigation.navigate("TrackRideScreen", { rideId });
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error updating ride status: ", error);
          Alert.alert("Error", "Could not confirm the ride. Please try again.");
        });
    } else {
      // Handle the case where there is no ride, rideId, or currentUser
      Alert.alert("Error", "There was an error confirming the ride. Please make sure you're signed in and try again.");
    }
  };
  
  const { goBack } = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.backButtonSafeArea}>
          {/* Back button within SafeAreaView */}
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <AntDesign name="arrowleft" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.confirmationText}>
            Ride Information
          </Text>

          <Text style={styles.aboutTitle}>Ride Details</Text>
          <Text style={styles.aboutDetail}>From: {ride.from}</Text>
          <Text style={styles.aboutDetail}>To: {ride.to}</Text>
          <Text style={styles.aboutDetail}>Time: {ride.time}</Text>
          <Text style={styles.aboutDetail}>Driver: {ride.driver}</Text>
          <Text style={styles.aboutDetail}>Price: ${ride.price}</Text>
          <Text style={styles.aboutDetail}>Passenger Limit: {ride.passengerLimit}</Text>
          <Text style={styles.aboutDetail}>Allow Stops: {ride.allowStops ? "Yes" : "No"}</Text>
          <Text style={styles.aboutDetail}>Status: {ride.status}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.trackButton}
              onPress={confirmRide}
            >
              <Text style={styles.buttonText}> Confirm Ride</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.safetyTipsButton}
            onPress={() => navigation.navigate(SafetyScreen)}
          >
            <Text style={styles.safetyTipsText}>Safety tips</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    width: "90%",
    maxWidth: 600,
    position: 'relative',
  },
  backButtonSafeArea: {
    position: 'absolute',
    top: 20, // Adjust the top value for the SafeAreaView containing the back button
    left: 10,
    right: 10,
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
  },
  confirmationText: {
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    fontSize: 24,
    fontWeight: "bold",
  },
  titleText: {
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  profileInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 6,
  },
  profileImgClmn: {
    width: "20%",
  },
  profileDetailClmn: {
    width: "70%",
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: -20,
    borderWidth: 2,
    borderColor: "#000",
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
  },
  profileDetail: {
    fontSize: 16,
    marginBottom: 4,
  },
  aboutTitle: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  aboutDetail: {
    alignSelf: "flex-start",
    fontSize: 16,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "column",
    marginTop: 20,
    width: "100%",
    justifyContent: "space-around",
  },
  trackButton: {
    backgroundColor: "#21d111",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  safetyTipsButton: {
    marginTop: 20,
  },
  safetyTipsText: {
    fontWeight: "bold",
    color: "black",
  },
});

export default ConfirmationScreen;
