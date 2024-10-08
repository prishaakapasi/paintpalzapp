import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading

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

  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setLoading(true); // Start loading
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      console.log('Sign In successful');
      navigation.navigate('Avatar Screen');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password pressed');
    navigation.navigate('Forgot Password');
  };

  const handleCreateAccount = () => {
    navigation.navigate('Sign Up');
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
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}> 
        {loading ? (
          <ActivityIndicator size="small" color="#213D61" /> // Loading indicator
        ) : (
          <Text style={styles.signInButtonText}>SIGN IN</Text>
        )}
      </TouchableOpacity>
      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccountText}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.createLinkText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  createAccountContainer: {
    flexDirection: 'row',
    marginTop: '10%',
  },
  createAccountText: {
    color: "#FFFFFF",
  },
  createLinkText: {
    color: "#F8EC3B",  
    textDecorationLine: 'underline', 
    fontSize: isLargeScreen ? 20 : 15,
  },
});
