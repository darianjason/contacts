import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Pressable} from 'react-native';

import {Colors} from '../../../constants';
import styles from './Button.styles';
import DefaultText from '../DefaultText/DefaultText';

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

const Button = ({name, size, color, backgroundColor, onPress, children}) => (
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

export default Button;
