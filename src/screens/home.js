import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>Will you be Gliding or Driving?</Text>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('GlideDriveTabs', { screen: 'Glide' })}
        >
          <Text style={styles.buttonText}>Glide</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('GlideDriveTabs', { screen: 'Drive' })}
        >
          <Text style={styles.buttonText}>Drive</Text>
        </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', 
  },
  greeting: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black', 
  },
  customButton: {
    backgroundColor: '#21d111', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '60%',
  },
  buttonText: {
    color: '#fff', 
    textAlign: 'center',
    fontSize: 18,
  },
});

export default HomeScreen;
