// @flow

import * as React from 'react';
import {View} from 'react-native';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import styles from './Card.styles';

type Props = {
  style?: ViewStyleProp,
  children: ?React.Node,
};

const Card = ({style, children}: Props): React.Node => (
  <View style={[styles.card, style]}>{children}</View>
);

export default Card;
