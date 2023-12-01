import React from 'react';
import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.backgroundImage} source={require('../assets/backgroundimage.jpeg')} />

      
    {/* title and form */}
    <View style={styles.titleAndFormContainer}>

{/* title */}
<View style={styles.titleContainer}>
  <Text style={styles.titleText}>Login</Text>
</View>

{/* form */}
<View style={styles.formContainer}>
  <View style={[styles.inputContainer, styles.mbEmail]}>
    <TextInput
      placeholder="Email"
      placeholderTextColor={'gray'}
    />
  </View>
  <View style={[styles.inputContainer, styles.mbPassword]}>
    <TextInput
      placeholder="Password"
      placeholderTextColor={'gray'}
      secureTextEntry
    />
  </View>

  <View style={styles.fullWidth}>
    <TouchableOpacity style={styles.loginButton} onPress={()=>navigation.push('Home')}>
      <Text style={styles.loginButtonText}>Login</Text>
    </TouchableOpacity>
  </View>

  <View style={styles.justifyCenter}>
    <Text>Don't have an account? </Text>
    <TouchableOpacity onPress={() => navigation.push('SignUp')}>
      <Text style={styles.signupText}>SignUp</Text>
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
paddingTop: 40,
paddingBottom: 10,
},
titleContainer: {
flex: 1,
alignItems: 'center',
marginTop:20
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
marginHorizontal: 20, // Increase the margin for more space on each side
marginBottom: 10,
},
inputContainer: {
backgroundColor: 'rgba(0, 0, 0, 0.5)',
padding: 10,
borderRadius: 20,
width: '100%',
},
mbEmail: {
marginBottom: 20, // Increase this value for more space between email and the top
},
mbPassword: {
marginBottom: 20, // Increase this value for more space between password and the email
},
fullWidth: {
width: '100%',
},
loginButton: {
backgroundColor: '#00BFFF',
padding: 10,
borderRadius: 20,
marginBottom: 3,
},
loginButtonText: {
fontSize: 18,
fontWeight: 'bold',
color: 'white',
textAlign: 'center',
},
justifyCenter: {
flexDirection: 'row',
justifyContent: 'center',
},
signupText: {
color: '#00BFFF',
},
});