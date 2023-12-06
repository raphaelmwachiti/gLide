import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import db from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

const fetchRideData = async (rideId, setRide) => {
  try {
    const snapshot = await db().ref(`/rides/${rideId}`).once("value");
    const rideData = snapshot.val();
    if (rideData) {
      setRide({ id: rideId, ...rideData });
    } else {
      console.log("Ride data not found.");
    }
  } catch (error) {
    console.error("Error fetching ride data: ", error);
  }
};

const ConfirmationScreen = ({ route, navigation }) => {
  const [ride, setRide] = useState(null);
  const [riderName, setRiderName] = useState("");
  const { rideId } = route.params;
  const { goBack } = useNavigation();

  useEffect(() => {
    fetchRideData(rideId, setRide);
  }, [rideId]);

  useEffect(() => {
    // Fetch the rider's name as soon as the component mounts
    const currentUser = auth().currentUser;

    if (currentUser) {
      const uid = currentUser.uid;
      db()
        .ref(`/users/${uid}/name`)
        .once("value")
        .then((snapshot) => {
          const userName = snapshot.val();
          if (userName) {
            setRiderName(userName); // Store the rider's name in state
          } else {
            console.log("User name is not set in the database.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  }, []);

  const confirmRide = () => {
    // Only attempt to confirm the ride if the riderName has been set
    if (ride && rideId && riderName) {
      const updates = {
        status: "Booked",
        rider: riderName, // Use the rider's name from state
      };

      db()
        .ref(`/rides/${rideId}`)
        .update(updates)
        .then(() => {
          navigation.navigate("TrackRideScreen", { rideId });
        })
        .catch((error) => {
          console.error("Error updating ride status: ", error);
          Alert.alert("Error", "Could not confirm the ride. Please try again.");
        });
    } else {
      Alert.alert(
        "Error",
        "There was an error confirming the ride. Please make sure you're signed in and try again."
      );
    }
  };

  if (!ride) {
    return <Text>Loading ride details...</Text>;
  }

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
          <Text style={styles.confirmationText}>Ride Information</Text>

          <Text style={styles.aboutTitle}>Ride Details: {ride.from} - {ride.to}</Text>
          <Text style={styles.aboutDetail}>Price: ${ride.price}</Text>
          <Text style={styles.aboutDetail}>Departure: {ride.timeDate} on {ride.dateTimeString} </Text>
          <Text style={styles.aboutDetail}>Estimated Time for Trip: {ride.time}</Text>
          <Text style={styles.aboutDetail}>Passenger Limit: {ride.passengerLimit}</Text>
          <Text style={styles.aboutDetail}>Allow Stops: {ride.allowStops ? "Yes" : "No"}</Text>
          <Text style={styles.aboutDetail}>Driver: {ride.driver}</Text>
          {/* <Text style={styles.aboutDetail}>Status: {ride.status}</Text> */}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.trackButton} onPress={confirmRide}>
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
    backgroundColor: "#fff",
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
    position: "relative",
  },
  backButtonSafeArea: {
    position: "absolute",
    top: 20, // Adjust the top value for the SafeAreaView containing the back button
    left: 10,
    right: 10,
    zIndex: 1,
  },
  backButton: {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 1,
  },
  confirmationText: {
    marginBottom: 20,
    textAlign: "center",
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
