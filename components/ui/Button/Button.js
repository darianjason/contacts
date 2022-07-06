// @flow

import * as React from 'react';
import {Pressable} from 'react-native';
import type {
  ColorValue,
  ViewStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type {FontAwesome5Glyphs} from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Colors} from '../../../constants';
import DefaultText from '../DefaultText/DefaultText';
import styles from './Button.styles';

const renderIcon = (
  name: FontAwesome5Glyphs,
  color?: string,
  size?: number,
): React.Node => (
  <Icon
    name={name}
    color={color ? color : Colors.accent}
    size={size ? size : 18}
  />
);

const renderText = (
  children?: ?React.Node,
  color?: string,
  icon?: FontAwesome5Glyphs,
): React.Node => (
  <DefaultText
    style={{
      color: color ? color : Colors.accent,
      marginLeft: icon && 8,
    }}
  >
    {children}
  </DefaultText>
);

type Props = {
  icon?: FontAwesome5Glyphs,
  size?: number,
  color?: string,
  backgroundColor?: ColorValue,
  onPress: () => void,
  children?: ?React.Node,
  style?: ViewStyleProp,
  disabled?: boolean,
};

const Button = (props: Props): React.Node => {
  const {
    icon,
    size,
    color,
    backgroundColor,
    onPress,
    children,
    style,
    disabled,
  } = props;

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        pressed && styles.pressed,
        children !== undefined && styles.hasText,
        backgroundColor !== undefined && {backgroundColor: backgroundColor},
        style,
      ]}
      disabled={disabled}
    >
      {icon && renderIcon(icon, color, size)}
      {children && renderText(children, color, icon)}
    </Pressable>
  );
};

export default Button;
