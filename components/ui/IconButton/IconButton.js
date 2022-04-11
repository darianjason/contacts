import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Pressable} from 'react-native';

import {Colors} from '../../../constants';
import styles from './IconButton.styles';

const IconButton = ({name, size, color, onPress}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [styles.button, pressed && styles.pressed]}>
    <Icon
      name={name}
      size={size ? size : 21}
      color={color ? color : Colors.accent}
    />
  </Pressable>
);

export default IconButton;
