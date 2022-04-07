import {StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../../../constants';

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  imageContainer: {
    width: Dimensions.get('window').height / 12,
    height: Dimensions.get('window').height / 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    letterSpacing: 2,
    color: Colors.primary,
  },
  nameContainer: {
    padding: 16,
  },
});

export default styles;
