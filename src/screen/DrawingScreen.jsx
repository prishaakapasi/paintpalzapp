import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Modal, Button, Image } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import Slider from '@react-native-community/slider';
import Header from './Header';

const { height, width } = Dimensions.get('window');

const DrawingScreen = () => {
  const [paths, setPaths] = useState([]);
  const [dots, setDots] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [selectedColor, setSelectedColor] = useState('red');
  const [strokeSize, setStrokeSize] = useState(3);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showStrokeSizePicker, setShowStrokeSizePicker] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const pathRef = useRef([]);
  const startX = useRef(null);
  const startY = useRef(null);

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

  const [headerText, setHeaderText] = useState('0');

  return (
    <View style={styles.container}>
      <Header text={headerText} onSettingsPress={handleSettingsPress} />
      <View style={styles.textContainer}>
        <Text style={styles.drawingtext}>DRAWING</Text>
      </View>
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
          <Image source={require("../screen/assets/🦆 icon _Download_.png")} style={styles.download} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.eraserbutton, isErasing ? styles.buttonActive : null]}
          onPress={() => setIsErasing(!isErasing)}
        >
          <Image source={require("../screen/assets/ink_eraser.png")} style={styles.erase} />
        </TouchableOpacity>
      </View>

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
              d={renderPath(item.path)}
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
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearButtonClick}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
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
        <View style={styles.strokeSizePickerContainer}>
          <Text style={styles.sliderLabel}>Stroke Size: {strokeSize.toFixed(1)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            value={strokeSize}
            onValueChange={value => setStrokeSize(value)}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <Button title='Ok' onPress={() => setShowStrokeSizePicker(false)} />
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
    backgroundColor: '#213D61',
  },
  svgContainer: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    marginBottom: 20,
  },
  drawingtext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  palettebutton: {
    margin: 10,
  },
  lineweightbutton: {
    margin: 10,
  },
  editbutton: {
    margin: 10,
  },
  downloadbutton: {
    margin: 10,
  },
  eraserbutton: {
    margin: 10,
  },
  palette: {
    width: 30,
    height: 30,
  },
  lineweight: {
    width: 30,
    height: 30,
  },
  edit: {
    width: 30,
    height: 30,
  },
  download: {
    width: 30,
    height: 30,
  },
  erase: {
    width: 30,
    height: 30,
  },
  clearButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#213D61',
    fontWeight: 'bold',
    alignContent: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  colorPickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  strokeSizePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slider: {
    width: 200,
    height: 40,
    screenColor: 'blue',
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonActive: {
    opacity: 0.7,
  },
});

export default DrawingScreen;
