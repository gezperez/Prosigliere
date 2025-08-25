import { Text } from '@/app/ds/components/Text';
import { Colors } from '@/app/ds/components/Text/enums/Colors';
import FavoriteButton from '@/components/FavoriteButton/FavoriteButton';
import { useAppSelector } from '@/store/hooks';
import { selectCharacters } from '@/store/selectors/characters';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

export default function CharacterDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const characters = useAppSelector(selectCharacters);

  const character = characters.find(c => c.id === id);

  if (!character) {
    return (
      <View style={styles.container}>
        <Text variant="title" style={styles.errorText}>
          Character Not Found
        </Text>
      </View>
    );
  }

  const getHouseColor = (house: string) => {
    switch (house?.toLowerCase()) {
      case 'gryffindor':
        return Colors.GRYFFINDOR;
      case 'slytherin':
        return Colors.SLYTHERIN;
      case 'ravenclaw':
        return Colors.RAVENCLAW;
      case 'hufflepuff':
        return Colors.HUFFLEPUFF;
      default:
        return Colors.DARK_BROWN;
    }
  };

  const getHouseImage = (house: string) => {
    switch (house?.toLowerCase()) {
      case 'gryffindor':
        return require('@/assets/images/gryffindor.png');
      case 'ravenclaw':
        return require('@/assets/images/ravenclaw.png');
      case 'hufflepuff':
        return require('@/assets/images/hufflepuff.png');
      case 'slytherin':
        return require('@/assets/images/slytherin.png');
      default:
        return require('@/assets/images/gryffindor.png');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageSection}>
        {character.image ? (
          <Image
            source={{ uri: character.image }}
            style={styles.characterImage}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>?</Text>
          </View>
        )}

        {character.house && (
          <View style={styles.houseSection}>
            <Image
              source={getHouseImage(character.house)}
              style={styles.houseImage}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.houseText,
                { color: getHouseColor(character.house) },
              ]}
            >
              {character.house}
            </Text>
          </View>
        )}

        <FavoriteButton
          characterId={character.id}
          size={32}
          style={styles.favoriteButton}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.infoSection}>
          <Text variant="subtitle" style={styles.sectionTitle}>
            Basic Information
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Species:</Text>
            <Text style={styles.value}>{character.species || 'Unknown'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{character.gender || 'Unknown'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Date of Birth:</Text>
            <Text style={styles.value}>
              {formatDate(character.dateOfBirth)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Year of Birth:</Text>
            <Text style={styles.value}>
              {character.yearOfBirth || 'Unknown'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Wizard:</Text>
            <Text style={styles.value}>{character.wizard ? 'Yes' : 'No'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Ancestry:</Text>
            <Text style={styles.value}>{character.ancestry || 'Unknown'}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text variant="subtitle" style={styles.sectionTitle}>
            Physical Characteristics
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Eye Color:</Text>
            <Text style={styles.value}>{character.eyeColour || 'Unknown'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Hair Color:</Text>
            <Text style={styles.value}>
              {character.hairColour || 'Unknown'}
            </Text>
          </View>
        </View>

        {character.wand && (
          <View style={styles.infoSection}>
            <Text variant="subtitle" style={styles.sectionTitle}>
              Wand
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Wood:</Text>
              <Text style={styles.value}>
                {character.wand.wood || 'Unknown'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Core:</Text>
              <Text style={styles.value}>
                {character.wand.core || 'Unknown'}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Length:</Text>
              <Text style={styles.value}>
                {character.wand.length
                  ? `${character.wand.length} inches`
                  : 'Unknown'}
              </Text>
            </View>
          </View>
        )}

        {character.patronus && (
          <View style={styles.infoSection}>
            <Text variant="subtitle" style={styles.sectionTitle}>
              Patronus
            </Text>
            <Text style={styles.patronusText}>{character.patronus}</Text>
          </View>
        )}

        <View style={styles.infoSection}>
          <Text variant="subtitle" style={styles.sectionTitle}>
            Hogwarts Status
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Student:</Text>
            <Text style={styles.value}>
              {character.hogwartsStudent ? 'Yes' : 'No'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Staff:</Text>
            <Text style={styles.value}>
              {character.hogwartsStaff ? 'Yes' : 'No'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Alive:</Text>
            <Text style={styles.value}>{character.alive ? 'Yes' : 'No'}</Text>
          </View>
        </View>

        {character.actor && (
          <View style={styles.infoSection}>
            <Text variant="subtitle" style={styles.sectionTitle}>
              Actor
            </Text>
            <Text style={styles.actorText}>{character.actor}</Text>
          </View>
        )}

        {character.alternate_names && character.alternate_names.length > 0 && (
          <View style={styles.infoSection}>
            <Text variant="subtitle" style={styles.sectionTitle}>
              Alternate Names
            </Text>
            {character.alternate_names.map((name, index) => (
              <Text key={index} style={styles.alternateName}>
                • {name}
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 100,
    color: Colors.DARK_BROWN,
  },
  imageSection: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.WHITE,
  },
  characterImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: Colors.DARK_BROWN,
  },
  placeholderImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.DARK_BROWN,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.DARK_BROWN,
  },
  placeholderText: {
    fontSize: 48,
    color: Colors.LIGHT_BROWN,
    fontFamily: 'Caudex-Bold',
  },
  houseSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: Colors.LIGHT_BROWN,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.DARK_BROWN,
  },
  houseImage: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  houseText: {
    fontSize: 18,
    fontFamily: 'Caudex-Bold',
  },
  content: {
    padding: 16,
  },
  infoSection: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: Colors.LIGHT_BROWN,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.DARK_BROWN,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: 'center',
    color: Colors.DARK_BROWN,
    fontFamily: 'Caudex-Bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.DARK_BROWN,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Caudex-Regular',
    color: Colors.DARK_BROWN,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    fontFamily: 'Caudex-Regular',
    color: Colors.DARK_BROWN,
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  patronusText: {
    fontSize: 18,
    fontFamily: 'Caudex-Regular',
    color: Colors.DARK_BROWN,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actorText: {
    fontSize: 16,
    fontFamily: 'Caudex-Regular',
    color: Colors.DARK_BROWN,
    textAlign: 'center',
  },
  alternateName: {
    fontSize: 16,
    fontFamily: 'Caudex-Regular',
    color: Colors.DARK_BROWN,
    marginVertical: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
