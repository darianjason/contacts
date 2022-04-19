import React from 'react';
import {View, TextInput} from 'react-native';

import DefaultText from '../DefaultText/DefaultText';
import styles from './Input.styles';

const Input = ({style, label, textInputOptions}) => (
  <View style={[styles.container, style]}>
    <DefaultText style={styles.label}>{label}</DefaultText>
    <TextInput {...textInputOptions} style={styles.input} />
  </View>
);

export default Input;
