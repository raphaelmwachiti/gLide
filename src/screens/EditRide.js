import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import db from "@react-native-firebase/database";

const EditRide = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { rideId } = route.params;

  const [editedRide, setEditedRide] = useState({
    from: "",
    to: "",
    time: "",
    passengerLimit: "",
    price: "",
  });

  useEffect(() => {
    const ridesRef = db().ref(`/rides/${rideId}`);
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
      }
    });
  }, [rideId]);

  const handleSaveChanges = () => {
    const ridesRef = db().ref(`/rides/${rideId}`);
    ridesRef
      .update(editedRide)
      .then(() => {
        console.log("Ride details updated successfully");
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error updating ride details: ", error);
      });
  };

  const handleDeleteRide = () => {
    // Prompt the user to confirm the deletion
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this ride?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            // Delete ride from Firebase Database
            const ridesRef = db().ref(`/rides/${rideId}`);
            ridesRef
              .remove()
              .then(() => {
                console.log("Ride deleted successfully");
                navigation.goBack();
              })
              .catch((error) => {
                console.error("Error deleting ride: ", error);
              });
          },
          style: "destructive", // Button style for iOS
        },
      ],
      { cancelable: false }
    );
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

      <TextInput
        style={styles.input}
        placeholder="To"
        value={editedRide.to}
        onChangeText={(text) => setEditedRide({ ...editedRide, to: text })}
      />

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Allow stops:</Text>
        <TouchableOpacity
          style={[styles.toggleButton, editedRide.allowStops ? styles.toggleButtonActive : null]}
          onPress={() => setEditedRide({ ...editedRide, allowStops: true })}
        >
          <Text style={[styles.toggleButtonText, editedRide.allowStops ? styles.toggleButtonTextActive : null]}>
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !editedRide.allowStops ? styles.toggleButtonActive : null]}
          onPress={() => setEditedRide({ ...editedRide, allowStops: false })}
        >
          <Text style={[styles.toggleButtonText, !editedRide.allowStops ? styles.toggleButtonTextActive : null]}>
            No
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Time"
        value={editedRide.time}
        onChangeText={(text) => setEditedRide({ ...editedRide, time: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Passenger Limit"
        keyboardType="numeric"
        value={editedRide.passengerLimit}
        onChangeText={(text) => setEditedRide({ ...editedRide, passengerLimit: text.replace(/[^0-9]/g, "") })}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={editedRide.price}
        onChangeText={(text) => setEditedRide({ ...editedRide, price: text })}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveChanges}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteRide}
      >
        <Text style={styles.buttonText}>Delete Ride</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#2C3E50",
  },
  warningText: {
    textAlign: "center",
    marginTop: 30,
    margin: 10,
    color: "red",
  },
  form: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  toggleLabel: {
    fontSize: 16,
  },
  toggleButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonActive: {
    backgroundColor: "black",
  },
  toggleButtonTextActive: {
    color: "white",
  },
  earningsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
    marginBottom: 10,
  },
  earningsText: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#21d111",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#21d111",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  safetyTipsButton: {
    padding: 15,
    backgroundColor: "#ddd",
    alignItems: "center",
    marginBottom: 10,
  },
  safetyTipsText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
});
export default EditRide;
