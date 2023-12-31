import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import db from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

export default function FindRide({ navigation }) {
  const [rides, setRides] = useState([]);
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const handleSearch = () => {
    // Implement your search logic here using the 'location' and 'destination' values
    // For example, you can filter the 'rides' array based on the search criteria
    const filteredRides = rides.filter((ride) => {
      // Adjust the condition based on your requirements
      return ride.from.toLowerCase().includes(location.toLowerCase()) &&
             ride.to.toLowerCase().includes(destination.toLowerCase());
    });

    // Update the 'rides' state with the filtered results
    setRides(filteredRides);
  };

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      const userRef = db().ref(`/users/${user.uid}/name`);
      userRef.once("value").then((snapshot) => {
        setCurrentUser(snapshot.val()); // This will contain the user's name
      });
    }
  }, []);

  useEffect(() => {
    const ridesRef = db().ref("/rides");
  
    const onValueChange = ridesRef.on(
      "value",
      (snapshot) => {
        const ridesData = snapshot.val();
        if (ridesData) {
          const filteredRidesArray = Object.keys(ridesData)
            .map((key) => {
              const ride = { id: key, ...ridesData[key] };
              // Exclude rides where the current user is the driver
              return ride.status === "Open" && ride.driver !== currentUser ? ride : null;
            })
            .filter(Boolean); // This will filter out any `null` entries from the array
          setRides(filteredRidesArray);
        } else {
          setRides([]);
        }
      },
      (error) => {
        console.error("Error fetching ride data: ", error);
      }
    );
  
    // Clean up the listener when the component unmounts
    return () => ridesRef.off("value", onValueChange);
  }, [currentUser]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Text style={styles.pageTitle}>Find Your Ride!</Text>
        <View style={styles.searchInputContainer}>
        <TextInput
          placeholder="Your location"
          style={styles.input}
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <TextInput
          placeholder="Your destination"
          style={styles.input}
          value={destination}
          onChangeText={(text) => setDestination(text)}
        />
        </View>
        <TouchableOpacity style={styles.searchButton}  onPress={handleSearch}>
          <Text style={[styles.buttonText, { color: "#FFF" }]}>
            Search Rides
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.rideListContainer}
        contentContainerStyle={styles.scrollViewContent}
      >
        {rides.map((ride) => (
          <View key={ride.id} style={styles.rideCard}>
            <Image
              source={require("../assets/pp.jpg")}
              style={styles.profilePic}
            />
            <View style={styles.rideDetails}>
              <View style={styles.row}>
                <Text style={styles.heading}>
                  {ride.from} - {ride.to}{" "}
                </Text>
              </View>
              <Text style={[styles.rideInfo, styles.priceText]}>
                Price: ${ride.price}
              </Text>
              <Text style={styles.rideInfo}>Scheduled: {ride.timeDate} on {ride.dateTimeString}</Text>
              <Text style={styles.rideInfo}>
                Passenger Limit: {ride.passengerLimit}
              </Text>
              <Text style={styles.rideInfo}>
                Allow Stops: {ride.allowStops ? "Yes" : "No"}
              </Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() =>
                  navigation.navigate("ConfirmationScreen", { rideId: ride.id })
                }
              >
                <MaterialIcons name="directions-car" size={24} color="#FFF" />
                <Text style={[styles.buttonText, { marginLeft: 8 }]}>Book</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.safetyTipsButton}
        onPress={() => navigation.navigate("SafetyScreen")}
      >
        <Text style={[styles.buttonText, { color: "#FFF" }]}>Safety Tips</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F9",
  },
  searchContainer: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchInputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#ECF0F1",
  },
  searchButton: {
    backgroundColor: "black", // Bright green color
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  rideListContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    elevation: 3,
  },
  rideCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#BDC3C7",
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  heading: {
    fontSize: 16,
    fontWeight: "900",
    color: "black",
    marginRight: 8,
  },
  rideName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  rideInfo: {
    fontSize: 16,
    color: "#7F8C8D",
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: "column", // Changed to column layout
    alignItems: "center",
    marginTop: 8, // Added margin to separate the buttons
  },
  bookButton: {
    flexDirection: "row",
    backgroundColor: "#17920b",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  reviewButton: {
    flexDirection: "row",
    backgroundColor: "black",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8, // Added margin to separate the buttons
    alignItems: "center",
  },
  safetyTipsButton: {
    padding: 20,
    backgroundColor: "black", // Green color
    position: "absolute",
    bottom: 0,
    width: "100%",
    textAlign: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceText: {
    fontWeight: "bold",
    color: "black",
  },
});
