// @flow

import {StyleSheet} from 'react-native';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {Colors} from '../../constants';

type Styles = {
  screen: ViewStyleProp,
  cancelButton: ViewStyleProp,
  disabled: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
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
