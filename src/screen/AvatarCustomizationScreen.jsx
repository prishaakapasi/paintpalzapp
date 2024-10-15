import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import { AvatarContext } from '../screen/AvatarContext';
import React, { useContext, useState } from 'react';
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


const avatarLabels = {
    boy: [
      "HAIRBAND        $3000",
      "BOW        $5000",
      "HAT        $4000",
      "CAP        $5600",
      "SUNGLASSES       $1000",
      "EARRINGS        $900",
      "STAR SHIRT        $8000",
      "HAIRBAND        $7500",
    ],
    girl: [
      "HAIRBAND        $3000",
      "BOW        $5000",
      "HAT        $4000",
      "CAP        $5600",
      "SUNGLASSES       $1000",
      "EARRINGS        $900",
      "STAR SHIRT        $8000",
      "HAIRBAND        $7500",
    ],
  };
  
  const UserProfileScreen = () => {
    const { selectedGender, selectedAvatar } = useContext(AvatarContext);
    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();
  
    const [headerText, setHeaderText] = useState('0'); // User's balance
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemPrice, setItemPrice] = useState('');
    const [hasPurchased, setHasPurchased] = useState(false); // Track if a purchase has been made
  
    const getImagesToDisplay = () => {
      const avatarIndex = selectedAvatar.split('-').pop().split('.')[0] - 1;
      return avatarImages[selectedGender][avatarIndex] || [];
    };
  
    const getLabelsToDisplay = () => {
      return avatarLabels[selectedGender] || [];
    };
  
    const handleHomePress = () => {
      navigation.navigate('Home');
    };
  
    const handleAvatarPress = (item, index) => {
      setSelectedItem(item);
      setItemPrice(getPriceForLabel(index)); // Set the price based on index
      setModalVisible(true);
    };
  
    const getPriceForLabel = (index) => {
      const labels = getLabelsToDisplay();
      const priceString = labels[index].match(/\$([0-9,]+)/);
      return priceString ? parseInt(priceString[1].replace(/,/g, '')) : 0; // Return the price as a number
    };
  
    const closePurchaseModal = () => {
      setModalVisible(false);
      setSelectedItem(null);
      setItemPrice('');
    };
  
    const handlePurchase = () => {
      const balance = parseInt(headerText); // Convert header text to an integer
      const price = itemPrice;
  
      if (balance < price) {
        Alert.alert("Insufficient Funds", "Create more artwork to raise your funds!!!");
      } else {
        console.log("Purchase item");
        setHasPurchased(true); // Update purchase state
        // Logic to deduct price from balance and proceed with the purchase
        closePurchaseModal(); // Close the modal after purchase
      }
    };
  
    const imagesToDisplay = getImagesToDisplay();
    const labelsToDisplay = getLabelsToDisplay();
  
    // Get the current avatar to display at the top
    const currentAvatarIndex = selectedAvatar.split('-').pop().split('.')[0] - 1;
    const currentAvatar = avatarImages[selectedGender][currentAvatarIndex]?.[0]; // Display the first image of the selected avatar
  
    return (
      <View style={styles.container}>
        <View style={styles.homeButton}>
          <TouchableOpacity onPress={handleHomePress}>
            <Image source={require("../screen/assets/home.png")} style={styles.home} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
          <Header
            text={headerText}
            onSettingsPress={() => navigation.navigate('Settings')}
            iconColor="#FFFFFF"
            textColor="#FFFFFF"
          />
        </View>
  
        {/* Display current avatar at the top only if no purchases have been made */}
        {!hasPurchased && currentAvatar && (
          <Image source={currentAvatar} style={styles.currentAvatar} />
        )}
  
        <Text style={styles.text}>AVATAR SHOP</Text>
  
        <View style={styles.imageGrid}>
          {imagesToDisplay.map((image, index) => (
            <TouchableOpacity key={index} onPress={() => handleAvatarPress(image, index)}>
              <Image source={image} style={[styles.image, { width: screenWidth / 4, height: screenWidth / 4 }]} />
              <Text style={styles.label}>{labelsToDisplay[index]}</Text>
            </TouchableOpacity>
          ))}
        </View>
  
        {/* Modal for Purchase Options */}
        {selectedItem && (
          <Modal transparent={true} visible={modalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Purchase Item</Text>
                <Image source={selectedItem} style={styles.modalImage} />
                <Text style={styles.priceText}>Price: ${itemPrice}</Text> 
                <Button title="Purchase" onPress={handlePurchase} />
                <Button title="Cancel" onPress={closePurchaseModal} />
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  };
  
  export default UserProfileScreen;
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#213D61',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
      marginTop: '3%',
    },
    homeButton: {
      position: 'absolute',
      top: '6%', 
      right: '5%', 
      zIndex: 10,
    },
    home: {
      width: 30,
      height: 30,
    },
    currentAvatar: {
      width: 170, // Adjust the size as needed
      height: 170, // Adjust the size as needed
      marginVertical: 20, // Space between the avatar and other elements
      borderRadius: 0, // Make it circular if you want
      borderWidth: 2, // Optional: border width
      borderColor: '#fff', 
      marginTop:'14%',// Optional: border color
    },
    text: {
      color: '#FFFFFF',
      fontSize: 20,
      marginBottom: 20,
    },
    imageGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      margin: 5,
    },
    label: {
      textAlign: 'center',
      color: '#FFFFFF',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    modalImage: {
      width: 100, // Adjust size
      height: 100, // Adjust size
      alignSelf: 'center',
    },
    priceText: {
      fontSize: 16,
      marginVertical: 10,
    },
  });