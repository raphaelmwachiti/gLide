import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import db from "@react-native-firebase/database";

const InputETAScreen = ({ route, navigation }) => {
  const { rideId } = route.params;
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    // Fetch the current status from the database when the component mounts or rideId changes
    const statusRef = db().ref(`/rides/${rideId}/status`);
    statusRef.on("value", (snapshot) => {
      const status = snapshot.val();
      setCurrentStatus(status || "No status yet"); // If no status found, default to 'No status yet'
    });

    // Don't forget to unsubscribe from your real-time listener when the component unmounts
    return () => statusRef.off("value");
  }, [rideId]);

  const updateStatus = async (status) => {
    try {
      // Update status in Firebase Realtime Database
      await db().ref(`/rides/${rideId}`).update({
        status,
      });

      // Show an alert and navigate back
      Alert.alert("Success", `Status updated to "${status}".`);
      navigation.goBack();
    } catch (error) {
      console.error(`Error updating status to "${status}":`, error);
      Alert.alert(
        "Error",
        `Failed to update status to "${status}". Please try again.`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Status: {currentStatus}</Text>
      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => updateStatus("Arriving")}
      >
        <Text style={styles.buttonText}>Going to User Pick Up Location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => updateStatus("Arrived")}
      >
        <Text style={styles.buttonText}>Arrived at Pick Up Location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => updateStatus("In Progress")}
      >
        <Text style={styles.buttonText}>Ride In Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => updateStatus("Completed")}
      >
        <Text style={styles.buttonText}>Ride Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    padding: 20,
    marginTop: Platform.OS === "ios" ? 45 : 0,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  startRideButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
});

export default InputETAScreen;
