import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase'; 

const { width } = Dimensions.get('window');
const isLargeScreen = width > 600;

const Header = ({ onSettingsPress, iconColor = '#000000', textColor = '#000000' }) => {
  const [headerText, setHeaderText] = useState('0');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userID');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Failed to load user ID', error);
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    const loadHeaderText = async () => {
      if (!userId) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('coins')
          .eq('id', userId)  // Use the userId retrieved from AsyncStorage
          .single();  

        if (error) {
          console.error('Failed to load header text', error);
        } else if (data) {
          setHeaderText(data.coins);  // Update the headerText with coins value
        }
      } catch (error) {
        console.error('Failed to load header text', error);
      }
    };

    loadHeaderText();
  }, [userId]);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.touchable} onPress={onSettingsPress}>
        <Image 
          source={require("../screen/assets/settings.png")} 
          style={[styles.setting, { tintColor: iconColor }]} 
        />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={[styles.headerText, { color: textColor }]}>{headerText}</Text>
        <Image 
          source={require("../screen/assets/toll.png")} 
          style={[styles.coins, { tintColor: iconColor }]} 
        />
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
    padding: 10,
    backgroundColor: 'transparent',
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
    padding: 10,
    backgroundColor: 'transparent',
  },
});

const styles = isLargeScreen ? stylesLargeScreen : stylesPhone;

export default Header;
