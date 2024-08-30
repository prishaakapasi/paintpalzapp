import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Modal, Button } from 'react-native'; 
import { Svg, Path, Circle } from 'react-native-svg';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import Slider from '@react-native-community/slider';

const { height, width } = Dimensions.get('window');

const DrawingScreen = () => {
  const [paths, setPaths] = useState([]);
  const [dots, setDots] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [selectedColor, setSelectedColor] = useState('red');
  const [strokeSize, setStrokeSize] = useState(3);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const pathRef = useRef([]);
  const startX = useRef(null);
  const startY = useRef(null);

  const isWithinBounds = (x, y) => {
    const padding = 10;
    const xMin = padding;
    const xMax = width - padding;
    const yMin = padding;
    const yMax = height * 0.7 - padding;

    return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
  };

  const onTouchStart = (event) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;

    if (isWithinBounds(locationX, locationY)) {
      startX.current = locationX;
      startY.current = locationY;
    }
  };

  const onTouchEnd = () => {
    if (currentPath.length === 0 && startX.current !== null && startY.current !== null) {
      setDots([...dots, { x: startX.current, y: startY.current, color: selectedColor, size: strokeSize }]);
    } else if (currentPath.length > 0) {
      pathRef.current.push({ path: currentPath, color: selectedColor, size: strokeSize });
      setPaths([...pathRef.current]);
      setCurrentPath([]);
    }
  };

  const onTouchMove = (event) => {
    const locationX = event.nativeEvent.locationX;
    const locationY = event.nativeEvent.locationY;

    if (isWithinBounds(locationX, locationY)) {
      const newPath = [...currentPath];
      newPath.push({ x: locationX.toFixed(0), y: locationY.toFixed(0) });
      setCurrentPath(newPath);
    }
  };

  const handleClearButtonClick = () => {
    pathRef.current = [];
    setPaths([]);
    setDots([]);
    setCurrentPath([]);
  };

  const renderPath = (path) => {
    return path.path.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ');
  };

  const onSelectColor = ({ hex }) => {
    setSelectedColor(hex);
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.svgContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Svg height={height * 0.7} width={width}>
          {paths.map((item, index) => (
            <Path
              key={`path-${index}`}
              d={renderPath(item)}
              stroke={item.color}
              fill={'transparent'}
              strokeWidth={item.size}
              strokeLinejoin={'round'}
              strokeLinecap={'round'}
            />
          ))}
          {dots.map((dot, index) => (
            <Circle
              key={`dot-${index}`}
              cx={dot.x}
              cy={dot.y}
              r={dot.size / 2} // Adjust dot radius based on stroke size
              fill={dot.color}
            />
          ))}
          <Path
            d={renderPath({ path: currentPath })}
            stroke={selectedColor}
            fill={'transparent'}
            strokeWidth={strokeSize}
            strokeLinejoin={'round'}
            strokeLinecap={'round'}
          />
        </Svg>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.colorButton} onPress={() => setShowColorPicker(true)}>
          <Text style={styles.colorButtonText}>Pick Color</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Stroke Size: {strokeSize}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={20}
          value={strokeSize}
          onValueChange={value => setStrokeSize(value)}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
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
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  controlsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  clearButton: {
    marginRight: 10,
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
  colorButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  colorButtonText: {
    color: "#213D61",
    fontSize: 16,
    fontWeight: 'bold',
  },
  sliderContainer: {
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  sliderLabel: {
    color: 'white',
    marginBottom: 10,
    fontSize: 16,
  },
  slider: {
    width: '100%',
  },
  colorPickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099', // Modal background with transparency
  },
});

export default DrawingScreen;
