import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import db from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

const ChatScreen = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { rideId } = route.params;
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = auth().currentUser;
        if (user) {
          const userRef = db().ref(`/users/${user.uid}/name`);
          userRef.once("value").then((snapshot) => {
            setCurrentUser(snapshot.val()); // This will contain the user's name
          });
        }
      }, []);

      useEffect(() => {
        if (rideId) {
          // Start listening for messages for the current ride
          const messagesRef = db().ref(`/rides/${rideId}/messages`);
          messagesRef.on('value', snapshot => {
            const messagesData = snapshot.val() || {};
            const loadedMessages = Object.values(messagesData);
            setMessages(loadedMessages);
          });
    
          return () => {
            messagesRef.off('value'); // Stop listening when the component is unmounted
          };
        }
      }, [rideId]);

      const sendMessage = () => {
        if (newMessage.trim() && currentUser && rideId) {
          const messagesRef = db().ref(`/rides/${rideId}/messages`);
          const newMessageRef = messagesRef.push(); // create a new message entry
          newMessageRef.set({
            text: newMessage,
            timestamp: Date.now(),
            senderId: currentUser,
          });
          setNewMessage('');
        }
      };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.deletionNotice}>
          Chat is deleted 30 minutes after ride
        </Text>
      </View>

      <ScrollView style={styles.chatContainer}
  ref={ref => this.scrollView = ref}
  onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
>
  {messages.sort((a, b) => a.timestamp - b.timestamp) // Sort messages by timestamp
    .map((message, index) => (
      <View key={index} style={[
        styles.message,
        message.senderId === currentUser ? styles.myMessage : styles.theirMessage // Differentiate between sent and received messages
      ]}>
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
  ))}
</ScrollView>


      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Chat with Glider"
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={sendMessage} // This will send the message when the return key is pressed
          returnKeyType="send" // Just for better UX on iOS
          editable={true} // Can be set to false if you want to disable input
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 50 : 10,
    marginBottom: Platform.OS === "ios" ? 15 : 5,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    backgroundColor: "white",
  },
  deletionNotice: {
    marginLeft: 10,
    color: "#f54e42",
    fontSize: 14,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#f2f2f2",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#dedede",
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    color: "black",
  },
  sendButton: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 20,
  },
});

export default ChatScreen;
