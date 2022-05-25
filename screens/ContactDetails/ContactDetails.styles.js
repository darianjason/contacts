import {StyleSheet} from 'react-native';

import {Colors} from '../../constants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 36,
  },
  name: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    marginTop: 16,
    alignSelf: 'center',
    color: Colors.primary,
  },
  infoContainer: {
    marginTop: 16,
  },
});

export default styles;
