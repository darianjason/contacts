import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants';

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  altContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    color: Colors.primary,
    fontSize: 16,
  },
});

export default styles;
