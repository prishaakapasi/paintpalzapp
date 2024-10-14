import React, { useContext } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, Button } from 'react-native';
import { GlobalStateContext } from './GlobalState';

const UserProfileScreen = () => {
  const { selectedGender, selectedAvatar } = useContext(GlobalStateContext);
  const screenWidth = Dimensions.get('window').width;

  // Image arrays for boy avatars
  const boyImagesForAvatar1 = [
    require('../screen/avatars/boyavatars-08.png'),
    require('../screen/avatars/boyavatars-15.png'),
    require('../screen/avatars/boyavatars-22.png'),
    require('../screen/avatars/boyavatars-29.png'),
    require('../screen/avatars/boyavatars-36.png'),
    require('../screen/avatars/boyavatars-43.png'),
    require('../screen/avatars/boyavatars-50.png'),
    require('../screen/avatars/boyavatars-57.png'),
  ];
  
  const boyImagesForAvatar2 = [
    require('../screen/avatars/boyavatars-09.png'),
    require('../screen/avatars/boyavatars-16.png'),
    require('../screen/avatars/boyavatars-23.png'),
    require('../screen/avatars/boyavatars-30.png'),
    require('../screen/avatars/boyavatars-37.png'),
    require('../screen/avatars/boyavatars-44.png'),
    require('../screen/avatars/boyavatars-51.png'),
    require('../screen/avatars/boyavatars-58.png'),
  ];

  const boyImagesForAvatar3 = [
    require('../screen/avatars/boyavatars-10.png'),
    require('../screen/avatars/boyavatars-17.png'),
    require('../screen/avatars/boyavatars-24.png'),
    require('../screen/avatars/boyavatars-31.png'),
    require('../screen/avatars/boyavatars-38.png'),
    require('../screen/avatars/boyavatars-45.png'),
    require('../screen/avatars/boyavatars-52.png'),
    require('../screen/avatars/boyavatars-59.png'),
  ];

  const boyImagesForAvatar4 = [
    require('../screen/avatars/boyavatars-11.png'),
    require('../screen/avatars/boyavatars-18.png'),
    require('../screen/avatars/boyavatars-25.png'),
    require('../screen/avatars/boyavatars-32.png'),
    require('../screen/avatars/boyavatars-39.png'),
    require('../screen/avatars/boyavatars-46.png'),
    require('../screen/avatars/boyavatars-53.png'),
    require('../screen/avatars/boyavatars-60.png'),
  ];
  const boyImagesForAvatar5 = [
    require('../screen/avatars/boyavatars-12.png'),
    require('../screen/avatars/boyavatars-19.png'),
    require('../screen/avatars/boyavatars-26.png'),
    require('../screen/avatars/boyavatars-33.png'),
    require('../screen/avatars/boyavatars-40.png'),
    require('../screen/avatars/boyavatars-47.png'),
    require('../screen/avatars/boyavatars-54.png'),
    require('../screen/avatars/boyavatars-61.png'),
  ];
  const boyImagesForAvatar6 = [
    require('../screen/avatars/boyavatars-13.png'),
    require('../screen/avatars/boyavatars-20.png'),
    require('../screen/avatars/boyavatars-27.png'),
    require('../screen/avatars/boyavatars-34.png'),
    require('../screen/avatars/boyavatars-41.png'),
    require('../screen/avatars/boyavatars-48.png'),
    require('../screen/avatars/boyavatars-55.png'),
    require('../screen/avatars/boyavatars-62.png'),
  ];
  const boyImagesForAvatar7 = [
    require('../screen/avatars/boyavatars-14.png'),
    require('../screen/avatars/boyavatars-21.png'),
    require('../screen/avatars/boyavatars-28.png'),
    require('../screen/avatars/boyavatars-35.png'),
    require('../screen/avatars/boyavatars-42.png'),
    require('../screen/avatars/boyavatars-49.png'),
    require('../screen/avatars/boyavatars-56.png'),
    require('../screen/avatars/boyavatars-63.png'),
  ];
  // Image arrays for girl avatars
  const girlImagesForAvatar1 = [
    require('../screen/avatars/avatargirls-08.png'),
    require('../screen/avatars/avatargirls-15.png'),
    require('../screen/avatars/avatargirls-22.png'),
    require('../screen/avatars/avatargirls-29.png'),
    require('../screen/avatars/avatargirls-36.png'),
    require('../screen/avatars/avatargirls-43.png'),
    require('../screen/avatars/avatargirls-50.png'),
    require('../screen/avatars/avatargirls-57.png'),
    
  ];

  const girlImagesForAvatar2 = [
    require('../screen/avatars/avatargirls-09.png'),
    require('../screen/avatars/avatargirls-16.png'),
    require('../screen/avatars/avatargirls-23.png'),
    require('../screen/avatars/avatargirls-30.png'),
    require('../screen/avatars/avatargirls-37.png'),
    require('../screen/avatars/avatargirls-44.png'),
    require('../screen/avatars/avatargirls-51.png'),
    require('../screen/avatars/avatargirls-58.png'),
  ];

  const girlImagesForAvatar3 = [
    require('../screen/avatars/avatargirls-10.png'),
    require('../screen/avatars/avatargirls-17.png'),
    require('../screen/avatars/avatargirls-24.png'),
    require('../screen/avatars/avatargirls-31.png'),
    require('../screen/avatars/avatargirls-38.png'),
    require('../screen/avatars/avatargirls-45.png'),
    require('../screen/avatars/avatargirls-52.png'),
    require('../screen/avatars/avatargirls-59.png'),
  ];

  const girlImagesForAvatar4 = [
    require('../screen/avatars/avatargirls-11.png'),
    require('../screen/avatars/avatargirls-18.png'),
    require('../screen/avatars/avatargirls-25.png'),
    require('../screen/avatars/avatargirls-32.png'),
    require('../screen/avatars/avatargirls-39.png'),
    require('../screen/avatars/avatargirls-46.png'),
    require('../screen/avatars/avatargirls-53.png'),
    require('../screen/avatars/avatargirls-60.png'),
  ];

  const girlImagesForAvatar5 = [
    require('../screen/avatars/avatargirls-12.png'),
    require('../screen/avatars/avatargirls-19.png'),
    require('../screen/avatars/avatargirls-26.png'),
    require('../screen/avatars/avatargirls-33.png'),
    require('../screen/avatars/avatargirls-40.png'),
    require('../screen/avatars/avatargirls-47.png'),
    require('../screen/avatars/avatargirls-54.png'),
    require('../screen/avatars/avatargirls-61.png'),
  ];
  const girlImagesForAvatar6 = [
    require('../screen/avatars/avatargirls-13.png'),
    require('../screen/avatars/avatargirls-20.png'),
    require('../screen/avatars/avatargirls-27.png'),
    require('../screen/avatars/avatargirls-34.png'),
    require('../screen/avatars/avatargirls-41.png'),
    require('../screen/avatars/avatargirls-48.png'),
    require('../screen/avatars/avatargirls-55.png'),
    require('../screen/avatars/avatargirls-62.png'),
  ];
  const girlImagesForAvatar7 = [
    require('../screen/avatars/avatargirls-14.png'),
    require('../screen/avatars/avatargirls-21.png'),
    require('../screen/avatars/avatargirls-28.png'),
    require('../screen/avatars/avatargirls-35.png'),
    require('../screen/avatars/avatargirls-42.png'),
    require('../screen/avatars/avatargirls-49.png'),
    require('../screen/avatars/avatargirls-56.png'),
    require('../screen/avatars/avatargirls-63.png'),
  ];
  
  // Determine the images to display based on the selected gender and avatar
  let imagesToDisplay = [];
  
  if (selectedGender === 'boy') {
    if (selectedAvatar === 'boyavatars-01.png') {
      imagesToDisplay = boyImagesForAvatar1;
    } else if (selectedAvatar === 'boyavatars-02.png') {
      imagesToDisplay = boyImagesForAvatar2;
    }
    else if (selectedAvatar === 'boyavatars-03.png') {
        imagesToDisplay = boyImagesForAvatar3;
      }

      else if (selectedAvatar === 'boyavatars-04.png') {
        imagesToDisplay = boyImagesForAvatar4;
      }
      else if (selectedAvatar === 'boyavatars-05.png') {
        imagesToDisplay = boyImagesForAvatar5;
      }
      else if (selectedAvatar === 'boyavatars-06.png') {
        imagesToDisplay = boyImagesForAvatar6;
      }
      else if (selectedAvatar === 'boyavatars-07.png') {
        imagesToDisplay = boyImagesForAvatar7;
      }
    }
    if (selectedGender === 'girl') {
        if (selectedAvatar === 'avatargirls-01.png') {
          imagesToDisplay = girlImagesForAvatar1;
        } else if (selectedAvatar === 'avatargirls-02.png') {
          imagesToDisplay = girlImagesForAvatar2;
        }
        else if (selectedAvatar === 'avatargirls-03.png') {
            imagesToDisplay = girlImagesForAvatar3;
          }
    
          else if (selectedAvatar === 'avatargirls-04.png') {
            imagesToDisplay = girlImagesForAvatar4;
          }
          else if (selectedAvatar === 'avatargirls-05.png') {
            imagesToDisplay = girlImagesForAvatar5;
          }
          else if (selectedAvatar === 'avatargirls-06.png') {
            imagesToDisplay = girlImagesForAvatar6;
          }
          else if (selectedAvatar === 'avatargirls-07.png') {
            imagesToDisplay = girlImagesForAvatar7;
          }
        }
      

  return (
    <View style={styles.container}>
      {/* Display the selected image at the top */}
      <Image source={require('../screen/avatars/' + selectedAvatar)} style={[styles.selectedImage, { width: screenWidth * 0.6 }]} />
      
      <Text style={styles.title}>Other Avatar Purchases</Text>
      
      {/* Display the purchasing options for other images */}
      <View style={styles.avatarContainer}>
        {imagesToDisplay.map((image, index) => (
          <View key={index} style={styles.avatarItem}>
            <Image source={image} style={styles.avatarImage} />
            {/* Placeholder for purchasing option */}
            <Button title="Purchase" onPress={() => console.log('Purchasing avatar:', index + 1)} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  selectedImage: {
    height: 200,
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatarItem: {
    margin: 10,
    alignItems: 'center',
  },
  avatarImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default UserProfileScreen;
