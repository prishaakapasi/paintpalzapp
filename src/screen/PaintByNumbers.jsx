import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const PaintByNumbers = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [grid, setGrid] = useState(Array(9).fill(null));

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

  const handleCellPress = (index) => {
    if (selectedColor) {
      const newGrid = [...grid];
      newGrid[index] = selectedColor;
      setGrid(newGrid);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.colorPalette}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorBox, { backgroundColor: color }]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
      <View style={styles.grid}>
        {grid.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.cell, { backgroundColor: color || '#FFFFFF' }]}
            onPress={() => handleCellPress(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPalette: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colorBox: {
    width: 50,
    height: 50,
    margin: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 150,
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
  },
});

export default PaintByNumbers;
