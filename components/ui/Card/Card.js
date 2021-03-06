import React from 'react';
import {View} from 'react-native';

import styles from './Card.styles';

const Card = ({style, children}) => (
  <View style={{...styles.card, ...style}}>{children}</View>
);

export default Card;
