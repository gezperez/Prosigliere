import { Colors } from '@/app/ds/components/Text/enums/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/hpSlice';
import { selectIsCharacterFavorite } from '@/store/selectors/characters';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type FavoriteButtonProps = {
  characterId: string;
  size?: number;
  style?: any;
};

const FavoriteButton = ({
  characterId,
  size = 24,
  style,
}: FavoriteButtonProps) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsCharacterFavorite(characterId));

  const handlePress = () => {
    dispatch(toggleFavorite(characterId));
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <IconSymbol
        name={isFavorite ? 'heart.fill' : 'heart'}
        size={size}
        color={isFavorite ? Colors.GRYFFINDOR : Colors.DARK_BROWN}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

export default FavoriteButton;
