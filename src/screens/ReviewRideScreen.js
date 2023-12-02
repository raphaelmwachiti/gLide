import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import SafetyScreen from './SafetyScreen';

const ReviewRideScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <Text style={styles.safetyText}>We prioritize your safety. Please review terms of use.</Text>

        <View style={styles.profileInfo}> 
          <View style={styles.profileImgClmn}>
            <Image
            source={require('../assets/pp.jpg')} 
            style={styles.profileImage}
            />
          </View>
          <View style={styles.profileDetailClmn}> 
            <Text style={styles.profileName}>Messi Leo GOAT</Text>
            <Text style={styles.profileDetail}>27 years old</Text>
            <Text style={styles.profileDetail}>Glides completed - 2002</Text>
          </View>
        </View>

        <Text style={styles.aboutTitle}>About</Text>
        <Text style={styles.aboutDetail}> - Messi glides as full time job</Text>
        <Text style={styles.aboutDetail}> - On weekends Messi plays soccrer for man united </Text>
        <Text style={styles.aboutDetail}> - Messi has been driving for 25 years 4 days and 69 minutes </Text>
        <Text style={styles.aboutDetail}> - Messi has been vetted by our team through interviews and background check</Text>

        <Text style={styles.reviewsTitle}>Reviews - 2/7 (⭐⭐)</Text>
        <View style={styles.reviewsCard}> 
          <View style={styles.reviewPicClmn} >
          <Image
            source={require('../assets/pp.jpg')} 
            style={styles.reviewProfileImage}
            />
          </View>  
          <View style={styles.reviewDetailClmn} >
            <Text> 
              He has the most amazing stories about his time playing football. 
            </Text>
          </View> 
          <View style={styles.reviewRatingClmn} >
            <Text> 2/7 (add star emoji)</Text>
          
          </View> 

        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('GlideDriveTabs', { screen: 'Glide' })}>
            <Text style={styles.buttonText}>Back to search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('ConfirmationScreen')}>
            <Text style={styles.buttonText}>Book (0:53)</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.safetyTipsButton}onPress={()=>navigation.navigate(SafetyScreen)}>
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
  safetyText: {
    marginBottom: 20,
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
    width: '30%'
  }, 
  profileDetailClmn: {
    width: '70%'
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 24,
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
  reviewsTitle: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  reviewsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal:10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
  },
  reviewPicClmn: {
    width: '20%', 
  }, 
  reviewDetailClmn: {
    width: '70%'
  },
  reviewRatingClmn: {
    width: '15%'
  },  
  reviewProfileImage: {
    width: 45,
    height: 45,
    borderRadius: 60,

  },
  buttonContainer: {
    flexDirection: 'row',
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
  bookButton: {
    backgroundColor: '#21d111', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
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

export default ReviewRideScreen;
