import {StyleSheet} from 'react-native';

import {Colors} from '../../constants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 36,
    backgroundColor: Colors.accent,
  },
  cancelButton: {
    marginRight: 36,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default styles;
