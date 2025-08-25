import { House } from '@/api/hp/types';
import { Text } from '@/app/ds/components/Text';
import { Colors } from '@/app/ds/components/Text/enums/Colors';
import { Image, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '../ui/IconSymbol';
import styles from './styles';

type HouseCardProps = {
  house: House;
  onSelect: () => void;
};

const HouseCard = ({ house, onSelect }: HouseCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <Image
        source={house.image}
        style={styles.houseImage}
        resizeMode="contain"
      />
      <View style={styles.houseInfo}>
        <Text variant="title" style={styles.houseName}>
          {house.name}
        </Text>
        <Text variant="caption" style={styles.houseDescription}>
          {house.description}
        </Text>
      </View>
      <IconSymbol name="chevron.right" size={24} color={Colors.DARK_BROWN} />
    </TouchableOpacity>
  );
};

export default HouseCard;
