// @flow

import {StyleSheet} from 'react-native';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {Colors} from '../../../constants';

type Styles = {
  container: ViewStyleProp,
  heading: TextStyleProp,
  button: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    marginBottom: 8,
    color: Colors.primary,
  },
  button: {
    marginTop: 24,
    alignSelf: 'center',
  },
});

export default styles;
