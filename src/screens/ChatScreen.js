import React, { useState } from "react";
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

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    "Hey I should be by the elephant wearing blue nike fit",
    "I arrive in 5 minutes",
    "I don't see you",
    "Glide completed (chat deletion - 10:03)",
    "You left your socks",
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim().length > 0) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
      // Here you would also handle sending the message to your backend or Firebase
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

      <ScrollView style={styles.chatContainer}>
        {/* Messages would be dynamically mapped here */}
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
