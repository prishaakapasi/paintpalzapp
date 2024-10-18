import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image, Alert, Text, Dimensions, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase'; 

const GalleryScreen = () => {
  const navigation = useNavigation(); 
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const screenHeight = Dimensions.get('window').height;

  const GalleryButton = ({ onPress }) => (
    <View style={styles.galleryButtonContainer}>
      <TouchableOpacity style={styles.button} onPress={handlePublishedArtworkPress}>
        <Text style={styles.buttonText}>View Published Artwork</Text>
      </TouchableOpacity>
    </View>
  );

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

  const handlePublishedArtworkPress = () => {
    console.log("Published Artwork pressed");
    navigation.navigate('Published Artwork');
  };

  const fetchGalleryImages = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('image_data, paint_data')
        .eq('id', userId);

      if (error) {
        console.error('Error fetching gallery from Supabase:', error);
        Alert.alert('Error', 'Failed to load gallery images');
        return;
      }

      if (data && data.length > 0) {
        const images = [];
        if (data[0].image_data) images.push(data[0].image_data);
        if (data[0].paint_data) images.push(data[0].paint_data);
        setGallery(images);
      }
    } catch (error) {
      console.error('Error fetching gallery', error);
      Alert.alert('Error', 'Failed to load gallery images');
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, [userId]);

  const handleHomePress = () => {
    navigation.navigate('Home'); 
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const deleteArtwork = async () => {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .delete()
        .eq('image_data', selectedImage)
        .eq('user_id', userId); // Ensure the user is the owner

      if (error) {
        console.error('Error deleting artwork:', error);
        Alert.alert('Error', 'Failed to delete artwork');
      } else {
        Alert.alert('Success', 'Artwork deleted successfully');
        setModalVisible(false);
        fetchGalleryImages(); // Refresh gallery after deletion
      }
    } catch (error) {
      console.error('Error during deletion:', error);
      Alert.alert('Error', 'Failed to delete artwork');
    }
  };

  const postArtworkPublicly = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'No artwork selected');
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          public_data: selectedImage, // You can modify this to handle multiple URLs if needed
        })
        .eq('id', userId);
  
      if (error) {
        console.error('Error posting artwork publicly:', error);
        Alert.alert('Error', 'Failed to post artwork publicly');
      } else {
        Alert.alert('Success', 'Artwork posted publicly!');
        setModalVisible(false);
        fetchGalleryImages(); // Refresh gallery after posting
      }
    } catch (error) {
      console.error('Error during posting publicly:', error);
      Alert.alert('Error', 'Failed to post artwork publicly');
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
      <GalleryButton onPress={() => {/* Navigate to published artwork screen */}} />

      {/* Modal for Viewing Image */}
      {selectedImage && (
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={deleteArtwork}>
              <Text style={styles.modalButtonText}>Delete Artwork</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={postArtworkPublicly}>
              <Text style={styles.modalButtonText}>Post Publicly</Text>
            </TouchableOpacity>
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
