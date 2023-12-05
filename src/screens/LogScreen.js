import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";

export default function LogInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        navigation.push("Home"); // Replace with your home screen route
      } catch (error) {
        Alert.alert(
          "Login Error",
          error.message || "Please check your credentials"
        );
      }
    } else {
      Alert.alert("Input Required", "Please enter both email and password");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Image
      style={styles.backgroundImage}
      source={require("../assets/logo.png")}/>
      


      <View style={styles.titleAndFormContainer}>
        <View style={styles.titleContainer}>
        </View>

        <View style={styles.formContainer}>
          <View style={[styles.inputContainer, styles.mbEmail]}>
            <TextInput
            style={styles.inputText}
              placeholder="Email"
              placeholderTextColor={"white"}
              value={email}
              onChangeText={setEmail} // Bind state setter
              
            />
          </View>
          <View style={[styles.inputContainer, styles.mbPassword]}>
            <TextInput
            style={styles.inputText}
              placeholder="Password"
              placeholderTextColor={"white"}
              secureTextEntry
              value={password}
              onChangeText={setPassword} // Bind state setter
            />
          </View>

          <View style={styles.fullWidth}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin} // Changed the onPress handler
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.justifyCenter}>
          <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push("Register")}>
              <Text style={styles.signupText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    
    height: 300,
    width: 300,
    flex: 1,
    resizeMode: 'contain',
    alignContent:'center',
    marginHorizontal:50,
    marginTop:100,
  },
  titleAndFormContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 40,
    paddingBottom: 10,
    justifyContent: "space-around",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20, // Increase the margin for more space on each side
    marginBottom: 10,
    marginTop:-400,
  },
  inputContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 20,
    width: "100%",
  },
  mbEmail: {
    marginBottom: 20, // Increase this value for more space between email and the top
  },
  mbPassword: {
    marginBottom: 20, // Increase this value for more space between password and the email
  },
  fullWidth: {
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#21d111",
    padding: 10,
    borderRadius: 20,
    marginBottom: 3,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  justifyCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "black",
  },
  inputText: {
    color: "white",
  },
});