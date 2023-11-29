import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Image} from 'react-native';

const DriverScreen = ({ navigation }) => {
  const rides = [
    {
      id: 1,
      from: 'home',
      to: 'UBCO',
      time: '11:11 am',
      price: '5.787$',
      status: 'in-progress', 
      passengerLimit: 4,
    }, 
    {
        id: 2,
        from: 'Coscto',
        to: 'Downtown',
        time: '11:11 am',
        price: '5.787$',
        status: 'pending', 
        passengerLimit: 4,
    }, 
    
  ];

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('GlideDriveTabs', { screen: 'Glide' })}>
                <Text style={styles.buttonText}>Set to FreeRoam (?)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cancelButton, {width: '47%', alignItems: 'center'}]} onPress={() => {}}>
                <Text style={styles.buttonText}> Edit profile </Text>
            </TouchableOpacity>
        </View> 
      
      <View> 
        <Text style ={{ paddingLeft:10, fontWeight: 'bold', textDecorationLine: 'underline', marginTop: 10,}} > Rides that you posted  </Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      {rides.map((ride) => (
        <View key={ride.id} style={styles.rideContainer}>
            <View style={styles.row1}> 
                <View style={styles.rideDetails}>
                    <Text style={styles.rideText}>From: {ride.from}</Text>
                    <Text style={styles.rideText}>To: {ride.to}</Text>
                    <Text style={styles.rideText}>Time: {ride.time}</Text>
                    <Text style={styles.rideText}>Passenger (limit): {ride.passengerLimit}</Text>
                </View>
                <View style = {styles.rightCln}> 
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.cancelButton, {backgroundColor: '#6b6a6a'}]} onPress={() => navigation.navigate('GlideDriveTabs', { screen: 'Glide' })}>
                            <Text style={styles.buttonText}>{ride.status}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.trackButton} onPress={() => {}}>
                            <Text style={styles.buttonText}> review </Text>
                        </TouchableOpacity>
                    </View> 
                    <View style={styles.statusPriceContainer}>
                        <Text style={styles.priceText}>{ride.price}</Text>
                    </View>
                </View>
            </View>    
            {/* make button dynamic depending on status */}
                <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('AddEditRideScreen')}>
                    <Text style={styles.buttonText}>Review requests (3) </Text>
                </TouchableOpacity>
          
        </View>
        ))} 

        <View style={styles.rideContainer}>
            <View style={styles.row1}> 
                <View style={styles.rideDetails}>
                    <Text style={styles.rideText}>From: Canada</Text>
                    <Text style={styles.rideText}>To: Kinango</Text>
                    <Text style={styles.rideText}>Time: 12:44</Text>
                    <Text style={styles.rideText}>Passenger (limit): 7</Text>
                </View>
                <View style = {styles.rightCln}> 
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.delButton} onPress={() => navigation.navigate('GlideDriveTabs', { screen: 'Glide' })}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('AddEditRideScreen')}>
                            <Text style={styles.buttonText}> Edit</Text>
                        </TouchableOpacity>
                    </View> 
                    <View style={styles.statusPriceContainer}>
                        <Text style={styles.priceText}>77$</Text>
                    </View>
                </View>
            </View>    
            {/* make button dynamic depending on status */}
                <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('RideRequestScreen')}>
                    <Text style={styles.buttonText}>Review requests (3) </Text>
                </TouchableOpacity>
          
        </View>
    
      </ScrollView>

      <TouchableOpacity style={[styles.shareButton, {marginBottom: 20, position: 'relative'}]} onPress={() => navigation.navigate('AddEditRideScreen')}>
        <Text style={styles.buttonText}>Add Ride</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  tabContainer: {
    flexDirection: 'row',
    height: '20%'
 
  },
  scrollView: {
    marginHorizontal: 5,
    
  },
  row1: {
    flexDirection: 'row', 

  },
  rightCln: {
    flexDirection: 'column', 

  }, 
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancelButton: {
    backgroundColor: '#000', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5, 
    marginRight: 5, 
  }, 
  delButton: {
    backgroundColor: '#f54e42', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5, 
    marginRight: 5, 
  }, 
  shareButton: {
    backgroundColor: '#21d111', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10, 
    marginRight: 10, 
    width: '80%',
    alignItems: 'center'
  }, 
 
  trackButton: {
    backgroundColor: '#21d111', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  rideContainer: {
    backgroundColor: '#f2f2f2', 
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginHorizontal: 10, 
    marginVertical: 10,
    
  },
  rideDetails: {
    justifyContent: 'center',
  },
  rideText: {
    fontSize: 16,
    color: '#333', 
  },
  priceText: {
    backgroundColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    width: '90%',
    alignItems: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  statusPriceContainer: {
    alignItems: 'center',
    marginTop: 7, 
    justifyContent: 'space-between',
    width: '80%' ,
    paddingHorizontal: 12,
  },
  statusText: {
    backgroundColor: '#ddd', 
    borderRadius: 4,
    padding: 4,
    color: '#333',
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#21d111', 
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4, 
  },
  buttonText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    
  },
  safetyButton: {
    position: 'absolute',
    bottom: 10, 
    alignSelf: 'center',
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

export default DriverScreen;
