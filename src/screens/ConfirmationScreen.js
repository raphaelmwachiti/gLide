import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const ConfirmationScreen = ({ navigation }) => {
  const { goBack } = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SafeAreaView style={styles.backButtonSafeArea}>
          {/* Back button within SafeAreaView */}
          <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
            <AntDesign name="arrowleft" size={24} color="#333" />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.card}>
          <Text style={styles.confirmationText}>Confirmation</Text>

          <View style={styles.profileInfo}>
            <View style={styles.profileImgClmn}>
              {/* Remove profile image */}
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
          <Text style={styles.aboutDetail}> - Call 911 if you feel unsafe and contact support</Text>

          <View style={styles.buttonContainer}>
            {/* Share button removed */}
            <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('TrackRideScreen')}>
              <Text style={styles.buttonText}> Confirm Ride</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.safetyTipsButton} onPress={() => navigation.navigate(SafetyScreen)}>
            <Text style={styles.safetyTipsText}>Safety tips</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    width: '90%',
    maxWidth: 600,
    position: 'relative',
  },
  backButtonSafeArea: {
    position: 'absolute',
    top: 20, // Adjust the top value for the SafeAreaView containing the back button
    left: 10,
    right: 10,
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
  },
  confirmationText: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  profileImgClmn: {
    width: '20%',
  },
  profileDetailClmn: {
    width: '70%',
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
  trackButton: {
    backgroundColor: '#21d111',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  safetyTipsButton: {
    marginTop: 20,
  },
  safetyTipsText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ConfirmationScreen;
