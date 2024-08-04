import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LoginScreen = () => {
  return (
    <View styles={styles.container}>
      <Text>LoginScreen</Text>
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#213D61",
        flex: 1,
  },
})