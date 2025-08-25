import { Text } from '@/app/ds/components/Text';
import { Colors } from '@/app/ds/components/Text/enums/Colors';
import HouseCard from '@/components/HouseCard/HouseCard';
import ProfilePictureSelector from '@/components/ProfilePictureSelector';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useAppSelector } from '@/store/hooks';
import {
  selectHouses,
  selectSelectedHouse,
} from '@/store/selectors/characters';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function SettingsPage() {
  const { lighterThemeColor } = useThemeColor();
  const houses = useAppSelector(selectHouses);
  const selectedHouse = useAppSelector(selectSelectedHouse);

  const getSelectedHouse = () => {
    return houses.find(house => house.id === selectedHouse?.id);
  };

  const selectedHouseData = getSelectedHouse();

  const handleHouseSelect = () => {
    router.push(`/house-selection`);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: lighterThemeColor }]}
    >
      <View style={styles.content}>
        <View style={styles.profileSection}>
          <Text variant="title" style={styles.profileName}>
            Your Profile Picture
          </Text>
          <ProfilePictureSelector
            size={120}
            onImageSelected={uri => {
              console.log('Profile picture selected:', uri);
              // Here you can save the image URI to your app's state/storage
            }}
          />
        </View>

        <View style={styles.section}>
          <Text variant="title" style={styles.sectionTitle}>
            Your House
          </Text>

          {selectedHouseData ? (
            <HouseCard house={selectedHouseData} onSelect={handleHouseSelect} />
          ) : (
            <TouchableOpacity
              style={styles.selectHouseCard}
              onPress={() => router.push('/house-selection')}
            >
              <View style={styles.selectHouseContent}>
                <IconSymbol size={32} name="house" color={Colors.DARK_BROWN} />
                <Text variant="title" style={styles.selectHouseText}>
                  Select Your House
                </Text>
                <Text variant="caption" style={styles.selectHouseSubtext}>
                  Choose your favorite Harry Potter house
                </Text>
              </View>
              <IconSymbol
                size={24}
                name="chevron.right"
                color={Colors.DARK_BROWN}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  profileName: {
    marginBottom: 16,
    fontSize: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: '600',
  },
  selectedHouseCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 20,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  houseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  houseImage: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  houseDetails: {
    flex: 1,
  },
  houseName: {
    marginBottom: 4,
    fontSize: 18,
  },
  houseDescription: {
    opacity: 0.7,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.DARK_BROWN,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  changeButtonText: {
    color: Colors.WHITE,
    marginLeft: 8,
    fontWeight: '600',
  },
  selectHouseCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectHouseContent: {
    flex: 1,
    alignItems: 'center',
  },
  selectHouseText: {
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  selectHouseSubtext: {
    textAlign: 'center',
    opacity: 0.7,
  },
  infoCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 20,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    opacity: 0.7,
  },
  infoValue: {
    fontWeight: '600',
  },
});
