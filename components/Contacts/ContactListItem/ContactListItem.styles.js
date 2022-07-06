// @flow

import {StyleSheet} from 'react-native';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Styles = {
  pressed: ViewStyleProp,
  itemContainer: ViewStyleProp,
  nameContainer: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  nameContainer: {
    padding: 16,
  },
});

export default styles;
