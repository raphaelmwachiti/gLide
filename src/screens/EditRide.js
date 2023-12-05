import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import db from "@react-native-firebase/database";

const EditRide = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { rides } = route.params; // Assuming you pass the ride ID instead

  const [editedRide, setEditedRide] = useState({
    from: "",
    to: "",
    time: "",
    passengerLimit: "",
    price: "",
  });

  useEffect(() => {
    // Fetch ride details from the database using rideId
    const ridesRef = db().ref(`/rides/${rides}`);
    ridesRef.once("value", (snapshot) => {
      const rideData = snapshot.val();
      if (rideData) {
        setEditedRide({
          from: rideData.from,
          to: rideData.to,
          time: rideData.time,
          passengerLimit: rideData.passengerLimit,
          price: rideData.price,
        });
      } else {
        console.log("Ride not found in the database");
        // Handle the case when the ride is not found
      }
    });
  }, [rides]);

  const handleSaveChanges = () => {
    // Update the ride details in the database
    const ridesRef = db().ref(`/rides/${rides}`);
    ridesRef
      .update(editedRide)
      .then(() => {
        console.log("Ride details updated successfully");
        navigation.goBack(); // Navigate back to DriverScreen
      })
      .catch((error) => {
        console.error("Error updating ride details: ", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Edit Ride</Text>

      <TextInput
        style={styles.input}
        placeholder="From"
        value={editedRide.from}
        onChangeText={(text) => setEditedRide({ ...editedRide, from: text })}
      />

      {/* Add similar TextInput components for other ride details... */}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveChanges}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#21d111",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EditRide;
