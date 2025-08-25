import { Character } from '@/api/hp/types';
import { Text } from '@/app/ds/components/Text';
import { Colors as TextColors } from '@/app/ds/components/Text/enums/Colors';
import CharacterCard from '@/components/CharacterCard/CharacterCard';
import { FilterType } from '@/components/Filter/Filter';
import Filters from '@/components/Filters/Filters';
import HouseShield from '@/components/HouseShield';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCharacters, getHouses } from '@/store/hpSlice';
import {
  selectCharacters,
  selectFavoriteCharacters,
  selectSelectedHouse,
  selectStaff,
  selectStudents,
} from '@/store/selectors/characters';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

enum CharacterFilter {
  ALL = 'all',
  STUDENTS = 'students',
  STAFF = 'staff',
  FAVORITES = 'favorites',
}

export default function CharactersPage() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { lighterThemeColor } = useThemeColor();
  const characters = useAppSelector(selectCharacters);
  const students = useAppSelector(selectStudents);
  const staff = useAppSelector(selectStaff);
  const favoriteIds = useAppSelector(selectFavoriteCharacters);
  const selectedHouse = useAppSelector(selectSelectedHouse);
  const loading = useAppSelector(state => state.hp.charactersLoading);

  const [selectedFilterId, setSelectedFilterId] = useState<CharacterFilter>(
    CharacterFilter.ALL
  );

  useEffect(() => {
    dispatch(getCharacters());
    dispatch(getHouses());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => router.push('/settings')}
          style={{ marginLeft: 16 }}
        >
          <IconSymbol size={24} name="gear" color={TextColors.DARK_BROWN} />
        </TouchableOpacity>
      ),
      headerRight: () =>
        selectedHouse && <HouseShield houseId={selectedHouse.id} size={28} />,
    });
  }, [navigation, selectedHouse]);

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

  const getFilterName = (): string => {
    switch (selectedFilterId) {
      case CharacterFilter.STUDENTS:
        return 'Students';
      case CharacterFilter.STAFF:
        return 'Staff';
      case CharacterFilter.FAVORITES:
        return 'Favorites';
      default:
        return 'Characters';
    }
  };

  const filteredCharacters = getFilteredCharacters();
  const hasCharacters = filteredCharacters.length > 0;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.light.darkBrown}
          style={styles.activityIndicator}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: lighterThemeColor }]}>
      <View style={styles.header}>
        <Text variant="caption">
          {filteredCharacters.length}{' '}
          {filteredCharacters.length === 1 ? 'character' : 'characters'}
        </Text>
      </View>

      <Filters filters={filters} onFilterPress={handleFilterPress} />

      {hasCharacters ? (
        <FlatList
          data={filteredCharacters}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />
      ) : (
        <View style={styles.notFoundContainer}>
          <Text variant="body" style={styles.notFoundText}>
            No {getFilterName().toLowerCase()} found
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  activityIndicator: {
    opacity: 0.8,
  },
  header: {
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    textAlign: 'center',
    opacity: 0.6,
  },
});
