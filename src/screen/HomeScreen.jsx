import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Header from './Header'; // Import the Header component

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600; // Check if the screen is large (e.g., iPads)

const HomeScreen = () => {
  const navigation = useNavigation(); // Access the navigation object

  const handleGalleryPress = () => {
    console.log("Gallery button pressed");
    navigation.navigate('Gallery');
  };

  const handlePaintByNumbersPress = () => {
    console.log("Paint by Numbers button pressed");
    navigation.navigate('Paint by Numbers');
  };

  const handleDrawingPress = () => {
    console.log("Drawing button pressed");
    navigation.navigate('Drawing'); // Navigate to the DrawingScreen
  };

  const [headerText, setHeaderText] = useState('0'); // State for the header text

  return (
    <View style={styles.container}>
      <Header 
        text={headerText}
        onSettingsPress={() => navigation.navigate('Settings')} 
        iconColor="#213D61" // Set icon color to white
        textColor="#213D61" // Set text color to white
      />
      
      <View style={styles.avatarscreen}>
        <Image source={require("../screen/assets/avatar.png")} style={styles.avatar} />
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGalleryPress}>
          <Image source={require("../screen/assets/gallery.png")} style={styles.buttonImage} />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.paintByNumbersButton]} onPress={handlePaintByNumbersPress}>
          <Image source={require("../screen/assets/paintbynumbers.png")} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.drawingContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDrawingPress}>
          <Image source={require("../screen/assets/drawing.png")} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Define styles
const stylesPhone = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatarscreen: {
    marginTop: '5%',
    alignItems: 'center',
  },
  avatar: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: -20, // Adjusted to reduce space
  },
  button: {
    width: 400,
    height: 150,
    marginVertical: 5, // Reduced to bring buttons closer
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  drawingContainer: {
    alignItems: 'center',
    marginTop: -8, // Set to a negative value to bring the button higher
  },
  paintByNumbersButton: {
    height: 180, // Increase height for the Paint by Numbers button
  },
});

const stylesLargeScreen = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatarscreen: {
    marginTop: '15%',
    marginVertical: 40,
    alignItems: 'center',
  },
  avatar: {
    width: 800,
    height: 400,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 30,
  },
  button: {
    width: width * 0.45,
    height: width * 0.45,
    marginHorizontal: 8,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  drawingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: -15, // Set to a negative value for larger screens
    paddingBottom: '5%',
  },
  paintByNumbersButton: {
    height: width * 0.5, // Increase height for the Paint by Numbers button in large screens
  },
});

// Choose styles based on screen size
const styles = isLargeScreen ? stylesLargeScreen : stylesPhone;

export default HomeScreen;
