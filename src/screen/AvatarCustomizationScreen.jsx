import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';

const { width: deviceWidth } = Dimensions.get('window');
const isTablet = deviceWidth >= 768; // You can adjust this value based on your needs

const avatarImageSize = isTablet ? 200 : 125;

const marginTopHomeButton = deviceWidth > 768 ? '2%' : '3%';

const avatarImages = {
    boy: {
      'boyavatars-01.png': [
        { source: require('../screen/avatars/boyavatars-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-08.png': [
        { source: require('../screen/avatars/boyavatars-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-57.png'), caption: 'Headphones', price: '$11000' },
      ], 'boyavatars-15.png': [
        { source: require('../screen/avatars/boyavatars-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-22.png': [
        { source: require('../screen/avatars/boyavatars-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-29.png': [
        { source: require('../screen/avatars/boyavatars-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-36.png': [
        { source: require('../screen/avatars/boyavatars-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-43.png': [
        { source: require('../screen/avatars/boyavatars-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-50.png': [
        { source: require('../screen/avatars/boyavatars-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-57.png': [
        { source: require('../screen/avatars/boyavatars-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-57.png'), caption: 'Headphones', price: '$11000' },
      ],



      'boyavatars-02.png': [
        { source: require('../screen/avatars/boyavatars-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-58.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-09.png': [
        { source: require('../screen/avatars/boyavatars-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-58.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-16.png': [
        { source: require('../screen/avatars/boyavatars-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-58.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-23.png': [
        { source: require('../screen/avatars/boyavatars-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-58.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-30.png': [
        { source: require('../screen/avatars/boyavatars-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-58.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-37.png': [
        { source: require('../screen/avatars/boyavatars-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-58.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-44.png': [
        { source: require('../screen/avatars/boyavatars-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-58.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-51.png': [
        { source: require('../screen/avatars/boyavatars-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-58.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-58.png': [
        { source: require('../screen/avatars/boyavatars-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-58.png'), caption: 'Headphones', price: '$11000' },
      ],


      'boyavatars-03.png': [
        { source: require('../screen/avatars/boyavatars-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-59.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-10.png': [
        { source: require('../screen/avatars/boyavatars-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-59.png'), caption: 'Headphones', price: '$11000' },
      ],

      'boyavatars-17.png': [
        { source: require('../screen/avatars/boyavatars-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-59.png'), caption: 'Headphones', price: '$11000' },
      ],

      'boyavatars-24.png': [
        { source: require('../screen/avatars/boyavatars-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-59.png'), caption: 'Headphones', price: '$11000' },
      ],

      'boyavatars-31.png': [
        { source: require('../screen/avatars/boyavatars-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-59.png'), caption: 'Headphones', price: '$11000' },
      ],

      'boyavatars-38.png': [
        { source: require('../screen/avatars/boyavatars-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-59.png'), caption: 'Headphones', price: '$11000' },
      ],

      'boyavatars-45.png': [
        { source: require('../screen/avatars/boyavatars-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-59.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-52.png': [
        { source: require('../screen/avatars/boyavatars-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-59.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-59.png': [
        { source: require('../screen/avatars/boyavatars-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-59.png'), caption: 'Headphones', price: '$11000' },
      ],



      'boyavatars-04.png': [
        { source: require('../screen/avatars/boyavatars-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-39.png'), caption: 'Sunglasses', price: '100000' },
        { source: require('../screen/avatars/boyavatars-46.png'), caption: 'Earrings', price: '800' },
        { source: require('../screen/avatars/boyavatars-53.png'), caption: 'Star Shirt', price: '9000' },
        { source: require('../screen/avatars/boyavatars-60.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-11.png': [
        { source: require('../screen/avatars/boyavatars-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-39.png'), caption: 'Sunglasses', price: '100000' },
        { source: require('../screen/avatars/boyavatars-46.png'), caption: 'Earrings', price: '800' },
        { source: require('../screen/avatars/boyavatars-53.png'), caption: 'Star Shirt', price: '9000' },
        { source: require('../screen/avatars/boyavatars-60.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-18.png': [
        { source: require('../screen/avatars/boyavatars-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-39.png'), caption: 'Sunglasses', price: '100000' },
        { source: require('../screen/avatars/boyavatars-46.png'), caption: 'Earrings', price: '800' },
        { source: require('../screen/avatars/boyavatars-53.png'), caption: 'Star Shirt', price: '9000' },
        { source: require('../screen/avatars/boyavatars-60.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-25.png': [
        { source: require('../screen/avatars/boyavatars-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-39.png'), caption: 'Sunglasses', price: '100000' },
        { source: require('../screen/avatars/boyavatars-46.png'), caption: 'Earrings', price: '800' },
        { source: require('../screen/avatars/boyavatars-53.png'), caption: 'Star Shirt', price: '9000' },
        { source: require('../screen/avatars/boyavatars-60.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-32.png': [
        { source: require('../screen/avatars/boyavatars-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-39.png'), caption: 'Sunglasses', price: '100000' },
        { source: require('../screen/avatars/boyavatars-46.png'), caption: 'Earrings', price: '800' },
        { source: require('../screen/avatars/boyavatars-53.png'), caption: 'Star Shirt', price: '9000' },
        { source: require('../screen/avatars/boyavatars-60.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-39.png': [
        { source: require('../screen/avatars/boyavatars-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-39.png'), caption: 'Sunglasses', price: '100000' },
        { source: require('../screen/avatars/boyavatars-46.png'), caption: 'Earrings', price: '800' },
        { source: require('../screen/avatars/boyavatars-53.png'), caption: 'Star Shirt', price: '9000' },
        { source: require('../screen/avatars/boyavatars-60.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-46.png': [
        { source: require('../screen/avatars/boyavatars-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-39.png'), caption: 'Sunglasses', price: '100000' },
        { source: require('../screen/avatars/boyavatars-46.png'), caption: 'Earrings', price: '800' },
        { source: require('../screen/avatars/boyavatars-53.png'), caption: 'Star Shirt', price: '9000' },
        { source: require('../screen/avatars/boyavatars-60.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-53.png': [
        { source: require('../screen/avatars/boyavatars-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-39.png'), caption: 'Sunglasses', price: '100000' },
        { source: require('../screen/avatars/boyavatars-46.png'), caption: 'Earrings', price: '800' },
        { source: require('../screen/avatars/boyavatars-53.png'), caption: 'Star Shirt', price: '9000' },
        { source: require('../screen/avatars/boyavatars-60.png'), caption: 'Headphones', price: '$11000' },
      ],'boyavatars-60.png': [
        { source: require('../screen/avatars/boyavatars-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-39.png'), caption: 'Sunglasses', price: '100000' },
        { source: require('../screen/avatars/boyavatars-46.png'), caption: 'Earrings', price: '800' },
        { source: require('../screen/avatars/boyavatars-53.png'), caption: 'Star Shirt', price: '9000' },
        { source: require('../screen/avatars/boyavatars-60.png'), caption: 'Headphones', price: '$11000' },
      ],






      'boyavatars-05.png': [
        { source: require('../screen/avatars/boyavatars-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-12.png': [
        { source: require('../screen/avatars/boyavatars-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-19.png': [
        { source: require('../screen/avatars/boyavatars-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-26.png': [
        { source: require('../screen/avatars/boyavatars-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-33.png': [
        { source: require('../screen/avatars/boyavatars-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-40.png': [
        { source: require('../screen/avatars/boyavatars-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-47.png': [
        { source: require('../screen/avatars/boyavatars-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-54.png': [
        { source: require('../screen/avatars/boyavatars-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-61.png': [
        { source: require('../screen/avatars/boyavatars-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-61.png'), caption: 'Headphones', price: '$11000' },
      ],




      'boyavatars-06.png': [
        { source: require('../screen/avatars/boyavatars-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-62.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-13.png': [
        { source: require('../screen/avatars/boyavatars-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-62.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-20.png': [
        { source: require('../screen/avatars/boyavatars-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-62.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-27.png': [
        { source: require('../screen/avatars/boyavatars-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-62.png'), caption: 'Headphones', price: '$11000' },
      ],
'boyavatars-34.png': [
        { source: require('../screen/avatars/boyavatars-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-62.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-41.png': [
        { source: require('../screen/avatars/boyavatars-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-62.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-48.png': [
        { source: require('../screen/avatars/boyavatars-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-62.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-55.png': [
        { source: require('../screen/avatars/boyavatars-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-62.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-62.png': [
        { source: require('../screen/avatars/boyavatars-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-62.png'), caption: 'Headphones', price: '$11000' },
      ],




      'boyavatars-07.png': [
        { source: require('../screen/avatars/boyavatars-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-63.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-14.png': [
        { source: require('../screen/avatars/boyavatars-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-63.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-21.png': [
        { source: require('../screen/avatars/boyavatars-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-63.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-28.png': [
        { source: require('../screen/avatars/boyavatars-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-63.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-35.png': [
        { source: require('../screen/avatars/boyavatars-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-63.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-07.png': [
        { source: require('../screen/avatars/boyavatars-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-63.png'), caption: 'Headphones', price: '$11000' },
      ], 'boyavatars-42.png': [
        { source: require('../screen/avatars/boyavatars-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-63.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-49.png': [
        { source: require('../screen/avatars/boyavatars-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-63.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-56.png': [
        { source: require('../screen/avatars/boyavatars-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-63.png'), caption: 'Headphones', price: '$11000' },
      ],
      'boyavatars-63.png': [
        { source: require('../screen/avatars/boyavatars-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/boyavatars-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/boyavatars-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/boyavatars-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/boyavatars-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/boyavatars-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/boyavatars-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/boyavatars-63.png'), caption: 'Headphones', price: '$11000' },
      ],

    },
    girl: {


      'avatargirls-01.png': [
        { source: require('../screen/avatars/avatargirls-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-08.png': [
        { source: require('../screen/avatars/avatargirls-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-15.png': [
        { source: require('../screen/avatars/avatargirls-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-22.png': [
        { source: require('../screen/avatars/avatargirls-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-29.png': [
        { source: require('../screen/avatars/avatargirls-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-36.png': [
        { source: require('../screen/avatars/avatargirls-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-43.png': [
        { source: require('../screen/avatars/avatargirls-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-50.png': [
        { source: require('../screen/avatars/avatargirls-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-57.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-57.png': [
        { source: require('../screen/avatars/avatargirls-08.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-15.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-22.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-29.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-36.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-43.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-50.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-57.png'), caption: 'Headphones', price: '$11000' },
      ],










      'avatargirls-02.png': [
        { source: require('../screen/avatars/avatargirls-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-58.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-09.png': [
        { source: require('../screen/avatars/avatargirls-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-58.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-16.png': [
        { source: require('../screen/avatars/avatargirls-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-58.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-23.png': [
        { source: require('../screen/avatars/avatargirls-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-58.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-30.png': [
        { source: require('../screen/avatars/avatargirls-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-58.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-37.png': [
        { source: require('../screen/avatars/avatargirls-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-58.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-44.png': [
        { source: require('../screen/avatars/avatargirls-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-58.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-51.png': [
        { source: require('../screen/avatars/avatargirls-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-58.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-58.png': [
        { source: require('../screen/avatars/avatargirls-09.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-16.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-23.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-30.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-37.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-44.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-51.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-58.png'), caption: 'Headphones', price: '$11000' },
      ],







      'avatargirls-03.png': [
        { source: require('../screen/avatars/avatargirls-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-59.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-10.png': [
        { source: require('../screen/avatars/avatargirls-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-59.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-17.png': [
        { source: require('../screen/avatars/avatargirls-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-59.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-24.png': [
        { source: require('../screen/avatars/avatargirls-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-59.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-31.png': [
        { source: require('../screen/avatars/avatargirls-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-59.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-38.png': [
        { source: require('../screen/avatars/avatargirls-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-59.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-45.png': [
        { source: require('../screen/avatars/avatargirls-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-59.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-52.png': [
        { source: require('../screen/avatars/avatargirls-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-59.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-59.png': [
        { source: require('../screen/avatars/avatargirls-10.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-17.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-24.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-31.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-38.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-45.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-52.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-59.png'), caption: 'Headphones', price: '$11000' },
      ],



      'avatargirls-04.png': [
        { source: require('../screen/avatars/avatargirls-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-39.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-46.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-53.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-60.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-11.png': [
        { source: require('../screen/avatars/avatargirls-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-39.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-46.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-53.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-60.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-18.png': [
        { source: require('../screen/avatars/avatargirls-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-39.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-46.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-53.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-60.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-25.png': [
        { source: require('../screen/avatars/avatargirls-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-39.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-46.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-53.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-60.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-32.png': [
        { source: require('../screen/avatars/avatargirls-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-39.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-46.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-53.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-60.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-39.png': [
        { source: require('../screen/avatars/avatargirls-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-39.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-46.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-53.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-60.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-46.png': [
        { source: require('../screen/avatars/avatargirls-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-39.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-46.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-53.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-60.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-53.png': [
        { source: require('../screen/avatars/avatargirls-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-39.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-46.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-53.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-60.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-60.png': [
        { source: require('../screen/avatars/avatargirls-11.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-18.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-25.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-32.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-39.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-46.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-53.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-60.png'), caption: 'Headphones', price: '$11000' },
      ],







      'avatargirls-05.png': [
        { source: require('../screen/avatars/avatargirls-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-61.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-12.png': [
        { source: require('../screen/avatars/avatargirls-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-61.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-19.png': [
        { source: require('../screen/avatars/avatargirls-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-26.png': [
        { source: require('../screen/avatars/avatargirls-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-33.png': [
        { source: require('../screen/avatars/avatargirls-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-40.png': [
        { source: require('../screen/avatars/avatargirls-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-47.png': [
        { source: require('../screen/avatars/avatargirls-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-54.png': [
        { source: require('../screen/avatars/avatargirls-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-61.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-61.png': [
        { source: require('../screen/avatars/avatargirls-12.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-19.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-26.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-33.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-40.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-47.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-54.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-61.png'), caption: 'Headphones', price: '$11000' },
      ],







      'avatargirls-06.png': [
        { source: require('../screen/avatars/avatargirls-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-62.png'), caption: 'Headphones', price: '$11000' },
      ],'avatargirls-13.png': [
        { source: require('../screen/avatars/avatargirls-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-62.png'), caption: 'Headphones', price: '$11000' },
      ],'avatargirls-20.png': [
        { source: require('../screen/avatars/avatargirls-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-62.png'), caption: 'Headphones', price: '$11000' },
      ],'avatargirls-27.png': [
        { source: require('../screen/avatars/avatargirls-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-62.png'), caption: 'Headphones', price: '$11000' },
      ],'avatargirls-34.png': [
        { source: require('../screen/avatars/avatargirls-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-62.png'), caption: 'Headphones', price: '$11000' },
      ],'avatargirls-41.png': [
        { source: require('../screen/avatars/avatargirls-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-62.png'), caption: 'Headphones', price: '$11000' },
      ],'avatargirls-48.png': [
        { source: require('../screen/avatars/avatargirls-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-62.png'), caption: 'Headphones', price: '$11000' },
      ],'avatargirls-55.png': [
        { source: require('../screen/avatars/avatargirls-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-62.png'), caption: 'Headphones', price: '$11000' },
      ],'avatargirls-62.png': [
        { source: require('../screen/avatars/avatargirls-13.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-20.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-27.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-34.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-41.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-48.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-55.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-62.png'), caption: 'Headphones', price: '$11000' },
      ],




      'avatargirls-07.png': [
        { source: require('../screen/avatars/avatargirls-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-63.png'), caption: 'Headphones', price: '$11000' },
      ],
      'avatargirls-14.png': [
        { source: require('../screen/avatars/avatargirls-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-63.png'), caption: 'Headphones', price: '$11000' },
      ],


      'avatargirls-21.png': [
        { source: require('../screen/avatars/avatargirls-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-63.png'), caption: 'Headphones', price: '$11000' },
      ],


      'avatargirls-28.png': [
        { source: require('../screen/avatars/avatargirls-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-63.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-35.png': [
        { source: require('../screen/avatars/avatargirls-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-63.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-42.png': [
        { source: require('../screen/avatars/avatargirls-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-63.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-49.png': [
        { source: require('../screen/avatars/avatargirls-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-63.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-56.png': [
        { source: require('../screen/avatars/avatargirls-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-63.png'), caption: 'Headphones', price: '$11000' },
      ],

      'avatargirls-63.png': [
        { source: require('../screen/avatars/avatargirls-14.png'), caption: 'Headband', price: '$10000' },
        { source: require('../screen/avatars/avatargirls-21.png'), caption: 'Bow', price: '$2000' },
        { source: require('../screen/avatars/avatargirls-28.png'), caption: 'Hat', price: '$3000' },
        { source: require('../screen/avatars/avatargirls-35.png'), caption: 'Cap', price: '$20000' },
        { source: require('../screen/avatars/avatargirls-42.png'), caption: 'Sunglasses', price: '$100000' },
        { source: require('../screen/avatars/avatargirls-49.png'), caption: 'Earrings', price: '$800' },
        { source: require('../screen/avatars/avatargirls-56.png'), caption: 'Star Shirt', price: '$9000' },
        { source: require('../screen/avatars/avatargirls-63.png'), caption: 'Headphones', price: '$11000' },
      ],
    },
  };
  

  const AvatarCustomizationScreen = () => {
    const [userID, setUserId] = useState(null);
    const [avatarURL, setAvatarURL] = useState('');
    const [avatarArray, setAvatarArray] = useState([]);
    const [avatarType, setAvatarType] = useState('girl');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [headerText, setHeaderText] = useState('0'); 
    const navigation = useNavigation();

    const handleHomePress = () => {
        console.log("Home button pressed");
        navigation.navigate('Home'); 
      };
  
    useEffect(() => {
      const getUserId = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem('userID');
          if (storedUserId) {
            setUserId(storedUserId);
            await fetchAvatarUrl(storedUserId);
          }
        } catch (error) {
          console.error('Failed to load user ID', error);
        }
      };
  
      getUserId();
  
      return () => {
        setUserId(null);
        setAvatarArray([]);
        setAvatarType('');
      };
    }, []);
    
    const fetchAvatarUrl = async (userId) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', userId)
        .single();
  
      if (error) {
        console.error('Error fetching avatar URL:', error);
        return;
      }
  
      if (data) {
        setAvatarURL(data.avatar_url);
      } else {
        console.warn('No data found for user ID:', userId);
      }
    };
  
    const getAvatarImages = () => {
      if (avatarURL) {
        const avatarKeyMatch = avatarURL.match(/(boyavatars|avatargirls)-\d+\.png/);
        
        if (avatarKeyMatch) {
          const avatarKey = avatarKeyMatch[0];
          let avatarType = avatarKey.startsWith('boyavatars') ? 'boy' : 'girl';
          
          const foundImages = avatarImages[avatarType]?.[avatarKey];
  
          if (foundImages) {
            setAvatarArray(foundImages);
          } else {
            setAvatarArray([]);
          }
        } else {
          setAvatarArray([]);
        }
      }
    };
  
    useEffect(() => {
      getAvatarImages();
    }, [avatarURL]);
  
    const handleImagePress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handlePurchase = async () => {
        try {
            // Fetch the user's coins and purchased items from the profiles table
            const { data, error } = await supabase
                .from('profiles')
                .select('coins, purchased_items')
                .eq('id', userID) // Ensure you're using the correct user ID
                .single();
            
            if (error) {
                console.error('Error fetching profile:', error);
                alert('There was an error fetching your profile. Please try again later.');
                return;
            }
    
            const userCoins = data.coins;
            const purchasedItems = data.purchased_items || []; // Default to an empty array if undefined
            const itemPrice = parseInt(selectedItem.price.replace(/[^0-9]/g, ''), 10); // Convert price string to number
    
            // Check if the item has already been purchased
            if (purchasedItems.includes(selectedItem.caption)) {
                alert('You have already purchased this item.');
                return;
            }
    
            if (userCoins >= itemPrice) {
                // Proceed with the purchase
                alert(`Purchased: ${selectedItem.caption} for ${selectedItem.price}`);
                setModalVisible(false);
    
                // Deduct the item price and update purchased items in the database
                const { updateError } = await supabase
                    .from('profiles')
                    .update({
                        coins: userCoins - itemPrice,
                        avatar_url: selectedItem.source,
                        purchased_items: [...purchasedItems, selectedItem.caption] // Add the purchased item
                    })
                    .eq('id', userID);
        
                if (updateError) {
                    console.error('Error updating coins and avatar URL:', updateError);
                    alert('There was an error processing your purchase. Please try again later.');
                } else {
                    // Optionally show a success message or update UI
                    console.log('Purchase successful! Coins updated and avatar URL changed.');
                }
            } else {
                alert('You need more coins to purchase this item. Please create more artwork!');
            }
        } catch (error) {
            console.error('Error during purchase:', error);
            alert('An error occurred during the purchase. Please try again later.');
        }
    };    
    

    return (
        <View style={styles.container}>
            <Header 
                text={headerText}
                onSettingsPress={() => navigation.navigate('Settings')} 
                iconColor="#FFFFFF" // Set icon color to white
                textColor="#FFFFFF" // Set text color to white
            />
             <View style={[styles.homeButton, { marginTop: marginTopHomeButton }]}>
                <TouchableOpacity onPress={handleHomePress}>
                    <Image source={require("../screen/assets/home.png")} style={styles.home} />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Customize Your Avatar</Text>
            <View style={styles.avatarContainer}>
                {avatarArray.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleImagePress(item)}>
                        <Image 
                            source={item.source} 
                            style={[styles.avatarImage, { width: avatarImageSize, height: avatarImageSize }]} 
                        />
                        <Text style={styles.caption}>{item.caption}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {selectedItem && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Purchase Item</Text>
                        <Image 
                            source={selectedItem.source} 
                            style={[styles.modalImage, { width: avatarImageSize * 1.5, height: avatarImageSize * 1.5 }]} 
                        />
                        <Text style={styles.modalCaption}>{selectedItem.caption}</Text>
                        <Text style={styles.modalPrice}>{selectedItem.price}</Text>
                        <Button title="Purchase" onPress={handlePurchase} />
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#213D61',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    avatarContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    avatarImage: {
        marginHorizontal: 5,
    },
    caption: {
        textAlign: 'center',
        color: 'white',
    },
    price: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    modalImage: {
        // Size is adjusted dynamically based on avatarImageSize
    },
    modalCaption: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    modalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginTop: '2%',
    },
    homeButton: {
        position: 'absolute',
        top: '4%', 
        right: '5%', 
        zIndex: 10,
    },
    home: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
});

export default AvatarCustomizationScreen;