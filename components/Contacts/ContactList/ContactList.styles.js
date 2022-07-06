// @flow

import {StyleSheet} from 'react-native';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {Colors} from '../../../constants';

type Styles = {
  listContainer: ViewStyleProp,
  altContainer: ViewStyleProp,
  emptyMessage: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
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
