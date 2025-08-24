import { View } from 'react-native';
import Filter, { FilterType } from '../Filter/Filter';
import styles from './styles';

type FiltersProps = {
  filters: FilterType[];
  onFilterPress: (filter: FilterType) => void;
};

const Filters = ({ filters, onFilterPress }: FiltersProps) => {
  return (
    <View style={styles.container}>
      {filters.map(filter => (
        <Filter
          key={filter.id}
          filter={filter}
          onPress={() => onFilterPress(filter)}
        />
      ))}
    </View>
  );
};

export default Filters;
