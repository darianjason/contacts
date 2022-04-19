import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../constants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 36,
    backgroundColor: Colors.accent,
  },
  cancelButton: {
    marginRight: Platform.OS === 'android' ? 36 : 0,
  },
});

export default styles;
