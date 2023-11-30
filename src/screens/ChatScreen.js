import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';

const ChatScreen = ({ navigation }) => {
  // Placeholder for message state and any other logic (not implemented)

  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', backgroundColor: '#f2f2f2'}}> 
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('TrackRideScreen')}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.deletionNotice}>Chat is deleted 30 minutes after ride</Text>
        </View>      
      <ScrollView style={styles.chatContainer}>
        
        <Text style={styles.message}>Hey I should be by the elephant wearing blue nike fit</Text>
        <Text style={styles.message}>I arrive in 5 minutes</Text>
        <Text style={styles.message}>I don't see you</Text>
        <Text style={styles.message}>Glide completed (chat deletion - 10:03)</Text>
        <Text style={styles.message}>You left your socks</Text>
        
      </ScrollView>

      <View style={styles.quickResponseContainer}>
        <TouchableOpacity style={styles.quickResponseButton}>
          <Text>At Gordon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickResponseButton}>
          <Text>Arriving in (5:07)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickResponseButton}>
          <Image source={require('../assets/phone-icon.png')} style={styles.callIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.disabledChatNotice}>
        You are driving, chat is disabled. Use suggestions above
      </Text>

      <TextInput 
        style={styles.chatInput} 
        placeholder="Chat with Glider" 
        editable={false} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    
  },
  deletionNotice: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    color: '#f54e42', 
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 10
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  quickResponseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  quickResponseButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 20,
  },
  callIcon: {
    width: 20, // Adjust size as needed
    height: 20, // Adjust size as needed
    resizeMode: 'contain',
  },
  disabledChatNotice: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    fontSize: 12,
  },
  chatInput: {
    padding: 10,
    backgroundColor: '#e5e5e5',
    fontSize: 14,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginBottom: 25,
    marginHorizontal: 10,
    borderRadius: 15, 
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  }, 
  backButton: {
    backgroundColor: '#000', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10, 
    marginRight: 10, 
    marginLeft: 5, 
    marginBottom: 10, 
  }, 
});

export default ChatScreen;
