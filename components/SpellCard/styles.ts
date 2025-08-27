import { Colors } from '@/app/ds/components/Text/enums/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    padding: 12,
    margin: 6,
    borderWidth: 2,
    borderColor: Colors.DARK_BROWN,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    flexDirection: 'row',
    minHeight: 80,
  },
  imageContainer: {
    marginRight: 12,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.DARK_BROWN,
    borderWidth: 2,
    borderColor: Colors.HUFFLEPUFF,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: 'Caudex-Bold',
    fontSize: 24,
    color: Colors.HUFFLEPUFF,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Caudex-Bold',
    fontSize: 16,
    color: Colors.DARK_BROWN,
    marginBottom: 2,
    textShadowColor: Colors.HUFFLEPUFF,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  type: {
    fontFamily: 'Caudex-Bold',
    fontSize: 12,
    color: Colors.DARK_BROWN,
    marginBottom: 2,
    fontStyle: 'italic',
  },
  description: {
    fontFamily: 'Caudex-Regular',
    fontSize: 10,
    color: Colors.DARK_BROWN,
    marginBottom: 1,
  },
  typeImage: {
    width: 50,
    height: 50,
  },
});

export default styles;
