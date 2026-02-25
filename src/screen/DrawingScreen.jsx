import React, { useState, useRef, useEffect} from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Modal, Button, Image, Switch, Alert } from 'react-native';
import { Svg, Path, Defs, ClipPath, Rect, G, Circle} from 'react-native-svg';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase'; 

const { height, width } = Dimensions.get('window');

const DrawingScreen = () => {
  const navigation = useNavigation();
  const svgRef = useRef(null);

  const [headerText, setHeaderText] = useState('0'); 

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Media Access Required',
        'This app needs permission to access your camera roll to save images.',
        [
          { text: 'Allow', onPress: requestPermissions }, // Retry permission if denied
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  const handleSaveToCameraRoll = async () => {
    try {
      // Capture the SVG content as an image
      const uri = await captureRef(svgRef, {
        format: 'png',
        quality: 1,   
      });

      // Save the image to the camera roll
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('My Drawings', asset, false);

      Alert.alert('Success', 'Drawing saved to Camera Roll!');
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save the image.');
    }
  };

  const [paths, setPaths] = useState([]);
  const [dots, setDots] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [selectedColor, setSelectedColor] = useState('red');
  const [strokeSize, setStrokeSize] = useState(3);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showStrokeSizePicker, setShowStrokeSizePicker] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userID, setUserId] = useState(null);
  const [showPromptGenerator, setShowPromptGenerator] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isPromptGeneratorVisible, setIsPromptGeneratorVisible] = useState(false);


  const addPath = (path) => {
    setPaths([...paths, path]);
  };

  const pathRef = useRef([]);
  const startX = useRef(null);
  const startY = useRef(null);

  const handleHomePress = () => {
    console.log("Home button pressed");
    navigation.navigate('Home'); 
  };
  const handleTouchStart = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    // Start a new path with the initial touch point
    setCurrentPath([{ x: locationX, y: locationY }]);
  };
  
  const handleTouchMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    // Append new touch points to the current path
    setCurrentPath(prevPath => [...prevPath, { x: locationX, y: locationY }]);
  };
  
  const handleTouchEnd = () => {
    if (currentPath.length > 0) {
      setPaths(prevPaths => [
        ...prevPaths,
        { color: selectedColor, size: strokeSize, path: currentPath }
      ]);
      setCurrentPath([]);
    }
  };
  
  

  const topics = [
    "Draw your happy place.",
    "Create a scene that represents peace.",
    "Illustrate your favorite memory.",
    "Draw something that makes you smile.",
    "Create an image of your dream vacation.",
    "Draw your ideal home.",
    "Illustrate the feeling of love.",
    "Draw a place where you feel safe.",
    "Create a drawing inspired by your favorite song.",
    "Illustrate a moment of kindness.",
    "Draw the sky from your favorite season.",
    "Create a mandala representing balance.",
    "Draw a scene that makes you feel calm.",
    "Illustrate something that represents hope.",
    "Draw your favorite childhood toy.",
    "Create an image of a place you’d like to visit.",
    "Draw something that represents happiness.",
    "Illustrate a comforting moment.",
    "Draw the ocean in a way that brings you peace.",
    "Create a drawing that represents freedom.",
    "Draw a flower that symbolizes growth.",
    "Illustrate a serene landscape.",
    "Draw something that represents inner strength.",
    "Create an image that symbolizes self-love.",
    "Draw a cozy scene with your favorite warm drink.",
    "Illustrate a place that feels like home.",
    "Draw something that makes you feel empowered.",
    "Create a drawing that represents gratitude.",
    "Draw an animal that brings you joy.",
    "Illustrate a moment of quiet reflection.",
    "Draw a place where you can be yourself.",
    "Create an image of your favorite outdoor activity.",
    "Draw something that symbolizes resilience.",
    "Illustrate a moment of pure joy.",
    "Draw a tree that represents your personal growth.",
    "Create a drawing that represents calmness.",
    "Draw your favorite part of nature.",
    "Illustrate a moment when you felt at peace.",
    "Draw something that represents connection.",
    "Create an image of a place that makes you feel free.",
    "Draw a butterfly that symbolizes transformation.",
    "Illustrate a moment of self-care.",
    "Draw a sunset that makes you feel relaxed.",
    "Create a drawing that represents mindfulness.",
    "Draw a garden that brings you joy.",
    "Illustrate something that represents patience.",
    "Draw a peaceful night sky.",
    "Create an image of something that inspires you.",
    "Draw something that represents clarity.",
    "Illustrate a moment of healing.",
    "Draw your favorite spot in nature.",
    "Create a drawing that symbolizes trust.",
    "Draw something that makes you feel grounded.",
    "Illustrate a moment of connection with others.",
    "Draw a symbol of your personal journey.",
    "Create an image of something you’re grateful for.",
    "Draw your favorite thing about yourself.",
    "Illustrate a place where you feel most alive.",
    "Draw something that represents forgiveness.",
    "Create a drawing that symbolizes new beginnings.",
    "Draw a scene that represents tranquility.",
    "Illustrate a moment of acceptance.",
    "Draw something that represents self-discovery.",
    "Create an image of your favorite morning ritual.",
    "Draw a tree that symbolizes strength.",
    "Illustrate a moment when you felt proud.",
    "Draw something that represents peace of mind.",
    "Create a drawing that symbolizes harmony.",
    "Draw your favorite way to relax.",
    "Illustrate a moment of courage.",
    "Draw something that represents trust in yourself.",
    "Create an image of your ideal future.",
    "Draw a place where you feel connected to the earth.",
    "Illustrate a moment of pure contentment.",
    "Draw something that represents letting go.",
    "Create a drawing that symbolizes hope for the future.",
    "Draw a bird that represents freedom.",
    "Illustrate a moment when you felt loved.",
    "Draw something that represents inner peace.",
    "Create an image of your favorite season.",
    "Draw a symbol of your dreams.",
    "Illustrate a moment of happiness with others.",
    "Draw something that represents your core values.",
    "Create a drawing that symbolizes balance in life.",
    "Draw a place where you feel most creative.",
    "Illustrate a moment of kindness from a stranger.",
    "Draw something that represents your spiritual journey.",
    "Create an image that symbolizes renewal.",
    "Draw a symbol of your unique strengths.",
    "Illustrate a moment when you felt truly alive.",
    "Draw something that represents your connection to nature.",
    "Create a drawing that symbolizes inner growth.",
    "Draw a flower that represents your personality.",
    "Illustrate a moment of peace with yourself.",
    "Draw something that represents your life’s purpose.",
    "Create an image of your ideal day.",
    "Draw a symbol of hope.",
    "Illustrate a moment when you felt connected to the universe.",
    "Draw something that represents your self-worth.",
    "Create a drawing that symbolizes love in all forms.",
    "Draw a place where you feel a deep sense of belonging.",
    "Illustrate a moment of reflection and introspection.",
    "Draw something that represents your inner child.",
    "Create an image that symbolizes joy in simplicity.",
    "Draw a landscape that represents your inner world.",
    "Illustrate a moment of clarity in your life.",
    "Draw something that represents the balance between mind and body.",
    "Create a drawing that symbolizes unity with others.",
    "Draw a symbol of the wisdom you’ve gained.",
    "Illustrate a moment of forgiveness, for yourself or others.",
    "Draw something that represents a personal breakthrough.",
    "Create an image that symbolizes the beauty in imperfection.",
    "Draw a place where you feel completely at peace.",
    "Illustrate a moment of deep understanding.",
    "Draw something that represents your connection to the present moment.",
    "Create a drawing that symbolizes the importance of self-care.",
    "Draw a symbol of your resilience.",
    "Illustrate a moment when you felt at one with the world.",
    "Draw something that represents your love for yourself.",
    "Create an image that symbolizes the power of community.",
    "Draw a place where you can fully express yourself.",
    "Illustrate a moment of simple pleasures.",
    "Draw something that represents your personal growth journey.",
    "Create a drawing that symbolizes your connection to your roots.",
    "Draw a symbol of the lessons you’ve learned.",
    "Illustrate a moment of inner strength.",
    "Draw something that represents your dreams for the future.",
    "Create an image that symbolizes your inner wisdom.",
    "Draw a place that brings you peace and joy.",
    "Illustrate a moment of love and connection.",
    "Draw something that represents your personal power.",
    "Create a drawing that symbolizes your journey of self-discovery.",
    "Draw a symbol of your hopes and aspirations.",
    "Illustrate a moment of deep relaxation.",
    "Draw something that represents your unique qualities.",
    "Create an image that symbolizes the importance of mindfulness.",
    "Draw a place where you can recharge your spirit.",
    "Illustrate a moment of personal growth.",
    "Draw something that represents your connection to others.",
    "Create a drawing that symbolizes the power of positive thinking.",
    "Draw a symbol of your journey toward inner peace.",
    "Illustrate a moment when you felt truly free.",
    "Draw something that represents your connection to the earth.",
    "Create an image that symbolizes the beauty of life.",
    "Draw a place where you feel a deep sense of tranquility.",
    "Illustrate a moment of quiet contemplation.",
    "Draw something that represents your personal values.",
    "Create a drawing that symbolizes the power of love.",
    "Draw a symbol of your connection to your true self.",
    "Illustrate a moment when you felt a deep sense of purpose.",
    "Draw something that represents your inner harmony.",
    "Create an image that symbolizes the journey of self-love.",
    "Draw a place where you feel most alive and vibrant.",
    "Illustrate a moment of connection with nature.",
    "Draw something that represents your inner peace and contentment.",
    "Create a drawing that symbolizes your personal journey of healing.",
    "Draw a symbol of the strength you’ve gained over time.",
    "Illustrate a moment of pure joy and happiness.",
    "Draw something that represents your love for the world around you.",
    "Create an image that symbolizes your journey toward wholeness.",
    "Draw a place where you feel a deep sense of belonging.",
    "Illustrate a moment of clarity and understanding.",
    "Draw something that represents your connection to the universe.",
    "Create a drawing that symbolizes the power of forgiveness.",
    "Draw a symbol of your journey toward self-acceptance.",
    "Illustrate a moment when you felt deeply connected to yourself.",
    "Draw something that represents the balance in your life.",
    "Create an image that symbolizes your love for life.",
    "Draw a place where you can fully relax and be yourself.",
    "Illustrate a moment of deep introspection.",
    "Draw something that represents your journey toward inner peace.",
    "Create a drawing that symbolizes the importance of being present.",
    "Draw a symbol of your journey toward personal fulfillment.",
    "Illustrate a moment when you felt a deep sense of joy.",
    "Draw something that represents your connection to your inner self.",
    "Create an image that symbolizes the power of positive energy.",
    "Draw a place where you feel a deep sense of inner calm.",
    "Illustrate a moment of pure contentment and peace.",
    "Draw something that represents your journey toward self-discovery.",
    "Create a drawing that symbolizes the importance of self-care and love.",
    "Draw a symbol of your journey toward wholeness and healing.",
    "Illustrate a moment when you felt truly at peace with yourself.",
    "Draw something that represents the beauty in simplicity.",
    "Create an image that symbolizes the power of self-love.",
    "Draw a place where you can fully express your creativity.",
    "Illustrate a moment of deep connection with others.",
    "Draw something that represents your journey toward self-empowerment.",
    "Create a drawing that symbolizes the importance of inner peace.",
    "Draw a symbol of your journey toward self-realization.",
    "Illustrate a moment when you felt truly alive and vibrant.",
    "Draw something that represents your connection to your authentic self.",
    "Create an image that symbolizes the power of mindfulness.",
    "Draw a place where you feel a deep sense of connection with nature.",
    "Illustrate a moment of personal growth and transformation.",
    "Draw something that represents your journey toward self-fulfillment.",
    "Create a drawing that symbolizes the importance of self-compassion.",
    "Draw a symbol of your journey toward inner strength and resilience.",
    "Illustrate a moment when you felt a deep sense of inner peace.",
    "Draw something that represents the balance in your life.",
    "Create an image that symbolizes your journey toward inner wisdom.",
    "Draw a place where you can fully relax and recharge your spirit.",
    "Illustrate a moment of deep self-reflection.",
    "Draw something that represents your journey toward self-acceptance.",
    "Create a drawing that symbolizes the power of positive thinking.",
    "Draw a symbol of your journey toward inner harmony and balance.",
    "Illustrate a moment when you felt a deep sense of connection with yourself.",
    "Draw something that represents your connection to the world around you.",
    "Create an image that symbolizes the importance of self-care.",
    "Draw a place where you feel a deep sense of inner calm and peace.",
    "Illustrate a moment of pure happiness and joy.",
    "Draw something that represents your journey toward personal growth.",
    "Create a drawing that symbolizes the power of self-love and acceptance.",
    "Draw a symbol of your journey toward inner peace and contentment.",
    "Illustrate a moment when you felt truly at one with yourself.",
    "Draw something that represents the balance in your life.",
    "Create an image that symbolizes your journey toward wholeness and healing.",
    "Draw a place where you can fully express your true self.",
    "Illustrate a moment of deep connection with nature.",
    "Draw something that represents your journey toward self-empowerment.",
    "Create a drawing that symbolizes the importance of self-compassion and love.",
    "Draw a symbol of your journey toward inner strength and resilience.",
    "Illustrate a moment when you felt truly connected to yourself.",
    "Draw something that represents the power of mindfulness.",
    "Create an image that symbolizes your journey toward self-discovery.",
    "Draw a place where you feel a deep sense of peace and tranquility.",
    "Illustrate a moment of deep reflection and understanding.",
    "Draw something that represents your connection to your true self.",
    "Create a drawing that symbolizes the power of positive energy.",
    "Draw a symbol of your journey toward inner peace and happiness.",
    "Illustrate a moment when you felt a deep sense of joy and contentment.",
    "Draw something that represents your connection to the world around you.",
    "Create an image that symbolizes the importance of self-care and love.",
    "Draw a place where you feel a deep sense of connection with yourself.",
    "Illustrate a moment of pure contentment and peace.",
    "Draw something that represents your journey toward self-acceptance.",
    "Create a drawing that symbolizes the power of positive thinking.",
    "Draw a symbol of your journey toward inner harmony and balance.",
    "Illustrate a moment when you felt truly at peace with yourself.",
    "Draw something that represents the balance in your life.",
    "Create an image that symbolizes your journey toward wholeness and healing.",
    "Draw a place where you can fully express your creativity and spirit.",
    "Illustrate a moment of deep connection with others.",
    "Draw something that represents your journey toward self-empowerment.",
    "Create a drawing that symbolizes the importance of self-love and acceptance.",
    "Draw a symbol of your journey toward inner strength and resilience.",
    "Illustrate a moment when you felt truly alive and vibrant.",
    "Draw something that represents your connection to your inner self.",
    "Create an image that symbolizes the power of mindfulness and presence.",
    "Draw a place where you feel a deep sense of connection with nature.",
    "Illustrate a moment of personal growth and transformation.",
    "Draw something that represents your journey toward self-fulfillment.",
    "Create a drawing that symbolizes the importance of self-compassion and love.",
    "Draw a symbol of your journey toward inner peace and contentment.",
    "Illustrate a moment when you felt a deep sense of inner calm and tranquility.",
    "Draw something that represents the balance in your life.",
    "Create an image that symbolizes your journey toward inner wisdom and understanding.",
    "Draw a place where you can fully relax and be yourself.",
    "Illustrate a moment of deep self-reflection.",
    "Draw something that represents your journey toward self-acceptance.",
    "Create a drawing that symbolizes the power of positive thinking.",
    "Draw a symbol of your journey toward inner harmony and balance.",
    "Illustrate a moment when you felt truly connected to yourself.",
    "Draw something that represents the power of self-love.",
    "Create an image that symbolizes your journey toward self-discovery and growth.",
    "Draw a place where you feel a deep sense of peace and joy.",
    "Illustrate a moment of deep reflection and introspection.",
    "Draw something that represents your connection to the world around you.",
    "Create a drawing that symbolizes the importance of self-care and compassion.",
    "Draw a symbol of your journey toward inner strength and resilience.",
    "Illustrate a moment when you felt truly at peace with yourself.",
    "Draw something that represents the balance in your life.",
    "Create an image that symbolizes your journey toward wholeness and healing.",
    "Draw a place where you can fully express your creativity and spirit.",
    "Illustrate a moment of deep connection with others.",
    "Draw something that represents your journey toward self-empowerment.",
    "Create a drawing that symbolizes the importance of self-love and acceptance.",
    "Draw a symbol of your journey toward inner strength and resilience.",
    "Illustrate a moment when you felt truly alive and vibrant.",
    "Draw something that represents your connection to your inner self.",
    "Create an image that symbolizes the power of mindfulness and presence.",
    "Draw a place where you feel a deep sense of connection with nature.",
    "Illustrate a moment of personal growth and transformation.",
    "Draw something that represents your journey toward self-fulfillment.",
    "Create a drawing that symbolizes the importance of self-compassion and love.",
    "Draw a symbol of your journey toward inner peace and contentment.",
    "Illustrate a moment when you felt a deep sense of inner calm and tranquility.",
    "Draw something that represents the balance in your life.",
    "Create an image that symbolizes your journey toward inner wisdom and understanding."
  ];
  
  const pickRandomTopic = () => {
    const randomIndex = Math.floor(Math.random() * topics.length);
    setCurrentPrompt(topics[randomIndex]);
  };

  const renderPromptGenerator = () => {
    if (!isPromptGeneratorVisible) return null;

    return (
      <View style={styles.promptGeneratorContainer}>
        <Text style={styles.promptText}>{currentPrompt}</Text>
        <TouchableOpacity style={styles.newPromptButton} onPress={pickRandomTopic}>
          <Text style={styles.newPromptButtonText}>New Prompt</Text>
        </TouchableOpacity>
      </View>
    );
  };


  const isWithinBounds = (x, y) => {
    const padding = 10;
    return x >= padding && x <= width - padding && y >= padding && y <= height * 0.7 - padding;
  };

  const clampX = (x) => Math.max(0, Math.min(x, width));
  const clampY = (y) => Math.max(0, Math.min(y, height * 0.7));

  const onTouchStart = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    if (isWithinBounds(locationX, locationY)) {
      startX.current = clampX(locationX);
      startY.current = clampY(locationY);
    }
  };

  const eraseDrawing = (x, y, size) => {
    setPaths(paths.filter(path =>
      !path.path.some(point => Math.hypot(point.x - x, point.y - y) < size)
    ));
    setDots(dots.filter(dot => Math.hypot(dot.x - x, dot.y - y) >= size));
  };

  const onTouchEnd = () => {
    if (currentPath.length === 0 && startX.current !== null && startY.current !== null) {
      if (isErasing) {
        eraseDrawing(startX.current, startY.current, strokeSize);
      } else {
        setDots([...dots, { x: startX.current, y: startY.current, color: selectedColor, size: strokeSize }]);
      }
    } else if (currentPath.length > 0) {
      if (isErasing) {
        eraseDrawing(currentPath[0].x, currentPath[0].y, strokeSize);
      } else {
        pathRef.current.push({
          path: currentPath.map(p => ({
            x: isWithinBounds(p.x, p.y) ? clampX(p.x) : p.x,
            y: isWithinBounds(p.x, p.y) ? clampY(p.y) : p.y
          })),
          color: isWithinBounds(currentPath[0].x, currentPath[0].y) ? selectedColor : 'transparent',
          size: strokeSize,
        });
        setPaths([...pathRef.current]);
      }
      setCurrentPath([]);
    }
  };

  const onTouchMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    if (isWithinBounds(locationX, locationY)) {
      if (isErasing) {
        eraseDrawing(locationX, locationY, strokeSize);
      } else {
        const newPath = [...currentPath, {
          x: clampX(locationX),
          y: clampY(locationY),
        }];
        setCurrentPath(newPath);
      }
    }
  };

  const handleClearButtonClick = () => {
    pathRef.current = [];
    setPaths([]);
    setDots([]);
    setCurrentPath([]);
  };

  // Save the image to AsyncStorage
  const svgData = '<svg>Your SVG Data Here</svg>'; // This should be dynamically set to your SVG data

  // Save the image to AsyncStorage
  const saveImageToGalleryStorage = async (imageData) => {
    try {
      const existingGallery = await AsyncStorage.getItem('gallery');
      const gallery = existingGallery ? JSON.parse(existingGallery) : [];
      gallery.push(`data:image/png;base64,${imageData}`); // Save as base64 PNG
      await AsyncStorage.setItem('gallery', JSON.stringify(gallery));
      Alert.alert('Success', 'Image added to gallery');
    } catch (error) {
      console.error('Failed to save image', error);
      Alert.alert('Error', 'Failed to save image');
    }
  };
  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userID');
        console.log('Stored User ID:', storedUserId); // Log the retrieved User ID
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('Failed to load user ID', error);
      }
    };

    getUserId();
  }, []);

  const handleAddToGalleryClick = async () => {
    if (!userID) {
      Alert.alert('Error', 'User ID is not set. Please log in again.');
      return;
    }
  
    try {
      const pngData = `data:image/png;base64,${await captureRef(svgRef, {
        format: 'png',
        quality: 0.8,
        result: 'base64',
      })}`;
  
      console.log("Image Data:", pngData); // Log the image data
  
      // Step 1: Fetch the current coins for the user
      const { data: userProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('coins')
        .eq('id', userID)
        .single();
  
      if (fetchError) {
        console.error('Error fetching user profile:', fetchError);
        Alert.alert('Error', 'Failed to fetch user profile');
        return;
      }
  
      const currentCoins = userProfile.coins || 0;
  
      // Step 2: Calculate new coins value
      const newCoinsValue = currentCoins + 10;
  
      // Step 3: Update the image_data and increment coins by 10
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          image_data: pngData,
          coins: newCoinsValue,
        })
        .eq('id', userID); 
  
      if (error) {
        console.error('Error saving image to Supabase:', error);
        Alert.alert('Error', 'Failed to save image to Supabase');
      } else {
        console.log('Update successful:', data);
        Alert.alert('Success', 'Drawing saved to gallery! You earned 10 coins!');
      }
    } catch (error) {
      console.error('Failed to save image', error);
      Alert.alert('Error', 'Failed to save image');
    }
  };
  
  
  const renderPath = (path) => {
    return path.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ');
  };

  const onSelectColor = ({ hex }) => {
    setSelectedColor(hex);
  };

  const handleSettingsPress = () => {
    console.log("Settings button pressed");
  };

  const handleEditButtonClick = () => {
    if (isErasing) {
      setIsErasing(false);
    }
    setIsEditing(!isEditing);
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
        iconColor="#FFFFFF" 
        textColor="#FFFFFF"
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.palettebutton, isEditing ? styles.buttonActive : null]}
          onPress={() => setShowColorPicker(true)}
        >
          <Image source={require("../screen/assets/palette.png")} style={styles.palette} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.lineweightbutton, isEditing ? styles.buttonActive : null]}
          onPress={() => setShowStrokeSizePicker(true)}
        >
          <Image source={require("../screen/assets/line_weight.png")} style={styles.lineweight} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.editbutton, isEditing ? styles.buttonActive : null]}
          onPress={handleEditButtonClick}
        >
          <Image source={require("../screen/assets/edit.png")} style={styles.edit} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.downloadbutton, isEditing ? styles.buttonActive : null]}
          onPress={() => {}}
        >
        <TouchableOpacity onPress={handleSaveToCameraRoll}>
          <Image source={require("../screen/assets/🦆 icon _Download_.png")} style={styles.download} />
      </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.eraserbutton, isErasing ? styles.buttonActive : null]}
          onPress={() => setIsErasing(!isErasing)}
        >
          <Image source={require("../screen/assets/ink_eraser.png")} style={styles.erase} />
        </TouchableOpacity>
      </View>
  
      <View 
  ref={svgRef} 
  style={[styles.svgContainer, { backgroundColor: 'white' }]} // Added white background
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>

  <Svg 
   height={height * 0.7} 
   width={width * 0.9}
   onTouchStart={handleTouchStart} 
   onTouchMove={onTouchMove}  
   onTouchEnd={onTouchEnd}
  >
    <Defs>
      <ClipPath id="clip">
        <Rect x="0" y="0" width={width} height={height} />
      </ClipPath>
    </Defs>

    {paths.map((item, index) => (
      <Path
        key={`path-${index}`}
        d={renderPath(item.path)}
        stroke={item.color}
        fill={'transparent'}
        strokeWidth={item.size}
        strokeLinejoin={'round'}
        strokeLinecap={'round'}
        clipPath="url(#clip)"
      />
    ))}

    {dots.map((dot, index) => (
      <Circle
        key={`dot-${index}`}
        cx={dot.x}
        cy={dot.y}
        r={dot.size / 2}
        fill={dot.color}
      />
    ))}

    <Path
      d={renderPath(currentPath)}
      stroke={selectedColor}
      fill={'transparent'}
      strokeWidth={strokeSize}
      strokeLinejoin={'round'}
      strokeLinecap={'round'}
    />
  </Svg>

  {/* Prompt Generator */}
  {isPromptGeneratorVisible && (
    <View style={styles.promptContainer}>
      {renderPromptGenerator()}
    </View>
  )}

