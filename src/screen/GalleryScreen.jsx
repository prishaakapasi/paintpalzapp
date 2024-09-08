import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GalleryScreen = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const existingGallery = await AsyncStorage.getItem('gallery');
        const gallery = existingGallery ? JSON.parse(existingGallery) : [];
        setGallery(gallery);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to load images');
      }
    };

    fetchGalleryImages();
  }, []);

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item }} // Assuming image data is a URI
      style={styles.image}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={gallery}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#213D61',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
});

export default GalleryScreen;
