import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('window');

const isLargeScreen = width > 600;

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.paintPalzLogoContainer}>
        <Image source={require("../screen/assets/paintpalzlogo.png")} style={styles.logo} />
      </View>
      <View style={styles.textContainer}> 
        <Text style={styles.text}>SIGN IN TO YOUR ACCOUNT</Text>
      </View>
    </View>
  );
}

export default LoginScreen;

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
    marginTop: isLargeScreen ? '15%' : '20%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: isLargeScreen ? 30 : 25,
    fontWeight: "bold", 
  }
});
