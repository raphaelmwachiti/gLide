import React, {useState} from "react";
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

export default function RegisterScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const createProfile = async (response) => {
      // Ensure db() is correctly set up to interact with your database
      db().ref(`/users/${response.user.uid}`).set({ name, email });
    };
  
    const registerAndGoToMainFlow = async () => {
      if (email && password) {
        try {
          const response = await auth().createUserWithEmailAndPassword(email, password);
          if (response.user) {
            await createProfile(response);
            navigation.push("Home"); // Use the correct navigation method
          }
        } catch (e) {
          // It's better to show more specific error messages based on e.code or e.message
          Alert.alert("Registration Error", e.message || "Please check your form and try again");
        }
      }
    };
  
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Image style={styles.backgroundImage} source={require("../assets/backgroundimage.jpeg")} />
  
        <View style={styles.titleAndFormContainer}>
          <View style={styles.titleContainer}>
          </View>
  
          <View style={styles.formContainer}>
            <View style={[styles.inputContainer, styles.mbEmail]}>
              <TextInput
              style={styles.inputText}
                placeholder="Name"
                placeholderTextColor={"gray"}
                value={name}
                onChangeText={setName} // Bind state setter
              />
            </View>
            <View style={[styles.inputContainer, styles.mbEmail]}>
              <TextInput
              style={styles.inputText}
                placeholder="Email"
                placeholderTextColor={"gray"}
                value={email}
                onChangeText={setEmail} // Bind state setter
              />
            </View>
            <View style={[styles.inputContainer, styles.mbPassword]}>
              <TextInput
              style={styles.inputText}
                placeholder="Password"
                placeholderTextColor={"gray"}
                // secureTextEntry
                value={password}
                onChangeText={setPassword} // Bind state setter
              />
            </View>
  
            <View style={styles.fullWidth}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={registerAndGoToMainFlow} // Changed the onPress handler
              >
                <Text style={styles.loginButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
  
            <View style={styles.justifyCenter}>
            <Text style={styles.inputText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push("LogIn")}>
                <Text style={styles.signupText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    width: undefined,
    flex: 1,
  },
  titleAndFormContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 40,
    paddingBottom: 10,
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
    color: "#00BFFF",
  },

  inputText: {
    color: "white",
  },
});