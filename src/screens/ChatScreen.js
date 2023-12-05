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
  const [newMessage, setNewMessage] = useState("");
  const { rideId } = route.params;
  const [currentUser, setCurrentUser] = useState(null);
  const [otherUserName, setOtherUserName] = useState("");

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
      messagesRef.on("value", (snapshot) => {
        const messagesData = snapshot.val() || {};
        const loadedMessages = Object.values(messagesData);
        setMessages(loadedMessages);
      });

      return () => {
        messagesRef.off("value"); // Stop listening when the component is unmounted
      };
    }
  }, [rideId]);

  useEffect(() => {
    // Assuming you already have currentUser set up correctly
    if (rideId && currentUser) {
      const rideRef = db().ref(`/rides/${rideId}`);
      rideRef.once("value").then((snapshot) => {
        const rideData = snapshot.val();
        // Check if the current user is the rider or driver, and set the other user accordingly
        if (rideData.rider === currentUser) {
          setOtherUserName(rideData.driver); // Assuming this is the name, not the UID
        } else if (rideData.driver === currentUser) {
          setOtherUserName(rideData.rider); // Assuming this is the name, not the UID
        }
      });
    }
  }, [rideId, currentUser]);

  const sendMessage = () => {
    if (newMessage.trim() && currentUser && rideId) {
      const messagesRef = db().ref(`/rides/${rideId}/messages`);
      const newMessageRef = messagesRef.push(); // create a new message entry
      newMessageRef.set({
        text: newMessage,
        timestamp: Date.now(),
        senderId: currentUser,
      });
      setNewMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.userName}>{otherUserName}</Text>
        <Text style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.chatContainer}
        ref={(ref) => (this.scrollView = ref)}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({ animated: true })
        }
      >
        {messages
          .sort((a, b) => a.timestamp - b.timestamp) // Sort messages by timestamp
          .map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.senderId === currentUser
                  ? styles.myMessageBubble
                  : styles.theirMessageBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.senderId === currentUser
                    ? styles.myMessageText
                    : styles.theirMessageText,
                ]}
              >
                {message.text}
              </Text>
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
    justifyContent: 'space-between',
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
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "75%",
    alignSelf: "flex-end",
  },
  myMessageBubble: {
    backgroundColor: "#DCF8C5", // Light green bubble for sent messages
    marginRight: 10,
    alignSelf: "flex-end",
  },
  theirMessageBubble: {
    backgroundColor: "#E5E5E5", // Grey bubble for received messages
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: "black", // Color for text in sent messages
  },
  theirMessageText: {
    color: "black", // Color for text in received messages
  },
  backButton: {
    // Styles for the back button if needed, for example:
    padding: 10, // Easy to tap
  },
  userName: {
    flex: 1,
    textAlign: 'center', // Center the username
    fontWeight: 'bold', // Make the text bold
    fontSize: 24, // You can adjust the size as needed
    color: 'black', // Change the color if needed
    // Remove any marginLeft or marginRight if present
  },  
  placeholder: {
    // This view acts as a placeholder to balance the header
    padding: 25, // Should match the backButton's padding
  },
});

export default ChatScreen;
