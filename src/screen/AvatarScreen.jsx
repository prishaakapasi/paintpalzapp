import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { getAvatars } from '../api/avatarApi';
import Avatar from '../components/Avatar';

const { width } = Dimensions.get('window');

export default function AvatarSelectionScreen({ navigation }) {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const fetchedAvatars = await getAvatars();
      setAvatars(fetchedAvatars);
    };
    fetchAvatarsg();
  }, []);

  const renderAvatar = ({ item }) => (
    <TouchableOpacity
      style={styles.avatarContainer}
      onPress={() => navigation.navigate('OutfitPurchase', { avatarId: item.id })}
    >
      <Avatar uri={item.imageUri} size={width / 3 - 20} />
      <Text style={styles.avatarName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={avatars}
        renderItem={renderAvatar}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    margin: 5,
    width: width / 3 - 10,
  },
  avatarName: {
    marginTop: 5,
    textAlign: 'center',
  },
});
