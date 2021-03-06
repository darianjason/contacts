import {StyleSheet} from 'react-native';

import {Colors} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    marginBottom: 8,
    color: Colors.primary,
  },
  button: {
    marginTop: 24,
    alignSelf: 'center',
  },
});

export default styles;
