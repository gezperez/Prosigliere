import { House } from '@/api/hp/types';
import { Text } from '@/app/ds/components/Text';
import { Colors } from '@/app/ds/components/Text/enums/Colors';
import HouseCard from '@/components/HouseCard/HouseCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedHouse } from '@/store/hpSlice';
import { selectHouses } from '@/store/selectors/characters';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function HouseSelectionPage() {
  const dispatch = useAppDispatch();
  const houses = useAppSelector(selectHouses);

  const handleHouseSelect = (house: House) => {
    dispatch(setSelectedHouse(house));
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text variant="title" style={styles.title}>
              {'Choose Your House'}
            </Text>
            <Text variant="body" style={styles.subtitle}>
              Select your favorite Harry Potter house
            </Text>
          </View>

          <View style={styles.housesContainer}>
            {houses.map(house => (
              <HouseCard
                key={house.id}
                house={house}
                onSelect={() => handleHouseSelect(house)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 4,
    color: Colors.DARK_BROWN,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  housesContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  houseCard: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  selectedHouse: {
    borderWidth: 2,
    borderColor: Colors.DARK_BROWN,
  },
  houseImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  houseInfo: {
    flex: 1,
  },
  houseName: {
    marginBottom: 4,
  },
  houseDescription: {
    opacity: 0.7,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  continueContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: Colors.DARK_BROWN,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueText: {
    color: Colors.WHITE,
    fontWeight: '600',
  },
});
