import { Character } from '@/api/hp/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCharacters } from '@/store/hpSlice';
import {
  selectCharacters,
  selectStaff,
  selectStudents,
} from '@/store/selectors/characters';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type FilterType = 'all' | 'students' | 'staff';

export default function CharactersPage() {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);
  const students = useAppSelector(selectStudents);
  const staff = useAppSelector(selectStaff);
  const loading = useAppSelector(state => state.hp.charactersLoading);

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  const getFilteredCharacters = (): Character[] => {
    switch (selectedFilter) {
      case 'students':
        return students;
      case 'staff':
        return staff;
      default:
        return characters;
    }
  };

  const renderFilterButton = (filter: FilterType, label: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.filterButtonActive,
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === filter && styles.filterButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderCharacterItem = ({ item }: { item: Character }) => (
    <View style={styles.characterCard}>
      <View style={styles.characterImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.characterImage}
          defaultSource={require('@/assets/images/icon.png')}
        />
      </View>
      <View style={styles.characterInfo}>
        <Text style={styles.characterName}>{item.name}</Text>
        <Text style={styles.characterActor}>Played by {item.actor}</Text>
        {item.house && (
          <View style={styles.houseContainer}>
            <Text style={styles.houseLabel}>House:</Text>
            <Text style={styles.houseName}>{item.house}</Text>
          </View>
        )}
        {item.patronus && (
          <View style={styles.patronusContainer}>
            <Text style={styles.patronusLabel}>Patronus:</Text>
            <Text style={styles.patronusName}>{item.patronus}</Text>
          </View>
        )}
        <View style={styles.statusContainer}>
          {item.hogwartsStudent && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Student</Text>
            </View>
          )}
          {item.hogwartsStaff && (
            <View style={[styles.statusBadge, styles.staffBadge]}>
              <Text style={styles.statusText}>Staff</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {loading ? 'Loading characters...' : 'No characters found'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Characters</Text>
        <Text style={styles.subtitle}>
          {getFilteredCharacters().length} characters
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {renderFilterButton('all', 'All')}
        {renderFilterButton('students', 'Students')}
        {renderFilterButton('staff', 'Staff')}
      </View>

      {/* Characters List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading characters...</Text>
        </View>
      ) : (
        <FlatList
          data={getFilteredCharacters()}
          renderItem={renderCharacterItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          numColumns={1}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  characterCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  characterImageContainer: {
    marginRight: 16,
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
  },
  characterInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  characterActor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  houseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  houseLabel: {
    fontSize: 12,
    color: '#888',
    marginRight: 4,
  },
  houseName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  patronusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  patronusLabel: {
    fontSize: 12,
    color: '#888',
    marginRight: 4,
  },
  patronusName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  staffBadge: {
    backgroundColor: '#FF9800',
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
