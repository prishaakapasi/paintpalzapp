import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image, Alert, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase'; 
import Header from './Header'; 

const PublishedArtworkScreen = () => {
  const [headerText, setHeaderText] = useState('0'); 
  const navigation = useNavigation();
  const [artworks, setArtworks] = useState([]);
  const screenHeight = Dimensions.get('window').height;

  const handleHomePress = () => {
    navigation.navigate('Home'); 
  };

  useEffect(() => {
    const fetchPublishedArtworks = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('avatar_url, public_data');

        if (error) {
          console.error('Error fetching published artworks:', error);
          Alert.alert('Error', 'Failed to load published artworks');
          return;
        }

        // Filter out entries without public_data
        const filteredArtworks = data.filter(profile => profile.public_data);
        setArtworks(filteredArtworks);
      } catch (error) {
        console.error('Error during fetching:', error);
        Alert.alert('Error', 'Failed to load published artworks');
      }
    };

    fetchPublishedArtworks();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.artworkContainer}>
      <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
      <Image source={{ uri: item.public_data }} style={styles.artworkImage} />
    </View>
  );

  return (
    <View style={styles.container}>
        <Header 
        onSettingsPress={() => navigation.navigate('Settings')}
        iconColor="#FFFFFF"
        textColor="#FFFFFF"
      />
       <View style={styles.homeButton}>
        <TouchableOpacity onPress={handleHomePress}>
          <Image source={require("../screen/assets/home.png")} style={styles.home} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>PUBLISHED ARTWORKS</Text>
      <FlatList
        data={artworks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        style={[styles.flatList, { marginTop: screenHeight * 0.1 }]}
      />
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
  flatList: {
    flexGrow: 1,
    width: '100%',
  },
  flatListContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  artworkContainer: {
    margin: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  artworkImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  homeButton: {
    position: 'absolute',
    top: '3%', 
    marginTop: '3%',
    right: '5%',
    zIndex: 10,
  },
  home: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default PublishedArtworkScreen;
