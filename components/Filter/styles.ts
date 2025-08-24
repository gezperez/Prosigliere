import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 6,
    borderRadius: 25,
    backgroundColor: '#2C1810', // Dark brown like old parchment
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8B4513', // Saddle brown border
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  active: {
    backgroundColor: '#D4AF37', // Gold color for selected state
    borderColor: '#FFD700', // Bright gold border
    shadowColor: '#D4AF37',
    shadowOpacity: 0.4,
  },
  text: {
    fontFamily: 'Caudex-Regular',
    fontSize: 16,
    color: '#F5DEB3', // Wheat color for text
    textAlign: 'center',
    fontWeight: '500',
  },
  textActive: {
    color: '#2C1810', // Dark brown text on gold background
    fontFamily: 'Caudex-Bold',
    fontWeight: 'bold',
  },
});

export default styles;
