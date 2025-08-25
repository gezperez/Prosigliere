import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './styles';

export type FilterType = {
  id: string;
  name: string;
  selected: boolean;
};

type FilterProps = {
  filter: FilterType;
  onPress: (filter: FilterType) => void;
  style?: StyleProp<ViewStyle>;
};

const Filter = ({ filter, onPress, style }: FilterProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(filter)}
      style={[styles.container, filter.selected && styles.active, style]}
    >
      <Text style={[styles.text, filter.selected && styles.textActive]}>
        {filter.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Filter;
