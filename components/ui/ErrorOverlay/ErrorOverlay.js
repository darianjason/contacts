// @flow

import * as React from 'react';
import {View} from 'react-native';

import {Colors} from '../../../constants';
import DefaultText from '../DefaultText/DefaultText';
import Button from '../Button/Button';
import styles from './ErrorOverlay.styles';

type Props = {
  message: string,
  onConfirm: () => void,
};

const ErrorOverlay = ({message, onConfirm}: Props): React.Node => (
  <View style={styles.container}>
    <DefaultText style={styles.heading}>An error occurred</DefaultText>
    <DefaultText>{message}</DefaultText>
    <Button
      onPress={onConfirm}
      icon="redo-alt"
      size={14}
      color={Colors.accent}
      backgroundColor={Colors.primary}
      style={styles.button}
    >
      Retry
    </Button>
  </View>
);

export default ErrorOverlay;
