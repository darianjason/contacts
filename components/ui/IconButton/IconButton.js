import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Pressable} from 'react-native';

import {Colors} from '../../../constants';
import styles from './IconButton.styles';
import DefaultText from '../DefaultText/DefaultText';

const renderIcon = (name, color, size) => (
  <Icon
    name={name}
    color={color ? color : Colors.accent}
    size={size ? size : 21}
  />
);

const renderText = (children, color, name) => (
  <DefaultText
    style={{
      ...styles.text,
      color: color ? color : Colors.accent,
      marginLeft: name && 6,
    }}>
    {children}
  </DefaultText>
);

const IconButton = ({
  name,
  size,
  color,
  backgroundColor,
  onPress,
  children,
}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      styles.button,
      pressed && styles.pressed,
      children && styles.hasText,
      backgroundColor && {backgroundColor: backgroundColor},
    ]}>
    {name && renderIcon(name, color, size)}
    {children && renderText(children, color, name)}
  </Pressable>
);

export default IconButton;
