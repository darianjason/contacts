import React from 'react';
import {View} from 'react-native';

import DefaultText from '../DefaultText/DefaultText';
import Button from '../Button/Button';
import {Colors} from '../../../constants';
import styles from './ErrorOverlay.styles';

const ErrorOverlay = ({message, onConfirm}) => (
  <View style={styles.container}>
    <DefaultText style={styles.heading}>An error occurred</DefaultText>
    <DefaultText>{message}</DefaultText>
    <Button
      onPress={onConfirm}
      name="redo-alt"
      size={14}
      color={Colors.accent}
      backgroundColor={Colors.primary}
      style={styles.button}>
      Retry
    </Button>
  </View>
);

export default ErrorOverlay;
