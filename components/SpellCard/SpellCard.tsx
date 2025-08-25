import { Spell } from '@/api/hp/types';
import { Text } from '@/app/ds/components/Text';
import { View } from 'react-native';
import styles from './styles';

type SpellCardProps = {
  spell: Spell;
};

const SpellCard = ({ spell }: SpellCardProps) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.imageContainer}>
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>✨</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{spell.name}</Text>

        {spell.category && <Text style={styles.type}>{spell.category}</Text>}

        {spell.description && (
          <Text style={styles.description}>{spell.description}</Text>
        )}
      </View>
    </View>
  );
};

export default SpellCard;
