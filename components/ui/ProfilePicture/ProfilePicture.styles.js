import {StyleSheet} from 'react-native';

import {Colors} from '../../../constants';

const styles = StyleSheet.create({
  container: {
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
    fontFamily: 'Manrope-Bold',
    letterSpacing: 2,
    color: Colors.primary,
  },
});

export default styles;
