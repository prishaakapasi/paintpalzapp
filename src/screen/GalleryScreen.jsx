import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image, Alert, Text, Dimensions, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';  // Ensure this is your Supabase config

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
  const [userId, setUserId] = useState(null);  // State for storing the user ID
  const screenHeight = Dimensions.get('window').height;

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
  }, []);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      if (!userId) return;  // Wait until userId is available
  
      try {
        // Fetch images from Supabase based on the user ID
        const { data, error } = await supabase
          .from('profiles')
          .select('image_data, paint_data')
          .eq('id', userId);  // Match with user ID
  
        if (error) {
          console.error('Error fetching gallery from Supabase:', error);
          Alert.alert('Error', 'Failed to load gallery images');
          return;
        }
  
        if (data && data.length > 0) {
          console.log('Supabase data:', data); // Log the entire response
  
          const images = [];
  
          // Log the values of image_data and paint_data to check
          console.log('image_data:', data[0].image_data);
          console.log('paint_data:', data[0].paint_data);
  
          // Combine both image_data and paint_data if available
          if (data[0].image_data) {
            images.push(data[0].image_data);  // Add image_data to gallery
          }
          if (data[0].paint_data) {
            images.push(data[0].paint_data);  // Add paint_data to gallery
          }
  
          setGallery(images);  // Update state with fetched images
        }
      } catch (error) {
        console.error('Error fetching gallery', error);
        Alert.alert('Error', 'Failed to load gallery images');
      }
    };
  
    fetchGalleryImages();
  }, [userId]);
  

  const handleHomePress = () => {
    navigation.navigate('Home'); 
  };

  const removeImage = async () => {
    try {
        // Update gallery by removing the selected image from the local state
        const updatedGallery = gallery.filter((image) => image !== selectedImage);
        setGallery(updatedGallery);
        setModalVisible(false);

        // First, fetch the current coins value and both image data columns
        const { data: profileData, error: fetchError } = await supabase
            .from('profiles')
            .select('coins, image_data, paint_data')  // Fetch current coins and both image data columns
            .eq('id', userId)
            .single();  // Get a single record

        // Check for fetch errors
        if (fetchError) {
            console.error('Error fetching profile:', fetchError);
            return; // Exit if there's an error
        } 

        console.log(`Current coins: ${profileData.coins}`);

        // Determine which column contains the selected image
        let columnToUpdate = null;
        if (profileData.image_data && profileData.image_data === selectedImage) {
            columnToUpdate = 'image_data';
        } else if (profileData.paint_data && profileData.paint_data === selectedImage) {
            columnToUpdate = 'paint_data';
        } else {
            console.error('Selected image not found in either column.');
            Alert.alert('Error', 'Selected image not found in profile.');
            return; // Exit if the image is not found
        }

        // Subtract 10 from the current coins value
        const newCoinsValue = profileData.coins - 10;

        // Prepare the update object
        const updateData = {
            coins: newCoinsValue,  // Update coins
        };

        // Clear the image data for the specified column
        updateData[columnToUpdate] = "";  // Set to empty string instead of null

        // Update the profile with the new data
        const { data, error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', userId);  // Match by user ID

        // Check for update errors
        if (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to delete the image');
            return; // Exit if there's an error
        }

        console.log('Image deleted from Supabase successfully:', data);

        // Update the local AsyncStorage if applicable
        await AsyncStorage.setItem('gallery', JSON.stringify(updatedGallery));

    } catch (error) {
        console.error('Error updating gallery:', error);
        Alert.alert('Error', 'Failed to update gallery');
    }
};

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <Image source={{ uri: item }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.homeButton}>
        <TouchableOpacity onPress={handleHomePress}>
          <Image source={require("../screen/assets/home.png")} style={styles.home} />
        </TouchableOpacity>
      </View>
      <Header 
        onSettingsPress={() => navigation.navigate('Settings')}
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
      {selectedImage && (
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
