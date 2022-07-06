// @flow

import {StyleSheet} from 'react-native';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Styles = {
  card: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default styles;
