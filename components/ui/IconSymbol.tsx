import React from 'react';
import { Text, TextProps } from 'react-native';

interface IconSymbolProps extends TextProps {
  name: string;
  size?: number;
  color?: string;
}

export function IconSymbol({
  name,
  size = 24,
  color = '#000',
  style,
  ...props
}: IconSymbolProps) {
  // Simple emoji-based icons as fallback
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'person.3.fill':
        return '👥';
      case 'sparkles':
        return '✨';
      default:
        return '📱';
    }
  };

  return (
    <Text
      style={[
        {
          fontSize: size,
          color: color,
        },
        style,
      ]}
      {...props}
    >
      {getIcon(name)}
    </Text>
  );
}
