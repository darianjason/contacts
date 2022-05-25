import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Colors} from '../../../constants';
import DefaultText from '../DefaultText/DefaultText';
import styles from './Button.styles';

const renderIcon = (icon, color, size) => (
  <Icon
    name={icon}
    color={color ? color : Colors.accent}
    size={size ? size : 18}
  />
);

const renderText = (children, color, icon) => (
  <DefaultText
    style={{
      ...styles.text,
      color: color ? color : Colors.accent,
      marginLeft: icon && 8,
    }}
  >
    {children}
  </DefaultText>
);

const Button = ({
  icon,
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
    disabled={disabled}
  >
    {icon && renderIcon(icon, color, size)}
    {children && renderText(children, color, icon)}
  </Pressable>
);

export default Button;
