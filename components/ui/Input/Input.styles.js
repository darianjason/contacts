import {StyleSheet} from 'react-native';

import {Colors} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Manrope-Bold',
    letterSpacing: 0.5,
    color: Colors.primary,
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Manrope-Regular',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  invalidLabel: {
    color: Colors.red,
  },
  invalidInput: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.red,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.red,
  },
});

export default styles;
