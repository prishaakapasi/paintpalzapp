import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase'; // Ensure your Supabase client is correctly imported

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600;

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    // Email validation
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        console.error('Supabase Error:', error);
        Alert.alert('Error', `Error: ${error.message}`);
      } else {
        Alert.alert('Success', 'Check your email for password reset instructions.');
        navigation.navigate('Login'); // Navigate back to Login after successful password reset request
      }
    } catch (err) {
      console.error('Error during password reset:', err);
      Alert.alert('Error', 'An error occurred while requesting password reset. Please try again.');
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
        <Text style={styles.text}>RESET YOUR PASSWORD</Text>
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
      <TouchableOpacity style={styles.resetButton} onPress={handleForgotPassword}>
        <Text style={styles.resetButtonText}>RESET PASSWORD</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Remember your password? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLinkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

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
  resetButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    marginTop: '10%',
    borderRadius: 20,
    alignItems: 'center',
  },
  resetButtonText: {
    color: "#213D61",
    fontSize: isLargeScreen ? 30 : 20,
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
