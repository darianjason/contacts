import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hasText: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 32,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default styles;
