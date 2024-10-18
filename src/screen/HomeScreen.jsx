import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Header from './Header'; 
import { AvatarContext } from '../screen/AvatarContext';
import { supabase } from '../../lib/supabase'; 

const { width, height } = Dimensions.get('window');
const isLargeScreen = width > 600;

const HomeScreen = () => {
  const navigation = useNavigation(); 
  const { selectedAvatar } = useContext(AvatarContext);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [headerText, setHeaderText] = useState('0'); 
  const [userID, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userID');
        console.log('Stored User ID:', storedUserId);
        if (storedUserId) {
          setUserId(storedUserId);
          fetchAvatar(storedUserId);
        }
      } catch (error) {
        console.error('Failed to load user ID', error);
      }
    };

    getUserId();
  }, []);

  const handleShopPress = () => {
    console.log("Shopping button pressed");
    navigation.navigate('Avatar Customization Screen'); 
  };

  const fetchAvatar = async (id) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', id)
        .single();
        
      if (error) {
        console.error('Error fetching avatar:', error);
      } else {
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error('Error during fetchAvatar:', error);
    }
  };

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

  return (
    <View style={isLargeScreen ? stylesLargeScreen.container : stylesPhone.container}>
      <Header 
        text={headerText}
        onSettingsPress={() => navigation.navigate('Settings')} 
        iconColor="#213D61" 
        textColor="#213D61" 
      />
      <TouchableOpacity style={isLargeScreen ? stylesLargeScreen.shopButton : stylesPhone.shopButton} onPress={handleShopPress}>
        <Image 
          source={require("../screen/assets/🦆 icon _cart_.png")} 
          style={isLargeScreen ? stylesLargeScreen.shopIcon : stylesPhone.shopIcon} 
        />
      </TouchableOpacity>

      <View style={isLargeScreen ? stylesLargeScreen.avatarscreen : stylesPhone.avatarscreen}>
        <Image 
          source={require("../screen/assets/avatar.png")} 
          style={isLargeScreen ? stylesLargeScreen.backgroundAvatar : stylesPhone.backgroundAvatar} 
        />
        {avatarUrl && (
          <Image 
            source={{ uri: avatarUrl }} 
            style={isLargeScreen ? stylesLargeScreen.avatar : stylesPhone.avatar} 
          />
        )}
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
    position: 'relative',
  },
  shopButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 10,
  },
  shopIcon: {
    width: 30, // Smaller size
    height: 30, // Smaller size
    resizeMode: 'contain',
  },
  backgroundAvatar: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    position: 'absolute',
  },
  avatar: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    position: 'absolute',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: height * 0.25,
  },
  button: {
    width: 400,
    height: 150,
    marginVertical: 5,
    borderRadius: 30,
    overflow: 'hidden',
  },
  paintByNumbersButton: {
    width: 550,
    height: 160,
    marginVertical: 5,
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
    marginTop: -8,
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
    position: 'relative',
  },
  backgroundAvatar: {
    width: 800,
    height: 400,
    resizeMode: 'contain',
    position: 'absolute',
  },
  avatar: {
    width: 800,
    height: 400,
    resizeMode: 'contain',
    position: 'absolute',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0.32,
    paddingHorizontal: 30,
  },
  button: {
    width: width * 0.45, 
    height: width * 0.45, 
    marginHorizontal: 8,
  },
  paintByNumbersButton: {
    width: 375, 
    height: 400,
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
  shopButton: {
    position: 'absolute',
    top: '4%',
    right: 20,
    zIndex: 10,
  },
  shopIcon: {
    width: 40, // Smaller size
    height: 40, // Smaller size
    resizeMode: 'contain',
  },
});

export default HomeScreen;
