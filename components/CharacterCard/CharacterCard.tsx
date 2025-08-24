import { Character } from '@/api/hp/types';
import { Text } from '@/app/ds/components/Text';
import { Colors } from '@/app/ds/components/Text/enums/Colors';
import { Image, View } from 'react-native';
import styles from './styles';

type CharacterCardProps = {
  character: Character;
};

const CharacterCard = ({ character }: CharacterCardProps) => {
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

  return (
    <View
      style={[
        styles.container,
        { borderColor: getHouseColor(character.house) },
      ]}
    >
      <View style={styles.imageContainer}>
        {character.image ? (
          <Image source={{ uri: character.image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>?</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{character.name}</Text>

        {character.house && <Text style={styles.house}>{character.house}</Text>}

        {character.patronus && (
          <Text style={styles.patronus}>Patronus: {character.patronus}</Text>
        )}
      </View>
      <Image
        source={getHouseImage(character.house)}
        style={styles.houseImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default CharacterCard;
