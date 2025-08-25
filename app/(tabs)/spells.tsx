import { Spell } from '@/api/hp/types';
import { Text } from '@/app/ds/components/Text';
import SpellCard from '@/components/SpellCard/SpellCard';
import { Colors } from '@/constants/Colors';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSpells } from '@/store/hpSlice';
import { selectSpells } from '@/store/selectors/spell';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

enum SpellFilter {
  ALL = 'all',
  CHARMS = 'charms',
  CURSES = 'curses',
  TRANSFIGURATIONS = 'transfigurations',
  HEALING = 'healing',
}

export default function SpellsPage() {
  const dispatch = useAppDispatch();
  const spells = useAppSelector(selectSpells);
  const loading = useAppSelector(state => state.hp.spellsLoading);

  useEffect(() => {
    dispatch(getSpells());
  }, [dispatch]);

  const renderItem = ({ item }: { item: Spell }) => {
    return <SpellCard spell={item} />;
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
        <Text variant="title">Spells</Text>
        <Text variant="caption">{spells.length} spells</Text>
      </View>

      <FlatList
        data={spells}
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
