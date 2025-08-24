import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export type FilterType = {
  id: string;
  name: string;
  selected: boolean;
};

type FilterProps = {
  filter: FilterType;
  onPress: (filter: FilterType) => void;
};

const Filter = ({ filter, onPress }: FilterProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(filter)}
      style={[styles.container, filter.selected && styles.active]}
    >
      <Text style={[styles.text, filter.selected && styles.textActive]}>
        {filter.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Filter;
