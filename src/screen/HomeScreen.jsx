import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation} from '@react-navigation/native';
import Header from './Header'; 
import { AvatarContext } from '../screen/AvatarContext';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600;

const HomeScreen = () => {
  const navigation = useNavigation(); 
  
  const { selectedAvatar } = useContext(AvatarContext);
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
    navigation.navigate('Drawing'); 
  };

  const [headerText, setHeaderText] = useState('0'); 

  return (
    <View style={isLargeScreen ? stylesLargeScreen.container : stylesPhone.container}>
      <Header 
        text={headerText}
        onSettingsPress={() => navigation.navigate('Settings')} 
        iconColor="#213D61" 
        textColor="#213D61" 
      />
      
      <View style={isLargeScreen ? stylesLargeScreen.avatarscreen : stylesPhone.avatarscreen}>
        <Image source={require("../screen/assets/avatar.png")} style={isLargeScreen ? stylesLargeScreen.avatar : stylesPhone.avatar} />
      </View>
      
      <View style={isLargeScreen ? stylesLargeScreen.buttonsContainer : stylesPhone.buttonsContainer}>
        <TouchableOpacity style={isLargeScreen ? stylesLargeScreen.button : stylesPhone.button} onPress={handleGalleryPress}>
          <Image source={require("../screen/assets/gallery.png")} style={isLargeScreen ? stylesLargeScreen.buttonImage : stylesPhone.buttonImage} />
        </TouchableOpacity>
        
        <TouchableOpacity style={isLargeScreen ? stylesLargeScreen.paintByNumbersButton : stylesPhone.paintByNumbersButton} onPress={handlePaintByNumbersPress}>
          <Image source={require("../screen/assets/paintbynumbers.png")} style={isLargeScreen ? stylesLargeScreen.buttonImage : stylesPhone.buttonImage} />
        </TouchableOpacity>
      </View>
      
      <View style={isLargeScreen ? stylesLargeScreen.drawingContainer : stylesPhone.drawingContainer}>
        <TouchableOpacity style={isLargeScreen ? stylesLargeScreen.button : stylesPhone.button} onPress={handleDrawingPress}>
          <Image source={require("../screen/assets/drawing.png")} style={isLargeScreen ? stylesLargeScreen.buttonImage : stylesPhone.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Phone styles
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
  paintByNumbersButton: {
    width: 550,
    height: 160, // Slightly taller than the other buttons
    marginVertical: 5, // Keep margins consistent
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
});

// iPad styles
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
  paintByNumbersButton: {
    width: 375, 
    height: width * 0.46,
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
    marginTop: 15, 
    paddingBottom: '2%',
  },
});

export default HomeScreen;
