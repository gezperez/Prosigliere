import { Character } from '@/api/hp/types';
import { Text } from '@/app/ds/components/Text';
import CharacterCard from '@/components/CharacterCard/CharacterCard';
import { FilterType } from '@/components/Filter/Filter';
import Filters from '@/components/Filters/Filters';
import { Colors } from '@/constants/Colors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCharacters } from '@/store/hpSlice';
import {
  selectCharacters,
  selectFavoriteCharacters,
  selectStaff,
  selectStudents,
} from '@/store/selectors/characters';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

enum CharacterFilter {
  ALL = 'all',
  STUDENTS = 'students',
  STAFF = 'staff',
  FAVORITES = 'favorites',
}

export default function CharactersPage() {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);
  const students = useAppSelector(selectStudents);
  const staff = useAppSelector(selectStaff);
  const favoriteIds = useAppSelector(selectFavoriteCharacters);
  const loading = useAppSelector(state => state.hp.charactersLoading);

  const [selectedFilterId, setSelectedFilterId] = useState<CharacterFilter>(
    CharacterFilter.ALL
  );

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  const getFilteredCharacters = (): Character[] => {
    switch (selectedFilterId) {
      case CharacterFilter.STUDENTS:
        return students;
      case CharacterFilter.STAFF:
        return staff;
      case CharacterFilter.FAVORITES:
        return characters.filter(char => favoriteIds.includes(char.id));
      default:
        return characters;
    }
  };

  const filters = useMemo(() => {
    return [
      {
        id: CharacterFilter.ALL,
        name: 'All',
        selected: selectedFilterId === CharacterFilter.ALL,
      },
      {
        id: CharacterFilter.STUDENTS,
        name: 'Students',
        selected: selectedFilterId === CharacterFilter.STUDENTS,
      },
      {
        id: CharacterFilter.STAFF,
        name: 'Staff',
        selected: selectedFilterId === CharacterFilter.STAFF,
      },
      {
        id: CharacterFilter.FAVORITES,
        name: `Favorites (${favoriteIds.length})`,
        selected: selectedFilterId === CharacterFilter.FAVORITES,
      },
    ];
  }, [selectedFilterId, favoriteIds.length]);

  const handleFilterPress = (filter: FilterType) => {
    setSelectedFilterId(filter.id as CharacterFilter);
  };

  const renderItem = ({ item }: { item: Character }) => {
    return <CharacterCard character={item} />;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="title">Characters</Text>
        <Text variant="caption">
          {getFilteredCharacters().length} characters
        </Text>
      </View>

      <Filters filters={filters} onFilterPress={handleFilterPress} />

      <FlatList
        data={getFilteredCharacters()}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
});
