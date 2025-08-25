import { Colors } from '@/app/ds/components/Text/enums/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT_BROWN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: Colors.DARK_BROWN,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.DARK_BROWN,
  },
  houseImage: {
    width: 50,
    height: 50,
  },
  houseInfo: {
    flex: 1,
    marginLeft: 16,
  },
  houseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  houseDescription: {
    fontSize: 12,
  },
  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default styles;
