import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Colors} from '../../../constants';
import DefaultText from '../DefaultText/DefaultText';
import styles from './Button.styles';

const renderIcon = (name, color, size) => (
  <Icon
    name={name}
    color={color ? color : Colors.accent}
    size={size ? size : 18}
  />
);

const renderText = (children, color, name) => (
  <DefaultText
    style={{
      ...styles.text,
      color: color ? color : Colors.accent,
      marginLeft: name && 8,
    }}>
    {children}
  </DefaultText>
);

const Button = ({
  name,
  size,
  color,
  backgroundColor,
  onPress,
  children,
  style,
  disabled,
}) => (
  <Pressable
    onPress={onPress}
    style={({pressed}) => [
      styles.button,
      pressed && styles.pressed,
      children && styles.hasText,
      backgroundColor && {backgroundColor: backgroundColor},
      style,
    ]}
    disabled={disabled}>
    {name && renderIcon(name, color, size)}
    {children && renderText(children, color, name)}
  </Pressable>
);

export default Button;
