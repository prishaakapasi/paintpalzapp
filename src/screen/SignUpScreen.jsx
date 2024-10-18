import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase'; 
const { width } = Dimensions.get('window');
const isLargeScreen = width > 600;

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const initializeHeaderText = async () => {
      try {
        const storedText = await AsyncStorage.getItem('headerText');
        if (storedText === null) {
          await AsyncStorage.setItem('headerText', '0'); // Initial value
        }
      } catch (error) {
        console.error('Error initializing headerText:', error);
        Alert.alert('Error', 'Failed to initialize header text');
      }
    };

    initializeHeaderText();
  }, []);
  const handleSignUp = async () => {
    // Email validation
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
  
    // Password validation
    if (password.length < 8) {
      Alert.alert('Password Error', 'Password must be at least 8 characters long.');
      return;
    }
  
    // Check if password contains at least one special symbol
    const specialSymbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialSymbolRegex.test(password)) {
      Alert.alert('Password Error', 'Password must contain at least one special symbol (e.g., !, @, #, $, etc.).');
      return;
    }
  
    // Confirm password validation
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match. Please try again.');
      return;
    }
  
    try {
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        console.error('Supabase Error:', error);
        Alert.alert('Error', `Error: ${error.message}`);
        return;
      } else {
        Alert.alert('Success', 'Check your email for a confirmation link.');
  
        // Insert the user's header text into the headers table
        const { error: insertError } = await supabase
          .from('headers')
          .insert([{ user_id: user.id, text: '0' }]); // Initialize header text to '0'
  
        if (insertError) {
          console.error('Insert Error:', insertError);
          Alert.alert('Error', 'Failed to create header text. Please try again.');
        } else {
          console.log('Header text initialized to 0');
          
          // Store user ID globally using AsyncStorage
          await AsyncStorage.setItem('userID', user.id);
  
          // Optionally navigate to Login after successful header text initialization
          navigation.navigate('Login');
        }
      }
    } catch (err) {
      console.error('Error during sign-up:', err);
      Alert.alert('Sign Up Error', 'An error occurred while signing up. Please try again.');
    }
  };
  

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.paintPalzLogoContainer}>
        <Image source={require("../screen/assets/paintpalzlogo.png")} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>CREATE AN ACCOUNT</Text>
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='CONFIRM PASSWORD'
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLinkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
    marginTop: isLargeScreen ? '10%' : '15%',
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
  signUpButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    marginTop: '10%',
    borderRadius: 20,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: "#213D61",
    fontSize: isLargeScreen ? 30 : 25,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  loginText: {
    color: "#FFFFFF",
  },
  loginLinkText: {
    color: "#F8EC3B",  
    textDecorationLine: 'underline', 
    fontSize: isLargeScreen ? 20 : 15,
  },
});
