import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.backgroundImage} source={require('../assets/backgroundimage.jpeg')} />

      {/* title and form */}
      <View style={styles.titleAndFormContainer}>

        {/* title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Sign Up</Text>
        </View>

        {/* form */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={'gray'}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={'gray'}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={[styles.inputContainer, styles.mbPassword]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'gray'}
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={[styles.inputContainer, styles.mbPassword]}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={'gray'}
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>

          <View style={styles.fullWidth}>
            <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.justifyCenter}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.loginText}>Login</Text>
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
    backgroundColor: 'white',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    width: undefined,
    flex: 1,
  },
  titleAndFormContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 1,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    marginBottom: 10,
  },
  mbPassword: {
    marginBottom: 20,
  },
  fullWidth: {
    width: '100%',
  },
  signupButton: {
    backgroundColor: '#00BFFF',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  justifyCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#00BFFF',
  },
});
