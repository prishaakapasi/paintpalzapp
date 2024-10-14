import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { AvatarContext } from './AvatarContext';

const AvatarScreen = () => {
  const { selectedGender, setSelectedGender, selectedAvatar, setSelectedAvatar } = useContext(GlobalStateContext);
  const screenWidth = Dimensions.get('window').width;


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
    setSelectedAvatar(null); // Reset avatar when gender changes
  };

  const handleAvatarSelect = (avatar, index) => {
    setSelectedAvatar({ avatar, index }); // Store avatar and index
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
          {boyAvatars.map((avatar, index) => (
            <TouchableOpacity key={index} onPress={() => handleAvatarSelect(avatar, index)}>
              <Image
                source={avatar}
                style={[
                  styles.image,
                  { width: screenWidth / 4, height: screenWidth / 4 },
                  selectedAvatar?.avatar === avatar ? styles.selectedAvatar : null,
                ]}
              />
              {/* Display custom text below each image */}
              <Text style={styles.avatarText}>{avatarTexts[index]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : selectedGender === 'girl' ? (
        <View style={styles.imageContainer}>
          {girlAvatars.map((avatar, index) => (
            <TouchableOpacity key={index} onPress={() => handleAvatarSelect(avatar, index)}>
              <Image
                source={avatar}
                style={[
                  styles.image,
                  { width: screenWidth / 4, height: screenWidth / 4 },
                  selectedAvatar?.avatar === avatar ? styles.selectedAvatar : null,
                ]}
              />
              {/* Display custom text below each image */}
              <Text style={styles.avatarText}>{avatarTexts[index]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.placeholderText}>Please select a gender to see images.</Text>
      )}

      {/* Display selected avatar message */}
      {selectedAvatar && (
        <Text style={styles.selectedText}>
          Selected Avatar: {avatarTexts[selectedAvatar.index]}
        </Text>
      )}
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
  },
  genderSelectionContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  text: {
    color: '#213D61',
    fontSize: 35,
    fontWeight: 'bold',
  },
  genderButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, // Rounded corners
    marginHorizontal: 10,
    borderColor: '#213D61', // Border color
    borderWidth: 2, // Border width (you can adjust the thickness)
  },
  selectedButton: {
    backgroundColor: '#213D61',
  },
  selectedGenderText: {
    color: '#fff', // Text color for selected button
    fontSize: 18,
    fontWeight: 'bold',
  },
  genderText: {
    color: '#213D61', // Default text color for unselected buttons
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    padding: '5%',
    marginBottom: '2%',
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
  },
  selectedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#213D61',
  },
});
