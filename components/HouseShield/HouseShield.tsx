import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface HouseShieldProps {
  houseId: string | null;
  size?: number;
}

const houseImages = {
  gryffindor: require('@/assets/images/gryffindor.png'),
  slytherin: require('@/assets/images/slytherin.png'),
  ravenclaw: require('@/assets/images/ravenclaw.png'),
  hufflepuff: require('@/assets/images/hufflepuff.png'),
};

export default function HouseShield({ houseId, size = 32 }: HouseShieldProps) {
  if (!houseId || !houseImages[houseId as keyof typeof houseImages]) {
    return null;
  }

  const handlePress = () => {
    router.push('/house-selection');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, { width: size, height: size }]}
    >
      <Image
        source={houseImages[houseId as keyof typeof houseImages]}
        style={[styles.image, { width: size, height: size }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
