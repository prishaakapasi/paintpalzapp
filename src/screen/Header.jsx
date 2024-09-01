import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600;

const Header = ({ text, onSettingsPress, whiteHeader }) => {
  const styles = whiteHeader ? stylesWhite : (isLargeScreen ? stylesLargeScreen : stylesPhone);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.touchable}
        onPress={onSettingsPress}
      >
        <Image source={require("../screen/assets/settings.png")} style={styles.setting} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={styles.headerText}>{text}</Text>
        <Image source={require("../screen/assets/toll.png")} style={styles.coins} />
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
    color: '#213D61',
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
    color: '#213D61',
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

const stylesWhite = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 60,
  },
  headerText: {
    fontSize: 20,
    color: '#213D61',
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

export default Header;
