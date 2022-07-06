// @flow

import * as React from 'react';
import {Text} from 'react-native';
import type {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import styles from './DefaultText.styles';

type Props = {
  style?: TextStyleProp,
  numberOfLines?: number,
  children: ?React.Node,
};

const DefaultText = ({style, numberOfLines, children}: Props): React.Node => (
  <Text style={[styles.text, style]} numberOfLines={numberOfLines}>
    {children}
  </Text>
);

export default DefaultText;
