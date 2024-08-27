import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const DrawingScreen = () => {
  const [paths, setPaths] = useState([]);
  const [dots, setDots] = useState([]); // For storing dots
  const [currentPath, setCurrentPath] = useState([]);
  const pathRef = useRef([]); // Re-added pathRef
  const startX = useRef(null);
  const startY = useRef(null);

  const onTouchStart = (event) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;

    // Ensure the start point is within the svgContainer bounds
    if (locationX >= 0 && locationX <= width * 0.9 && locationY >= 0 && locationY <= height * 0.7) {
      startX.current = locationX;
      startY.current = locationY;
    }
  };

  const onTouchEnd = () => {
    if (currentPath.length === 0) {
      // If the user taps without dragging, create a dot within bounds
      if (startX.current !== null && startY.current !== null) {
        setDots([...dots, { x: startX.current, y: startY.current }]);
      }
    } else {
      pathRef.current.push(currentPath);
      setPaths([...pathRef.current]);
      setCurrentPath([]);
    }
  };

  const onTouchMove = (event) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;

    // Ensure the new point is within the svgContainer bounds
    if (locationX >= 0 && locationX <= width * 0.9 && locationY >= 0 && locationY <= height * 0.7) {
      const newPath = [...currentPath];
      newPath.push({ x: locationX.toFixed(0), y: locationY.toFixed(0) });
      setCurrentPath(newPath);
    }
  };

  const handleClearButtonClick = () => {
    pathRef.current = [];
    setPaths([]);
    setDots([]); // Clear dots as well
    setCurrentPath([]);
  };

  const renderPath = (path) => {
    return path.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ');
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.svgContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Svg height={height * 0.7} width={width * 0.9}>
          {paths.map((path, index) => (
            <Path
              key={`path-${index}`}
              d={renderPath(path)}
              stroke={'red'}
              fill={'transparent'}
              strokeWidth={3}
              strokeLinejoin={'round'}
              strokeLinecap={'round'}
            />
          ))}
          {dots.map((dot, index) => (
            <Circle
              key={`dot-${index}`}
              cx={dot.x}
              cy={dot.y}
              r={3} // Radius of the dot
              fill={'red'}
            />
          ))}
          <Path
            d={renderPath(currentPath)}
            stroke={'red'}
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
    backgroundColor: "#213D61",
  },
  svgContainer: {
    height: height * 0.7,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'pink',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: "#213D61",
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DrawingScreen;
