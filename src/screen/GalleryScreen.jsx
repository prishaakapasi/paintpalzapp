import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image, Alert, Text, Dimensions, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

// Example URIs for excluded items
const EXCLUDED_ITEMS = [
  'uri1', // Replace with actual URIs of excluded images
  'uri2',
];

const GalleryButton = () => (
  <View style={styles.galleryButtonContainer}>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>View Other Artwork</Text>
    </TouchableOpacity>
  </View>
);

const GalleryScreen = () => {
  const navigation = useNavigation();
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const existingGallery = await AsyncStorage.getItem('gallery');
        if (existingGallery) {
          setGallery(JSON.parse(existingGallery));
        }
        // Initialize headerText if not present
        const storedText = await AsyncStorage.getItem('headerText');
        if (!storedText) {
          await AsyncStorage.setItem('headerText', '0');
        }
      } catch (error) {
        console.error('Error fetching gallery', error);
        Alert.alert('Error', 'Failed to load gallery images');
      }
    };

    fetchGalleryImages();
  }, []);

  const handleHomePress = () => {
    navigation.navigate('Home'); 
  };

  const removeImage = async () => {
    try {
      // Update gallery
      const updatedGallery = gallery.filter((image) => image !== selectedImage);
      setGallery(updatedGallery);
      setModalVisible(false);
  
      // Update gallery in AsyncStorage
      await AsyncStorage.setItem('gallery', JSON.stringify(updatedGallery));
  
      // Fetch current headerText
      const storedText = await AsyncStorage.getItem('headerText');
      const currentHeaderText = storedText ? parseInt(storedText, 10) : 0;
  
      // Calculate new headerText based on gallery length
      const newHeaderText = updatedGallery.length > 0 ? (currentHeaderText - 10).toString() : '0';
      
      // Save new headerText to AsyncStorage
      await AsyncStorage.setItem('headerText', newHeaderText);
      
      console.log(`Updated headerText: ${newHeaderText}`); // For debugging
    } catch (error) {
      console.error('Error updating gallery or header text', error);
      Alert.alert('Error', 'Failed to update gallery or header text');
    }
  };

  const openModal = (imageUri) => {
    if (!EXCLUDED_ITEMS.includes(imageUri)) {
      setSelectedImage(imageUri);
      setModalVisible(true);
    } else {
      Alert.alert('Notice', 'This image cannot be viewed.');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <Image source={{ uri: item }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.homeButton}>
        <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Image source={require("../screen/assets/home.png")} style={styles.home} />
        </TouchableOpacity>
      </View>
      <Header 
        onSettingsPress={() => console.log('Settings Pressed')}
        iconColor="#FFFFFF"
        textColor="#FFFFFF"
      />
      <Text style={styles.title}>GALLERY</Text>
      <FlatList
        data={gallery}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        style={[styles.flatList, { marginTop: screenHeight * 0.1 }]}
      />
      {selectedImage && !EXCLUDED_ITEMS.includes(selectedImage) && (
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
            <TouchableOpacity style={styles.modalButton} onPress={removeImage}>
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <GalleryButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#213D61',
  },
  title: {
    fontSize: 30,
    color: '#FFF',
    marginBottom: 10,
    marginTop: '25%',
    fontWeight: 'bold',
  },
  homeButton: {
    position: 'absolute',
    top: '3%', 
    marginTop: '5%',
    right: '5%',
    zIndex: 10,
  },
  home: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  flatList: {
    flexGrow: 1,
    width: '100%',
  },
  flatListContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullScreenImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  galleryButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#213D61',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#213D61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GalleryScreen;
