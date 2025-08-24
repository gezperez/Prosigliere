import React from 'react';
import { View, ViewStyle } from 'react-native';

interface TabBarBackgroundProps {
  style?: ViewStyle;
}

export default function TabBarBackground({ style }: TabBarBackgroundProps) {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.1)',
        },
        style,
      ]}
    />
  );
}
