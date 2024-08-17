import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600; // Check if the screen is large (e.g., iPads)
const avatarSize = isLargeScreen ? { width: 800, height: 400 } : { width: 300, height: 150 }; // Adjust avatar size
const buttonSize = isLargeScreen ? width * 0.45 : 150; // Adjust button size for larger screens
const handleGalleryPress = () => {
  console.log("Gallery button pressed");
};

const handlePaintByNumbersPress = () => {
  console.log("Paint by Numbers button pressed");
};

const handleDrawingPress = () => {
  console.log("Drawing button pressed");
};
const HomeScreen = () => {
  return (
    <View style={styles.container}>
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center', 
  },
  avatarscreen: {
    marginTop: '15%',
    marginVertical: isLargeScreen ? 40 : 20,
    alignItems: 'center',
  },
  avatar: {
    width: avatarSize.width, 
    height: avatarSize.height,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 0, 
    paddingHorizontal: isLargeScreen ? 30 : 15,
    
  },
  button: {
    width: buttonSize, 
    height: buttonSize,
    marginHorizontal: isLargeScreen ? 8 : 2, 
  },
  gallery: {
    width: '100%',
    height: '100%',
    marginTop: isLargeScreen ? 20 : 10,
    resizeMode: 'contain',
  },
  paintbynumbers: {
    width: '100%',
    height: '100%',
    marginTop: isLargeScreen ? 20 : 10, 
    resizeMode: 'contain',
  },
  drawingbutton: {
    alignItems: 'center',
  },
  drawing: {
    width: buttonSize, 
    height: buttonSize, 
    resizeMode: 'contain',
    paddingBottom: 5
    
  },
  drawingContainer: {
    flex: 1, 
    justifyContent: 'flex-end', 
    bottomwidth: '100%',
    paddingBottom: 20, 
  }
});
