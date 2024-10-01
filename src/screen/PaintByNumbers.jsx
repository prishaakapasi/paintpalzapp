import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, Dimensions, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window'); // Get screen width

const PaintByNumbers = () => {
  const [headerText, setHeaderText] = useState('0'); 
  const navigation = useNavigation();

  const [selectedColor, setSelectedColor] = useState(null);
  const [grid, setGrid] = useState(Array(100).fill(null)); // 10x10 grid
  const [colors, setColors] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [galleryImages, setGalleryImages] = useState([]); // New state to store gallery images
  const paintRef = useRef();

  const handleHomePress = () => {
    console.log("Home button pressed");
    navigation.navigate('Home'); 
  };

  const columns = 10; // Number of columns in the grid
  const rows = 10; // Number of rows in the grid
  const gridMargin = 20; // Margin around the grid
  const maxGridWidth = screenWidth * 0.8; // Maximum width for the grid (80% of screen width)

  const getRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return randomColor;
  };

  const generateRandomColors = () => {
    const newColors = Array.from({ length: 5 }, () => getRandomColor());
    setColors(newColors);
  };

  const replaceRandomColor = () => {
    const newColor = getRandomColor();
    const randomIndex = Math.floor(Math.random() * colors.length);
    setColors((prevColors) => {
      const updatedColors = [...prevColors];
      updatedColors[randomIndex] = newColor;
      return updatedColors;
    });
  };

  useEffect(() => {
    generateRandomColors();
  }, []);

  const handleCellPress = (index) => {
    if (selectedColor) {
      const newGrid = [...grid];
      newGrid[index] = selectedColor;
      setGrid(newGrid);
    }
  };

  const pickRandomPrompt = () => {
    const prompts = [
      "Draw your happy place.",
      "Create a scene that represents peace.",
      "Illustrate your favorite memory.",
    ];
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setCurrentPrompt(prompts[randomIndex]);
  };

  // Function to save the painted grid to the app's gallery
  const saveToGallery = async () => {
    if (paintRef.current) {
      try {
        const uri = await captureRef(paintRef, {
          format: 'png',
          quality: 1,
        });
        // Add the image URI to the galleryImages state
        setGalleryImages((prevImages) => [...prevImages, uri]);
        Alert.alert('Success', 'Painting saved to App Gallery!');
      } catch (error) {
        console.error('Error saving image to gallery:', error);
        Alert.alert('Error', 'Failed to save the image to the gallery.');
      }
    }
    const storedHeaderText = await AsyncStorage.getItem('headerText');
    const newHeaderText = (parseInt(storedHeaderText) + 10).toString();
    await AsyncStorage.setItem('headerText', newHeaderText);
  };

  // Function to save the painted grid to the camera roll
  const saveToCameraRoll = async () => {
    if (paintRef.current) {
      try {
        const uri = await captureRef(paintRef, {
          format: 'png',
          quality: 1,
        });
        const asset = await MediaLibrary.createAssetAsync(uri);
        Alert.alert('Success', 'Painting saved to Camera Roll!');
      } catch (error) {
        console.error('Error saving to camera roll:', error);
        Alert.alert('Error', 'Failed to save the image to Camera Roll.');
      }
    }
  };

  // Calculate responsive grid size based on screen width
  const cellSize = maxGridWidth / columns; // Calculate size based on max grid width
  const gridStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: maxGridWidth, // Set the maximum width of the grid
    margin: gridMargin, // Center the grid with margin
  };

  return (
    <View style={styles.container}>
       <View style={styles.homeButton}>
        <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Image source={require("../screen/assets/home.png")} style={styles.home} />
        </TouchableOpacity>
      </View>
       <Header 
        text={headerText}
        onSettingsPress={() => navigation.navigate('Settings')} 
        iconColor="#FFFFFF" // Set icon color to white
        textColor="#FFFFFF" // Set text color to white
      />
      <View style={styles.colorPalette}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorBox, { backgroundColor: color, width: cellSize, height: cellSize }]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.replaceColorButton} onPress={replaceRandomColor}>
        <Text style={styles.replaceColorButtonText}>Replace Random Color</Text>
      </TouchableOpacity>
      <View ref={paintRef} style={gridStyle}>
        {grid.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.cell, { backgroundColor: color || '#FFFFFF', width: cellSize, height: cellSize }]}
            onPress={() => handleCellPress(index)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.promptButton} onPress={pickRandomPrompt}>
        <Text style={styles.promptButtonText}>Get a Prompt</Text>
      </TouchableOpacity>
      {currentPrompt ? <Text style={styles.promptText}>{currentPrompt}</Text> : null}
      <TouchableOpacity style={styles.saveButton} onPress={saveToGallery}>
        <Text style={styles.saveButtonText}>Save to Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={saveToCameraRoll}>
        <Text style={styles.saveButtonText}>Save to Camera Roll</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#213D61',
  },
  homeButton: {
    position: 'absolute',
    top: '3%', 
    marginTop:'5%', // Adjust as necessary
    right: '5%', // Adjust as necessary
    zIndex: 10,
  },
  home: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    flex: 'right',
  },
  colorPalette: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorBox: {
    margin: 5,
  },
  replaceColorButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  replaceColorButtonText: {
    color: '#213D61',
    fontWeight: 'bold',
    fontSize: '16',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#000000',
  },
  promptButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  promptButtonText: {
    color: '#213D61',
    fontWeight: 'bold',
  },
  promptText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#213D61',
    fontWeight: 'bold',
  },
});

export default PaintByNumbers;
