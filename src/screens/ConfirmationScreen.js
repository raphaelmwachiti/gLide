import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const ConfirmationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <Image
            source={require('../assets/confirm.jpg')} 
            style={styles.confirmationImage}
            />
        <Text style={styles.confirmationText}>Your ride has been confirmed</Text>

      <View style={styles.card}>
        <Text style={styles.titleText}> Ride details</Text>
        <View style={styles.profileInfo}> 
          <View style={styles.profileImgClmn}>
            <Image
            source={require('../assets/pp.jpg')} 
            style={styles.profileImage}
            />
          </View>
          <View style={styles.profileDetailClmn}> 
            <Text style={styles.profileName}>Lambo Urus - 5.767$</Text>
            <Text style={styles.profileDetail}>Messi Leo Goat</Text>
            <Text style={styles.profileDetail}>(add star emo) 2/7 - silver</Text>
          </View>
        </View>

        <Text style={styles.aboutTitle}>About</Text>
        <Text style={styles.aboutDetail}> - Vehicle is bright Pink and should have green rims</Text>
        <Text style={styles.aboutDetail}> - The plate number is 345GGf </Text>
        <Text style={styles.aboutDetail}> - Driver phone number is 350898984 </Text>
        <Text style={styles.aboutDetail}> - Call 911 us you feel unsafe and contact support</Text>
       

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('GlideDriveTabs', { screen: 'Glide' })}>
            <Text style={styles.buttonText}> Share ride details with family or freind</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.trackButton} onPress={() => {}}>
            <Text style={styles.buttonText}> Proceed to track your ride</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.safetyTipsButton}>
          <Text style={styles.safetyTipsText}>Safety tips</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  card: {
    backgroundColor: '#f0f0f0', 
    borderRadius: 8,
    padding: 20,
    alignItems: 'center', 
    width: '90%',
    maxWidth: 600, 
  },
  confirmationImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 10,
  },
  confirmationText: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  }, 
  titleText: { 
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 6, 
  },
  profileImgClmn: { 
    width: '20%'
  }, 
  profileDetailClmn: {
    width: '70%'
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 60,
    marginLeft: -20
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
  },
  profileDetail: {
    fontSize: 16,
    marginBottom: 4,
  },
  aboutTitle: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  aboutDetail: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
  backButton: {
    backgroundColor: '#000', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  trackButton: {
    backgroundColor: '#21d111', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10, 
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }, 
  safetyTipsButton: {
    marginTop:10,
  },
  safetyTipsText: {
    fontWeight: 'bold',
    color: '#21d111', 
  },
  
});

export default ConfirmationScreen;
