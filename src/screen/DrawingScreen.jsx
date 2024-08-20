import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const DrawingScreen = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isClearButtonClicked, setClearButtonClicked] = useState(false);
  const pathRef = useRef([]);

  const onTouchEnd = () => {
    pathRef.current.push(currentPath);
    setPaths([...pathRef.current]);
    setCurrentPath([]);
    setClearButtonClicked(false);
  };

  const onTouchMove = (event) => {
    const newPath = [...currentPath];
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;

    const newPoint = `${newPath.length === 0 ? 'M' : ''}${locationX.toFixed(0)},${locationY.toFixed(0)}`;
    newPath.push(newPoint);
    setCurrentPath(newPath);
  };

  const handleClearButtonClick = () => {
    pathRef.current = [];
    setPaths([]);
    setCurrentPath([]);
    setClearButtonClicked(true);
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.svgContainer}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Svg height={height * 0.7} width={width}>
          {paths.map((path, index) => (
            <Path
              key={`path-${index}`}
              d={path.join('')}
              stroke={isClearButtonClicked ? 'transparent' : 'red'}
              fill={'transparent'}
              strokeWidth={3}
              strokeLinejoin={'round'}
              strokeLinecap={'round'}
            />
          ))}
          <Path
            d={currentPath.join('')}
            stroke={isClearButtonClicked ? 'transparent' : 'red'}
            fill={'transparent'}
            strokeWidth={3}
            strokeLinejoin={'round'}
            strokeLinecap={'round'}
          />
        </Svg>
      </View>
      <View>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    height: height * 0.7,
    width,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DrawingScreen;