</View>
<View style={styles.line} />

<View style={styles.controlsRow}>
  <View style={styles.controlsContainer}>
    <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
      <Text style={styles.clearButtonText}>Clear</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.controlsContainer}>
    <TouchableOpacity style={styles.addToGalleryButton} onPress={handleAddToGalleryClick}>
      <Text style={styles.addToGalleryButtonText}>Add to Gallery!</Text>
    </TouchableOpacity>
  </View>
</View>

      <Modal visible={showColorPicker} animationType='slide'>
        <View style={styles.colorPickerContainer}>
          <ColorPicker style={{ width: '70%' }} value={selectedColor} onComplete={onSelectColor}>
            <Preview />
            <Panel1 />
            <HueSlider />
            <OpacitySlider />
            <Swatches />
          </ColorPicker>
          <Button title='Ok' onPress={() => setShowColorPicker(false)} />
        </View>
      </Modal>
  
      <Modal visible={showStrokeSizePicker} animationType='slide'>
        <View style={styles.strokeSizeContainer}>
          <Text>Stroke Size</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={1}
            maximumValue={100}
            value={strokeSize}
            onValueChange={setStrokeSize}
          />
          <Button title='Ok' onPress={() => setShowStrokeSizePicker(false)} />
        </View>
      </Modal>
  
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Show Prompt Generator</Text>
        <Switch
          value={isPromptGeneratorVisible}
          onValueChange={(value) => setIsPromptGeneratorVisible(value)}
        />
      </View>
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
  homeButton: {
    position: 'absolute',
    top: '3%', 
    marginTop:'5%', 
    right: '5%', 
    zIndex: 10,
  },
  home: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    flex: 'right',
  },
  line: {
    height: 2, 
    backgroundColor: 'white',
    marginBottom: 0,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    marginTop: '23%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  palettebutton: {
    padding: 10,
  },
  palette: {
    width: 30,
    height: 30,
  },
  lineweightbutton: {
    padding: 10,
  },
  lineweight: {
    width: 30,
    height: 30,
  },
  editbutton: {
    padding: 10,
  },
  edit: {
    width: 30,
    height: 30,
  },
  downloadbutton: {
    padding: 10,
  },
  download: {
    width: 30,
    height: 30,
  },
  eraserbutton: {
    padding: 10,
  },
  erase: {
    width: 30,
    height: 30,
  },
  svgContainer: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: '#FFFFFF',
    position: 'relative',

  },
  controlsContainer: {
    padding: 10,
    alignItems: 'center',
  },
  clearButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#213D61',
    fontWeight: 'bold',
  },
  controlsRow: {
    flexDirection: 'row',           
    justifyContent: 'space-between', 
    alignItems: 'center',           
    paddingHorizontal: 10,         
  },
  addToGalleryButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  addToGalleryButtonText: {
    color: '#213D61',
    fontWeight: 'bold',
  },
  colorPickerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  strokeSizeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    marginBottom: '5%',
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 8,
    color: 'white',
  },
  promptGeneratorContainer: {
    position: 'absolute',
    top: height * 0.04,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  promptText: {
    fontSize: 16,
    marginBottom: 10,
  },
  newPromptButton: {
    backgroundColor: '#213D61',
    padding: 10,
    borderRadius: 5,
  },
  newPromptButtonText: {
    color: 'white',
    fontSize: 14,
  },
  promptContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: height * 0.1,
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 0, 
  },

});

export default DrawingScreen;
