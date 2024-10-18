import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { AvatarContext } from './AvatarContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';

const AvatarScreen = () => {
  const { selectedGender, setSelectedGender, selectedAvatar, setSelectedAvatar } = useContext(AvatarContext);
  const { width: screenWidth } = Dimensions.get('window');
  const navigation = useNavigation();
  const [userID, setUserId] = useState(null);

  // Static mappings for boy avatars
  const boyAvatars = [
    require('../screen/avatars/boyavatars-01.png'),
    require('../screen/avatars/boyavatars-02.png'),
    require('../screen/avatars/boyavatars-03.png'),
    require('../screen/avatars/boyavatars-04.png'),
    require('../screen/avatars/boyavatars-05.png'),
    require('../screen/avatars/boyavatars-06.png'),
    require('../screen/avatars/boyavatars-07.png'),
  ];

  // Static mappings for girl avatars
  const girlAvatars = [
    require('../screen/avatars/avatargirls-01.png'),
    require('../screen/avatars/avatargirls-02.png'),
    require('../screen/avatars/avatargirls-03.png'),
    require('../screen/avatars/avatargirls-04.png'),
    require('../screen/avatars/avatargirls-05.png'),
    require('../screen/avatars/avatargirls-06.png'),
    require('../screen/avatars/avatargirls-07.png'),
  ];

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

    return () => {
      setUserId(null);
    };
  }, []);

  const handleSelect = async () => {
    if (selectedAvatar) {
      // Update avatar URL in Supabase
      await handleAvatarSelect(selectedAvatar);
      navigation.navigate('Avatar Customization Screen');
    } else {
      alert('Please select an avatar first!');
    }
  };

  const handleAvatarSelect = async (avatar) => {
    setSelectedAvatar(avatar); // Set the selected avatar directly
    const avatarSource = Image.resolveAssetSource(avatar).uri; // Get the URI of the selected avatar

    // Update the avatar_url in the user's profile in Supabase
    const { data, error } = await supabase
      .from('profiles')
      .update({ avatar_url: avatarSource }) // Update the avatar_url field with the correct URI
      .eq('id', userID); // Match with the user ID

    if (error) {
      console.error('Error updating avatar URL', error);
    } else {
      console.log('Avatar URL updated successfully', data);
    }
  };

  const renderAvatars = (avatars) => {
    return avatars.map((avatar, index) => (
      <TouchableOpacity key={index} onPress={() => handleAvatarSelect(avatar)}>
        <Image
          source={avatar} // Use the avatar directly as the source
          style={[
            styles.image,
            { width: screenWidth / 4, height: screenWidth / 4 },
            selectedAvatar === avatar ? styles.selectedAvatar : null,
          ]}
        />
      </TouchableOpacity>
    ));
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}> CREATE AVATAR </Text>
        <Text style={styles.text2}> Indicate Your Condition to Connect with Others in Similar Situations </Text>
      </View>

      <View style={styles.genderSelectionContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'boy' ? styles.selectedButton : null,
          ]}
          onPress={() => setSelectedGender('boy')}
        >
          <Text style={selectedGender === 'boy' ? styles.selectedGenderText : styles.genderText}>Boy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'girl' ? styles.selectedButton : null,
          ]}
          onPress={() => setSelectedGender('girl')}
        >
          <Text style={selectedGender === 'girl' ? styles.selectedGenderText : styles.genderText}>Girl</Text>
        </TouchableOpacity>
      </View>

      {selectedGender === 'boy' ? (
        <View style={styles.imageContainer}>
          {renderAvatars(boyAvatars)}
        </View>
      ) : selectedGender === 'girl' ? (
        <View style={styles.imageContainer}>
          {renderAvatars(girlAvatars)}
        </View>
      ) : (
        <Text style={styles.placeholderText}>Please select a gender to see images.</Text>
      )}

      <TouchableOpacity style={styles.selectButton} onPress={handleSelect}>
        <Text style={styles.selectButtonText}>Select</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  genderSelectionContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
  text: {
    color: '#213D61',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    color: '#213D61',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  genderButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: '#213D61',
    borderWidth: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#213D61',
  },
  selectedGenderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  genderText: {
    color: '#213D61',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    resizeMode: 'contain',
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: '#213D61',
  },
  placeholderText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
  },
  selectButton: {
    backgroundColor: '#213D61',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
