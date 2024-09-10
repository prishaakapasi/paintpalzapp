import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image, Alert, Text, Dimensions, TouchableOpacity, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GalleryScreen = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // To store the selected image for zooming
  const [modalVisible, setModalVisible] = useState(false);  // To control the modal visibility
  const screenHeight = Dimensions.get('window').height; // Get screen height

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const existingGallery = await AsyncStorage.getItem('gallery');
        const gallery = existingGallery ? JSON.parse(existingGallery) : [];
        setGallery(gallery);
      } catch (error) {
        console.error('Error fetching gallery', error);
        Alert.alert('Error', 'Failed to load gallery images');
      }
    };

    fetchGalleryImages();
  }, []);

  // Function to remove an image from the gallery
  const removeImage = async () => {
    const updatedGallery = gallery.filter((image) => image !== selectedImage);
    setGallery(updatedGallery);
    setModalVisible(false); // Close the modal after deleting the image

    try {
      await AsyncStorage.setItem('gallery', JSON.stringify(updatedGallery));
    } catch (error) {
      console.error('Error updating gallery', error);
      Alert.alert('Error', 'Failed to update gallery');
    }
  };

  // Function to handle image click and open the modal
  const openModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <Image source={{ uri: item }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GALLERY</Text>
      <FlatList
        data={gallery}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Display items in two columns
        contentContainerStyle={styles.flatListContainer}
        style={[styles.flatList, { marginTop: screenHeight * 0.1 }]} // Add marginTop equal to 10% of the screen height
      />

      {/* Modal for showing the selected image in full screen */}
      {selectedImage && (
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
            <Button title="Delete" onPress={removeImage} color="red" />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>
      )}
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
    fontSize: 24,
    color: '#FFF',
    marginBottom: 10, // Adjust the margin between title and the images if needed
    marginTop: '10%',
  },
  flatList: {
    flexGrow: 1, // Make sure the FlatList grows with content
    width: '100%', // FlatList takes full width of the screen
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
    backgroundColor: 'rgba(0,0,0,0.8)', // Semi-transparent background
  },
  fullScreenImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default GalleryScreen;
