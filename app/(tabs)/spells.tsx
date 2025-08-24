import { Spell } from '@/api/hp/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSpells } from '@/store/hpSlice';
import { selectSpells } from '@/store/selectors/spell';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function SpellsPage() {
  const dispatch = useAppDispatch();
  const spells = useAppSelector(selectSpells);
  const loading = useAppSelector(state => state.hp.spellsLoading);

  useEffect(() => {
    dispatch(getSpells());
  }, [dispatch]);

  const renderSpellItem = ({ item }: { item: Spell }) => (
    <View style={styles.spellCard}>
      <View style={styles.spellHeader}>
        <Text style={styles.spellName}>{item.name}</Text>
      </View>
      <View style={styles.spellContent}>
        <Text style={styles.spellDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {loading ? 'Loading spells...' : 'No spells found'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Spells</Text>
        <Text style={styles.subtitle}>{spells.length} spells</Text>
      </View>

      {/* Spells List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading spells...</Text>
        </View>
      ) : (
        <FlatList
          data={spells}
          renderItem={renderSpellItem}
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
  spellCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  spellHeader: {
    marginBottom: 12,
  },
  spellName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  spellContent: {},
  spellDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
