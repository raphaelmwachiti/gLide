import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import db from "@react-native-firebase/database";

const StatusScreen = ({ route }) => {
  const { rideId } = route.params;
  const [eta, setEta] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const rideRef = db().ref(`/rides/${rideId}`);

    const onRideDataChange = (snapshot) => {
      const rideData = snapshot.val();

      if (rideData) {
        setEta(rideData.eta);
        setStatus(rideData.status);
      } else {
        // Ride doesn't exist
        setStatus("Ride hasn't started yet");
      }
    };

    rideRef.on("value", onRideDataChange);

    // Cleanup function to remove the listener
    return () => {
      rideRef.off("value", onRideDataChange);
    };
  }, [rideId]);

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{status}</Text>
      {eta !== null && <Text style={styles.etaText}>ETA: {eta} minutes</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  etaText: {
    fontSize: 20,
  },
});

export default StatusScreen;
