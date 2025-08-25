import { Colors } from '@/app/ds/components/Text/enums/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface ProfilePictureSelectorProps {
  onImageSelected?: (uri: string) => void;
  size?: number;
}

export default function ProfilePictureSelector({
  onImageSelected,
  size = 120,
}: ProfilePictureSelectorProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message:
            'This app needs access to your camera to take a profile picture.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return status === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === 'granted';
    }
  };

  const takePicture = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to take a profile picture.'
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        onImageSelected?.(imageUri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { width: size, height: size }]}
      onPress={takePicture}
      activeOpacity={0.8}
    >
      {selectedImage ? (
        <Image
          source={{ uri: selectedImage }}
          style={[styles.image, { width: size, height: size }]}
          contentFit="cover"
        />
      ) : (
        <IconSymbol size={size * 0.4} name="camera" color={Colors.DARK_BROWN} />
      )}
      <TouchableOpacity
        style={[styles.cameraButton, { width: size * 0.3, height: size * 0.3 }]}
        onPress={takePicture}
      >
        <IconSymbol size={size * 0.15} name="camera" color={Colors.WHITE} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 60,
    backgroundColor: Colors.TERTIARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.DARK_BROWN,
    borderStyle: 'dashed',
  },
  image: {
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: Colors.DARK_BROWN,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.WHITE,
  },
});
