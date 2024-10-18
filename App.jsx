import { Settings, StyleSheet, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screen/LoginScreen';
import SignUpScreen from './src/screen/SignUpScreen';
import HomeScreen from './src/screen/HomeScreen';
import DrawingScreen from './src/screen/DrawingScreen';
import GalleryScreen from './src/screen/GalleryScreen';
import ForgotPasswordScreen from './src/screen/ForgotPasswordScreen';
import SettingsScreen from './src/screen/SettingsScreen';
import PaintByNumbers from './src/screen/PaintByNumbers';
import AvatarScreen from './src/screen/AvatarScreen';
import { AvatarStateProvider } from './src/screen/AvatarContext';
import AvatarCustomizationScreen from './src/screen/AvatarCustomizationScreen';
import PublishedArtwork from './src/screen/PublishedArtwork';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AvatarStateProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Avatar Screen" component={AvatarScreen} /> 
        <Stack.Screen name="Avatar Customization Screen" component={AvatarCustomizationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Drawing" component={DrawingScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Paint by Numbers" component={PaintByNumbers} />
        <Stack.Screen name="Published Artwork" component={PublishedArtwork} />
      </Stack.Navigator>
    </NavigationContainer>
    </AvatarStateProvider>
  );
};

export default App;

const styles = StyleSheet.create({});