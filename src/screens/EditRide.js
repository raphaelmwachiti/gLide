import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import db from "@react-native-firebase/database";
import DatePicker from "react-native-date-picker";

const EditRide = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { rideId } = route.params;

  const [editedRide, setEditedRide] = useState({
    from: "",
    to: "",
    time: "",
    date: new Date(),
    passengerLimit: "",
    price: "",
  });

  useEffect(() => {
    const ridesRef = db().ref(`/rides/${rideId}`);
    ridesRef.once("value", (snapshot) => {
      const rideData = snapshot.val();
      if (rideData) {
        const dateTime = new Date(rideData.timeDate); // Use the appropriate property here
        const dateTimeString1 = `${dateTime.toISOString().split("T")[0]} ${
          rideData.time
        }`;
        const dateTimeString = dateTimeString1.substring(0, 10);

        setEditedRide({
          from: rideData.from,
          to: rideData.to,
          date: new Date(), // Set a new date value here
          time: rideData.time,
          passengerLimit: rideData.passengerLimit,
          price: rideData.price,
          timeDate: rideData.timeDate,
          dateTimeString: dateTimeString,
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
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Edit Ride</Text>
        <TouchableOpacity style={styles.backButton}></TouchableOpacity>
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
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={editedRide.price}
          onChangeText={(text) => setEditedRide({ ...editedRide, price: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Departure Time (24h format)"
          value={editedRide.timeDate} // Extracting time from the time field
          onChangeText={(text) =>
            setEditedRide({ ...editedRide, timeDate: text })
          }
        />
         <TextInput
          style={styles.input}
          placeholder="Estimated Duration"
          value={editedRide.time}
          onChangeText={(text) => setEditedRide({ ...editedRide, time: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Passenger Limit"
          keyboardType="numeric"
          value={editedRide.passengerLimit}
          onChangeText={(text) =>
            setEditedRide({
              ...editedRide,
              passengerLimit: text.replace(/[^0-9]/g, ""),
            })
          }
        />
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Allow stops:</Text>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              editedRide.allowStops ? styles.toggleButtonActive : null,
            ]}
            onPress={() => setEditedRide({ ...editedRide, allowStops: true })}
          >
            <Text
              style={[
                styles.toggleButtonText,
                editedRide.allowStops ? styles.toggleButtonTextActive : null,
              ]}
            >
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              !editedRide.allowStops ? styles.toggleButtonActive : null,
            ]}
            onPress={() => setEditedRide({ ...editedRide, allowStops: false })}
          >
            <Text
              style={[
                styles.toggleButtonText,
                !editedRide.allowStops ? styles.toggleButtonTextActive : null,
              ]}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteRide}
        >
          <Text style={styles.buttonText}>Delete Ride</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#2C3E50",
    paddingLeft: 16,
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
    backgroundColor: "#17920b",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#17920b",
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
  datePickerContainer: {
    alignItems: "center",
    marginTop: 20, // Add some margin from the top
  },
  datePickerLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  datePicker: {
    width: 250, // Adjust the width as needed
    height: 40,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },

  backButton: {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 1,
  },
});
export default EditRide;
