import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, Button } from 'react-native';
import { AvatarContext } from '../screen/AvatarContext';
import React, { useContext, useState, useEffect } from 'react';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();

  const [headerText, setHeaderText] = useState('0');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(selectedAvatar); // Store currently selected avatar

  const getImagesToDisplay = () => {
    if (typeof selectedAvatar[0] !== 'string') {
      console.error('selectedAvatar is not a string:', selectedAvatar);
      return [];
    }

    const avatarIndex = selectedAvatar.split('-').pop().split('.')[0] - 1;
    return avatarImages[selectedGender][avatarIndex] || [];
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleAvatarPress = (item) => {
    setSelectedItem(item); // Set the selected item for the modal
    setModalVisible(true); // Open the modal
  };

  const closePurchaseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handlePurchase = () => {
    // Update the current avatar with the selected item
    setCurrentAvatar(selectedItem);
    closePurchaseModal();
    // You may want to also save the purchase to context or state if necessary
  };

  const imagesToDisplay = getImagesToDisplay();

  useEffect(() => {
    // Update the current avatar if selectedAvatar changes
    setCurrentAvatar(selectedAvatar);
  }, [selectedAvatar]);

  return (
    <View style={styles.container}>
      <Header onHomePress={handleHomePress} />
      <Text style={styles.header}>User Profile</Text>
      <View style={styles.avatarContainer}>
        <Image source={currentAvatar} style={styles.avatarImage} />
        <Text style={styles.avatarText}>Current Avatar:</Text>
      </View>
      <View style={styles.gridContainer}>
        {imagesToDisplay.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleAvatarPress(item)}>
            <Image source={item} style={styles.avatar} />
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closePurchaseModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are you sure you want to select this avatar?</Text>
          <Image source={selectedItem} style={styles.selectedAvatar} />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={closePurchaseModal} />
            <Button title="Confirm" onPress={handlePurchase} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    margin: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  selectedAvatar: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default UserProfileScreen;
