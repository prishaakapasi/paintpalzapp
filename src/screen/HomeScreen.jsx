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
  };

  const handleDrawingPress = () => {
    console.log("Drawing button pressed");
    navigation.navigate('Drawing'); // Navigate to the DrawingScreen
  };

  const handleSettingsPress = () => {
    console.log("Settings button pressed");
    navigation.navigate('Settings'); // Navigate to the Settings screen
  };

  const [headerText, setHeaderText] = useState('0'); // State for the header text

  return (
    <View style={styles.container}>
      <Header text={headerText} onSettingsPress={handleSettingsPress} />
      <View style={styles.avatarscreen}>
        <Image source={require("../screen/assets/avatar.png")} style={styles.avatar} />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.galleryButton]} onPress={handleGalleryPress}>
          <Image source={require("../screen/assets/gallery.png")} style={styles.gallery} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.paintByNumbersButton]} onPress={handlePaintByNumbersPress}>
          <Image source={require("../screen/assets/paintbynumbers.png")} style={styles.paintbynumbers} />
        </TouchableOpacity>
      </View>
      <View style={styles.drawingContainer}>
        <TouchableOpacity style={styles.drawingbutton} onPress={handleDrawingPress}>
          <Image source={require("../screen/assets/drawing.png")} style={styles.drawing} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginTop: -35,
  },
  button: {
    width: 400,
    height: 150,
    marginVertical: 10,
    borderRadius: 30,
    overflow: 'hidden',
  },
  gallery: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  paintbynumbers: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  drawingContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  drawingbutton: {
    width: 400,
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
  },
  drawing: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
  gallery: {
    width: '100%',
    height: '100%',
    marginTop: 20,
    resizeMode: 'contain',
  },
  paintbynumbers: {
    width: '100%',
    height: '100%',
    marginTop: 20,
    resizeMode: 'contain',
  },
  drawingbutton: {
    alignItems: 'center',
    marginTop: 30,
  },
  drawing: {
    width: width * 0.45,
    height: width * 0.45,
    resizeMode: 'contain',
    paddingBottom: 5,
  },
  drawingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: '5%',
    paddingBottom: '.5%',
  },
});

const styles = isLargeScreen ? stylesLargeScreen : stylesPhone;

export default HomeScreen;
