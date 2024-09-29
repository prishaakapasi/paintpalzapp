// src/screen/LoadingScreen.js
import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007BFF" />
      <Text style={styles.loadingText}>Loading, please wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  loadingText: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default LoadingScreen;
