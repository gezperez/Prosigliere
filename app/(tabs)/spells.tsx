import { Spell } from '@/api/hp/types';
import { Text } from '@/app/ds/components/Text';
import {
  Colors,
  Colors as TextColors,
} from '@/app/ds/components/Text/enums/Colors';
import HouseShield from '@/components/HouseShield';
import SpellCard from '@/components/SpellCard/SpellCard';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSpells } from '@/store/hpSlice';
import { selectSelectedHouse } from '@/store/selectors/characters';
import { selectSpells } from '@/store/selectors/spell';
import { router, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SpellsPage() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { lighterThemeColor } = useThemeColor();
  const spells = useAppSelector(selectSpells);
  const selectedHouse = useAppSelector(selectSelectedHouse);
  const loading = useAppSelector(state => state.hp.spellsLoading);

  useEffect(() => {
    dispatch(getSpells());
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

  const renderItem = ({ item }: { item: Spell }) => {
    return <SpellCard spell={item} />;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.DARK_BROWN}
          style={styles.activityIndicator}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: lighterThemeColor }]}>
      <View style={styles.header}>
        <Text variant="caption">{spells.length} spells</Text>
      </View>

      <FlatList
        data={spells}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
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
    backgroundColor: Colors.WHITE,
  },
  activityIndicator: {
    opacity: 0.8,
  },
  header: {
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
});
