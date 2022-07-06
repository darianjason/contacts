// @flow

import {StyleSheet} from 'react-native';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Styles = {
  button: ViewStyleProp,
  hasText: ViewStyleProp,
  pressed: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
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
