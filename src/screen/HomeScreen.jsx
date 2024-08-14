import { StyleSheet, View, Image, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600; // Check if the screen is large (e.g., iPads)
const avatarSize = isLargeScreen ? { width: 800, height: 400 } : { width: 300, height: 150 }; // Adjust avatar size
const buttonSize = isLargeScreen ? width * 0.45 : 150; // Adjust button size for larger screens

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarscreen}>
        <Image source={require("../screen/assets/avatar.png")} style={styles.avatar} />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Image source={require("../screen/assets/gallery.png")} style={styles.gallery} />
        </View>
        <View style={styles.button}>
          <Image source={require("../screen/assets/paintbynumbers.png")} style={styles.paintbynumbers} />
        </View>
      </View>
      <View style={styles.drawingbutton}>
        <Image source={require("../screen/assets/drawing.png")} style={styles.drawing} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20, // Add padding for better spacing
  },
  avatarscreen: {
    marginTop: '10%',
    marginVertical: isLargeScreen ? 40 : 20,
    alignItems: 'center',
  },
  avatar: {
    width: avatarSize.width, // Dynamic width based on screen size
    height: avatarSize.height, // Dynamic height based on screen size
    resizeMode: 'contain',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: isLargeScreen ? 20 : 10, // Margin from avatar to first row
    marginBottom: 0, // No space between button rows
  },
  button: {
    width: buttonSize, // Dynamic size based on screen width
    height: buttonSize, // Maintain aspect ratio
    marginHorizontal: isLargeScreen ? 10 : 5, // Space between buttons in the first row
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
  drawingbutton: {
    marginTop: 0, // No space between rows
  },
  drawing: {
    width: buttonSize, // Consistent size with buttons
    height: buttonSize, // Consistent size with buttons
    resizeMode: 'contain',
  },
});
