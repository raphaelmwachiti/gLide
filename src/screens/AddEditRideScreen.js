import React from 'react';
import { SafeAreaView } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const AddEditRideScreen = ({ navigation }) => {
  // State and logic for handling form inputs would go here

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.warningText}>This ride has 3 books editing will cancel all</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="From" />
        <TextInput style={styles.input} placeholder="To" />
        
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Allow stops:</Text>
          <TouchableOpacity style={styles.toggleButton}><Text>Yes</Text></TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton}><Text>No</Text></TouchableOpacity>
        </View>

        <TextInput style={styles.input} placeholder="Time" />
        <TextInput style={styles.input} placeholder="Passenger limit" keyboardType="numeric" />

        <View style={styles.earningsContainer}>
          <Text style={styles.earningsText}>Estimated earnings</Text>
          <Text style={styles.priceText}>5.787$</Text>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('GlideDriveTabs', { screen: 'Drive' })} >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  warningText: {
    textAlign: 'center',
    marginTop:30,
    margin: 10,
    color: 'red', 
  },
  form: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  toggleLabel: {
    fontSize: 16,
  },
  toggleButton: {
    backgroundColor: '#eee', // Change as needed
    padding: 10,
    borderRadius: 5,
  },
  earningsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f7f7f7', // Change as needed
    borderRadius: 5,
    marginBottom: 10,
  },
  earningsText: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#21d111', // Change as needed
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  safetyTipsButton: {
    padding: 15,
    backgroundColor: '#ddd', // Change as needed
    alignItems: 'center',
    marginBottom: 10,
  },
  safetyTipsText: {
    fontSize: 16,
  },
  // Add more styles as needed
});

export default AddEditRideScreen;
