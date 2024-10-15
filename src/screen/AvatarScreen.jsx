import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { AvatarContext } from './AvatarContext';
import { useNavigation } from '@react-navigation/native';

const AvatarScreen = () => {
  const { selectedGender, setSelectedGender, selectedAvatar, setSelectedAvatar } = useContext(AvatarContext);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const navigation = useNavigation();

  // Local state for selected condition, separate from global avatar state
  const [localSelectedCondition, setLocalSelectedCondition] = useState(null);

  const handleSelect = () => {
    // Ensure both an avatar and condition are selected before navigating
    if (selectedAvatar) {
      navigation.navigate('Avatar Customization Screen');
    } else {
      alert('Please select an avatar first!');
    }
  };

  // Static mappings for boy avatars
  const boyAvatars = [
    '../screen/avatars/boyavatars-01.png',
    '../screen/avatars/boyavatars-02.png',
    '../screen/avatars/boyavatars-03.png',
    '../screen/avatars/boyavatars-04.png',
    '../screen/avatars/boyavatars-05.png',
    '../screen/avatars/boyavatars-06.png',
    '../screen/avatars/boyavatars-07.png',
  ];

  // Static mappings for girl avatars
  const girlAvatars = [
    '../screen/avatars/avatargirls-01.png',
    '../screen/avatars/avatargirls-02.png',
    '../screen/avatars/avatargirls-03.png',
    '../screen/avatars/avatargirls-04.png',
    '../screen/avatars/avatargirls-05.png',
    '../screen/avatars/avatargirls-06.png',
    '../screen/avatars/avatargirls-07.png',
  ];

  // Custom texts for each avatar
  const avatarTexts = [
    "Respiratory", 
    "Infections",
    "Oncological", 
    "Trauma/Injuries",
    "Surgical",
    "Hematological", 
    "Other", 
  ];

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setSelectedAvatar(null);  // Reset the global avatar selection when gender changes
    setLocalSelectedCondition(null); // Reset the local condition selection when gender changes
  };

  // Handle avatar selection, update both global avatar state and local condition
  const handleAvatarSelect = (avatar, index) => {
    setSelectedAvatar(avatar);  // Update the global avatar state
    setLocalSelectedCondition(avatarTexts[index]); // Update local condition
  };

  const renderAvatars = (avatars) => {
    return avatars.map((avatar, index) => (
      <TouchableOpacity key={index} onPress={() => handleAvatarSelect(avatar, index)}>
        <Image
          source={avatar}
          style={[
            styles.image,
            { width: screenWidth / 4, height: screenWidth / 4 },
            selectedAvatar === avatar ? styles.selectedAvatar : null,
          ]}
        />
        <Text style={styles.avatarText}>{avatarTexts[index]}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}> 
        <Text style={styles.text}> CREATE AVATAR </Text>
        <Text style={styles.text2}> Indicate Your Condition to Connect with Others in Similar Situations </Text>
      </View>
      
      {/* Gender selection buttons */}
      <View style={styles.genderSelectionContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'boy' ? styles.selectedButton : null,
          ]}
          onPress={() => handleGenderSelect('boy')}
        >
          <Text style={selectedGender === 'boy' ? styles.selectedGenderText : styles.genderText}>Boy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'girl' ? styles.selectedButton : null,
          ]}
          onPress={() => handleGenderSelect('girl')}
        >
          <Text style={selectedGender === 'girl' ? styles.selectedGenderText : styles.genderText}>Girl</Text>
        </TouchableOpacity>
      </View>

      {/* Conditionally render boy or girl images based on selection */}
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

      {localSelectedCondition && (
        <Text style={styles.selectedText}>
          Selected Condition: {localSelectedCondition}
        </Text>
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
  avatarText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  placeholderText: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#213D61',
  },
  selectButton: {
    backgroundColor: '#213D61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
