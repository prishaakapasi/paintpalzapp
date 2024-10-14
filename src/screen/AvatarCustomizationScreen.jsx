import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { AvatarContext } from '../screen/AvatarContext';
import React, { useContext } from 'react';

// Constants for avatar images based on gender and avatar types
const avatarImages = {
  boy: [
    [
      require('../screen/avatars/boyavatars-08.png'),
      require('../screen/avatars/boyavatars-15.png'),
      require('../screen/avatars/boyavatars-22.png'),
      require('../screen/avatars/boyavatars-29.png'),
      require('../screen/avatars/boyavatars-36.png'),
      require('../screen/avatars/boyavatars-43.png'),
      require('../screen/avatars/boyavatars-50.png'),
      require('../screen/avatars/boyavatars-57.png'), 
    ],
    [
      require('../screen/avatars/boyavatars-09.png'),
      require('../screen/avatars/boyavatars-16.png'),
      require('../screen/avatars/boyavatars-23.png'),
      require('../screen/avatars/boyavatars-30.png'),
      require('../screen/avatars/boyavatars-37.png'),
      require('../screen/avatars/boyavatars-44.png'),
      require('../screen/avatars/boyavatars-51.png'),
      require('../screen/avatars/boyavatars-58.png'),
    ],
    [
      require('../screen/avatars/boyavatars-10.png'),
      require('../screen/avatars/boyavatars-17.png'),
      require('../screen/avatars/boyavatars-24.png'),
      require('../screen/avatars/boyavatars-31.png'),
      require('../screen/avatars/boyavatars-38.png'),
      require('../screen/avatars/boyavatars-45.png'),
      require('../screen/avatars/boyavatars-52.png'),
      require('../screen/avatars/boyavatars-59.png'),
    ],
    [
      require('../screen/avatars/boyavatars-11.png'),
      require('../screen/avatars/boyavatars-18.png'),
      require('../screen/avatars/boyavatars-25.png'),
      require('../screen/avatars/boyavatars-32.png'),
      require('../screen/avatars/boyavatars-39.png'),
      require('../screen/avatars/boyavatars-46.png'),
      require('../screen/avatars/boyavatars-53.png'),
      require('../screen/avatars/boyavatars-60.png'),
    ],
    [
      require('../screen/avatars/boyavatars-12.png'),
      require('../screen/avatars/boyavatars-19.png'),
      require('../screen/avatars/boyavatars-26.png'),
      require('../screen/avatars/boyavatars-33.png'),
      require('../screen/avatars/boyavatars-40.png'),
      require('../screen/avatars/boyavatars-47.png'),
      require('../screen/avatars/boyavatars-54.png'),
      require('../screen/avatars/boyavatars-61.png'),
    ],
    [
      require('../screen/avatars/boyavatars-13.png'),
      require('../screen/avatars/boyavatars-20.png'),
      require('../screen/avatars/boyavatars-27.png'),
      require('../screen/avatars/boyavatars-34.png'),
      require('../screen/avatars/boyavatars-41.png'),
      require('../screen/avatars/boyavatars-48.png'),
      require('../screen/avatars/boyavatars-55.png'),
      require('../screen/avatars/boyavatars-62.png'),
    ],
    [
      require('../screen/avatars/boyavatars-14.png'),
      require('../screen/avatars/boyavatars-21.png'),
      require('../screen/avatars/boyavatars-28.png'),
      require('../screen/avatars/boyavatars-35.png'),
      require('../screen/avatars/boyavatars-42.png'),
      require('../screen/avatars/boyavatars-49.png'),
      require('../screen/avatars/boyavatars-56.png'),
      require('../screen/avatars/boyavatars-63.png'),
    ],
  ],
  girl: [
    [
      require('../screen/avatars/avatargirls-08.png'),
      require('../screen/avatars/avatargirls-15.png'),
      require('../screen/avatars/avatargirls-22.png'),
      require('../screen/avatars/avatargirls-29.png'),
      require('../screen/avatars/avatargirls-36.png'),
      require('../screen/avatars/avatargirls-43.png'),
      require('../screen/avatars/avatargirls-50.png'),
      require('../screen/avatars/avatargirls-57.png'),
    ],
    [
      require('../screen/avatars/avatargirls-09.png'),
      require('../screen/avatars/avatargirls-16.png'),
      require('../screen/avatars/avatargirls-23.png'),
      require('../screen/avatars/avatargirls-30.png'),
      require('../screen/avatars/avatargirls-37.png'),
      require('../screen/avatars/avatargirls-44.png'),
      require('../screen/avatars/avatargirls-51.png'),
      require('../screen/avatars/avatargirls-58.png'),
    ],
    [
      require('../screen/avatars/avatargirls-10.png'),
      require('../screen/avatars/avatargirls-17.png'),
      require('../screen/avatars/avatargirls-24.png'),
      require('../screen/avatars/avatargirls-31.png'),
      require('../screen/avatars/avatargirls-38.png'),
      require('../screen/avatars/avatargirls-45.png'),
      require('../screen/avatars/avatargirls-52.png'),
      require('../screen/avatars/avatargirls-59.png'),
    ],
    [
      require('../screen/avatars/avatargirls-11.png'),
      require('../screen/avatars/avatargirls-18.png'),
      require('../screen/avatars/avatargirls-25.png'),
      require('../screen/avatars/avatargirls-32.png'),
      require('../screen/avatars/avatargirls-39.png'),
      require('../screen/avatars/avatargirls-46.png'),
      require('../screen/avatars/avatargirls-53.png'),
      require('../screen/avatars/avatargirls-60.png'),
    ],
    [
      require('../screen/avatars/avatargirls-12.png'),
      require('../screen/avatars/avatargirls-19.png'),
      require('../screen/avatars/avatargirls-26.png'),
      require('../screen/avatars/avatargirls-33.png'),
      require('../screen/avatars/avatargirls-40.png'),
      require('../screen/avatars/avatargirls-47.png'),
      require('../screen/avatars/avatargirls-54.png'),
      require('../screen/avatars/avatargirls-61.png'),
    ],
    [
      require('../screen/avatars/avatargirls-13.png'),
      require('../screen/avatars/avatargirls-20.png'),
      require('../screen/avatars/avatargirls-27.png'),
      require('../screen/avatars/avatargirls-34.png'),
      require('../screen/avatars/avatargirls-41.png'),
      require('../screen/avatars/avatargirls-48.png'),
      require('../screen/avatars/avatargirls-55.png'),
      require('../screen/avatars/avatargirls-62.png'),
    ],
    [
      require('../screen/avatars/avatargirls-14.png'),
      require('../screen/avatars/avatargirls-21.png'),
      require('../screen/avatars/avatargirls-28.png'),
      require('../screen/avatars/avatargirls-35.png'),
      require('../screen/avatars/avatargirls-42.png'),
      require('../screen/avatars/avatargirls-49.png'),
      require('../screen/avatars/avatargirls-56.png'),
      require('../screen/avatars/avatargirls-63.png'),
    ],
  ],
};

const UserProfileScreen = () => {
  const { selectedGender, selectedAvatar } = useContext(AvatarContext);
  const screenWidth = Dimensions.get('window').width;

  // Determine which images to display based on the selected gender and avatar
  const getImagesToDisplay = () => {
    if (typeof selectedAvatar[0] !== 'string') {
      console.error('selectedAvatar is not a string:', selectedAvatar);
      return []; // Return an empty array if selectedAvatar is not a string
    }

    const avatarIndex = selectedAvatar.split('-').pop().split('.')[0] - 1; // Extract the avatar number
    return avatarImages[selectedGender][avatarIndex] || []; // Default to an empty array if not found
  };

  const imagesToDisplay = getImagesToDisplay();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Customize</Text>
      <View style={styles.imageGrid}>
        {imagesToDisplay.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={[styles.image, { width: screenWidth / 4, height: screenWidth / 4 }]}
          />
        ))}
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  image: {
    margin: 5,
    resizeMode: 'contain',
  },
});
