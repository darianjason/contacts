import React from 'react';
import {Text} from 'react-native';

import styles from './DefaultText.styles';

const DefaultText = ({style, numberOfLines, children}) => (
  <Text style={{...styles.text, ...style}} numberOfLines={numberOfLines}>
    {children}
  </Text>
);

export default DefaultText;
