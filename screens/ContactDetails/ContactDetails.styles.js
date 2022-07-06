// @flow

import {StyleSheet} from 'react-native';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {Colors} from '../../constants';

type Styles = {
  screen: ViewStyleProp,
  name: TextStyleProp,
  infoContainer: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 36,
  },
  name: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    marginTop: 16,
    alignSelf: 'center',
    color: Colors.primary,
  },
  infoContainer: {
    marginTop: 16,
  },
});

export default styles;
