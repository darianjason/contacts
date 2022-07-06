// @flow

import {StyleSheet} from 'react-native';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {Colors} from '../../../constants';

type Styles = {
  container: ViewStyleProp,
  image: ViewStyleProp,
  initials: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.accent,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontFamily: 'Manrope-Bold',
    letterSpacing: 2,
    color: Colors.primary,
  },
});

export default styles;
