import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';

const { width } = Dimensions.get('window');

const isLargeScreen = width > 600;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    // Add your sign-in logic here
    console.log('Sign In button pressed');
  };

  const validateEmail = (email) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = () => {
    // Add your forgot password logic here
    console.log('Forgot Password pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.paintPalzLogoContainer}>
        <Image source={require("../screen/assets/paintpalzlogo.png")} style={styles.logo} />
      </View>
      <View style={styles.textContainer}> 
        <Text style={styles.text}>SIGN IN TO YOUR ACCOUNT</Text>
      </View>
      <View style={styles.inputContainer}> 
        <TextInput
          style={styles.textInput}
          placeholder='EMAIL'
          keyboardType='email-address'
          autoCapitalize='none'
          value={email}
          onChangeText={setEmail}
        />
      </View> 
      <View style={styles.inputContainer}> 
        <TextInput
          style={styles.textInput}
          placeholder='PASSWORD'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View> 
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}> 
        <Text style={styles.signInButtonText}>SIGN IN</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#213D61",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  paintPalzLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: isLargeScreen ? 200 : 150,
    width: '100%',
    marginTop: isLargeScreen ? '25%' : '35%',
  },
  logo: {
    width: isLargeScreen ? 500 : 300,
    height: isLargeScreen ? 500 : 300,
    resizeMode: 'contain',
  },
  textContainer: {
    marginTop: isLargeScreen ? '15%' : '20%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: isLargeScreen ? 30 : 25,
    fontWeight: "bold", 
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 20,
    width: '70%',
    marginHorizontal: 40,
    height: '6%',
    marginTop: '6%',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: isLargeScreen ? 22 : 17,
  },
  forgotPasswordText: {
    color: "#B5C9E3",
    textAlign: "right", 
    width: '70%',
    fontSize: isLargeScreen ? 15 : 12,
    marginTop: '2%',
    textDecorationLine: 'underline',  // Adds underline to make it look like a link
  },
  signInButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    marginTop: '10%',
    borderRadius: 20,
    alignItems: 'center',
  },
  signInButtonText: {
    color: "#213D61",
    fontSize: isLargeScreen ? 30 : 25,
    fontWeight: "bold",
  },
});
