import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600;

const Header = ({ onSettingsPress, iconColor = '#000000', textColor = '#000000' }) => {
  const [headerText, setHeaderText] = useState('0');

  useEffect(() => {
    const loadHeaderText = async () => {
      try {
        const storedText = await AsyncStorage.getItem('headerText');
        if (storedText) {
          setHeaderText(storedText);
        }
      } catch (error) {
        console.error('Failed to load header text', error);
      }
    };

    loadHeaderText();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onSettingsPress}
      >
        <Image source={require("../screen/assets/settings.png")} style={[styles.setting, { tintColor: iconColor }]} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={[styles.headerText, { color: textColor }]}>{headerText}</Text>
        <Image source={require("../screen/assets/toll.png")} style={[styles.coins, { tintColor: iconColor }]} />
      </View>
    </View>
  );
};


const stylesPhone = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 60,
  },
  headerText: {
    fontSize: 20,
    marginRight: 5,
  },
  coins: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  setting: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  touchable: {
    padding: 10, // Added padding to ensure touch area
    backgroundColor: 'rgba(0,0,0,0)', // Transparent background for debugging
  },
});

const stylesLargeScreen = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    left: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 80,
  },
  headerText: {
    fontSize: 25,
    marginRight: 10,
  },
  coins: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  setting: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  touchable: {
    padding: 10, // Added padding to ensure touch area
    backgroundColor: 'rgba(0,0,0,0)', // Transparent background for debugging
  },
});

const styles = isLargeScreen ? stylesLargeScreen : stylesPhone;

export default Header;
