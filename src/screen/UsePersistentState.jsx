import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const usePersistentState = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setValue(storedValue);
        }
      } catch (error) {
        console.error(`Failed to load ${key} from AsyncStorage`, error);
      }
    };

    loadValue();
  }, [key]);

  useEffect(() => {
    const saveValue = async () => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.error(`Failed to save ${key} to AsyncStorage`, error);
      }
    };

    saveValue();
  }, [key, value]);

  return [value, setValue];
};

export default usePersistentState;
