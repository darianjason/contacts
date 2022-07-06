// @flow

import {StyleSheet} from 'react-native';
import type {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {Colors} from '../../../constants';

type Styles = {
  text: TextStyleProp,
};

const styles: Styles = StyleSheet.create({
  text: {
    color: Colors.black,
    fontFamily: 'Manrope-Regular',
  },
});

export default styles;
