import React from 'react';
import { Image, View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import SafetyScreen from './SafetyScreen';

export default function FindRide({ navigation }) {
  const rides = [
    { id: 1, name: 'Lambo Urus', price: '5.787$', arriveBy: '12:03 am', rating: '2/7', color: 'silver' },
    { id: 2, name: 'Ferrari Urus', price: '5.787$', arriveBy: '11:03 am', rating: '2/7', color: 'silver' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Your location" style={styles.input} />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Add Stop</Text>
        </TouchableOpacity>
        <TextInput placeholder="Your destination" style={styles.input} />
      </View>
      
      <View style={styles.filterContainer}>
       
      </View>
      <View> 
        <Text style ={{ paddingLeft:10, fontWeight: 'bold', textDecorationLine: 'underline', marginTop: 10,}} > Avaliable rides (pick one) </Text>
      </View>
      <ScrollView style={styles.rideListContainer} contentContainerStyle={styles.scrollViewContent}>
        {rides.map((ride) => (
          <View key={ride.id} style={styles.rideCard}>
                <View style={styles.profileColumn}>
                    <Image
                    source={require('../assets/pp.jpg')} 
                    style={styles.profilePic}
                    />
                </View>
                <View style={styles.detailsColumn}>
                    <Text style={styles.rideName}>{ride.name} - {ride.price}</Text>
                    <Text style={styles.rideDetail}>Arrive by: {ride.arriveBy}</Text>
                    <Text style={styles.rideDetail}>Rating: {ride.rating} - {ride.color}</Text>
                </View>
                <View style={styles.buttonsColumn}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReviewRideScreen')}>
                        <Text style={styles.buttonText}>Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ConfirmationScreen')}>
                    <Text style={styles.buttonText}>Book</Text>
                    </TouchableOpacity>
                </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.safetyTipsButton} onPress={()=>navigation.navigate(SafetyScreen)}>
        <Text style={[styles.buttonText, {color: '#000'}]}>Safety Tips</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF', 
    },
    scrollViewContent: {
        paddingBottom: 80, 
      },
    searchContainer: {
      padding: 20, 
    },
    input: {
      borderWidth: 1,
      borderColor: '#DDD', 
      borderRadius: 5,
      padding: 10,
      marginBottom: 10, 
    },
    buttonText: {
      color: '#fff', 
      textAlign: 'center',
      fontWeight: 'bold'
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#EEE', 
    },
    rideListContainer: {
      flex: 1, 
      marginTop: 10, 
    },
    rideCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        backgroundColor: '#FAFAFA',
        marginVertical: 8,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        paddingVertical: 20,
        paddingLeft: 10,
        paddingRight: 20,
    },
    profileColumn: {
        width: '20%',
        alignItems: 'center', 
    },
    profilePic: {
        width: 60, 
        height: 60, 
        borderRadius: 25, 
    },
    detailsColumn: {
        width: '50%',
    },
    buttonsColumn: {
        width: '30%',
        alignItems: 'flex-end',
    },
    rideName: {
      fontWeight: 'bold',
      marginBottom: 5, 
    },
    rideDetail: {
      color: '#666', 
      marginBottom: 5
    },
    button: {
        backgroundColor: '#21d111',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 5,
        alignSelf: 'stretch', 
    },

    safetyTipsButton: {
      padding: 20,
      backgroundColor: '#DDDDDD', 
      position: 'absolute',
      bottom: 0,
      width: '100%',
      textAlign: 'center', 
    },
  });