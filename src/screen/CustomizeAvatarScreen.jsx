import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useAvatar } from './AvatarContext'; // Import the avatar context

const DisplayScreen = () => {
  const { selectedGender, selectedAvatarIndex } = useAvatar(); // Get selected gender and avatar index from context

  // Different sets of images to display based on selected gender and avatar index
  const avatarImageSets = {
    boy: [
      [
        require('../screen/displayImages/avatar1_image1.png'),
        require('../screen/displayImages/avatar1_image2.png'),
        require('../screen/displayImages/avatar1_image3.png'),
      ],
      [
        require('../screen/displayImages/avatar2_image1.png'),
        require('../screen/displayImages/avatar2_image2.png'),
        require('../screen/displayImages/avatar2_image3.png'),
      ],
      [
        require('../screen/displayImages/avatar3_image1.png'),
        require('../screen/displayImages/avatar3_image2.png'),
        require('../screen/displayImages/avatar3_image3.png'),
      ],
      // Add more arrays for additional boy avatars as needed...
    ],
    girl: [
      [
        require('../screen/displayImages/girl_avatar1_image1.png'),
        require('../screen/displayImages/girl_avatar1_image2.png'),
        require('../screen/displayImages/girl_avatar1_image3.png'),
      ],
      [
        require('../screen/displayImages/girl_avatar2_image1.png'),
        require('../screen/displayImages/girl_avatar2_image2.png'),
        require('../screen/displayImages/girl_avatar2_image3.png'),
      ],
      [
        require('../screen/displayImages/girl_avatar3_image1.png'),
        require('../screen/displayImages/girl_avatar3_image2.png'),
        require('../screen/displayImages/girl_avatar3_image3.png'),
      ],
      // Add more arrays for additional girl avatars as needed...
    ],
  };

  // Check if an avatar has been selected and get the corresponding image set
  const selectedImageSet = selectedGender && selectedAvatarIndex !== null
    ? avatarImageSets[selectedGender][selectedAvatarIndex]
    : null;

  return (
    <View style={styles.container}>
      {selectedImageSet ? (
        <>
          <Text style={styles.avatarText}>
            You selected {selectedGender} avatar #{selectedAvatarIndex + 1}
          </Text>
          {/* Scrollable container to display multiple images */}
          <ScrollView contentContainerStyle={styles.imageScroll}>
            {selectedImageSet.map((image, index) => (
              <Image key={index} source={image} style={styles.displayImage} />
            ))}
          </ScrollView>
        </>
      ) : (
        <Text>No avatar selected.</Text>
      )}
    </View>
  );
};

export default DisplayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    marginTop: 20,
    fontSize: 18,
  },
  imageScroll: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  displayImage: {
    width: 150,
    height: 150,
    margin: 10,
    resizeMode: 'contain',
  },
});
