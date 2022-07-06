// @flow

import * as React from 'react';
import {useReducer, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {INPUT_CHANGE, INPUT_BLUR} from '../../../constants';
import DefaultText from '../DefaultText/DefaultText';
import styles from './Input.styles';

type State = {
  +value: string,
  +isValid: boolean,
  +isTouched: boolean,
  +errorText: string,
};

type InputChangeAction = {
  type: 'INPUT_CHANGE',
  value: string,
  isValid: boolean,
  errorText: string,
};

type InputBlurAction = {
  type: 'INPUT_BLUR',
  isTouched: boolean,
};

type Action = InputChangeAction | InputBlurAction;

const inputReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        errorText: action.errorText,
      };
    case INPUT_BLUR:
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

type Validation = {
  isValid: boolean,
  errorText: string,
};

const validateRequired = (
  value: string,
  required?: boolean,
  validation: Validation,
): void => {
  if (required && !value.trim()) {
    validation.isValid = false;
    validation.errorText = 'Required';
  }
};

const validateType = (
  value: string,
  alphanumeric?: boolean,
  numeric?: boolean,
  validation: Validation,
): void => {
  const alphanumericRegex: RegExp = /^[a-z0-9]+$/i;

  if (alphanumeric && !alphanumericRegex.test(value)) {
    validation.isValid = false;
    validation.errorText = 'Must be alphanumeric';
  } else if (numeric && isNaN(+value)) {
    validation.isValid = false;
    validation.errorText = 'Must be numeric';
  }
};

const validateAmount = (
  value: string,
  min?: number,
  max?: number,
  validation: Validation,
): void => {
  if (min && +value < min) {
    validation.isValid = false;
    validation.errorText = `Must be larger than ${min - 1}`;
  } else if (max && +value > max) {
    validation.isValid = false;
    validation.errorText = `Must be smaller than ${max + 1}`;
  }
};

const validateLength = (
  value: string,
  minLength?: number,
  maxLength?: number,
  validation: Validation,
): void => {
  if (minLength && value.length < minLength) {
    validation.isValid = false;
    validation.errorText = `Must be longer than ${minLength - 1} characters`;
  } else if (maxLength && value.length > maxLength) {
    validation.isValid = false;
    validation.errorText = `Must be shorter than ${maxLength + 1} characters`;
  }
};

type ValidationParams = {
  required?: boolean,
  min?: number,
  max?: number,
  minLength?: number,
  maxLength?: number,
  alphanumeric?: boolean,
  numeric?: boolean,
};

export const validate = (
  value: string,
  validationParams: ValidationParams,
  validation: Validation,
): void => {
  const {required, min, max, minLength, maxLength, alphanumeric, numeric} =
    validationParams;

  validateLength(value, minLength, maxLength, validation);
  validateAmount(value, min, max, validation);
  validateType(value, alphanumeric, numeric, validation);
  validateRequired(value, required, validation);
};

const textChangeHandler = (
  value: string,
  validationParams: ValidationParams,
  dispatch: (action: InputChangeAction) => void,
): void => {
  const validation: Validation = {
    isValid: true,
    errorText: '',
  };

  validate(value, validationParams, validation);

  dispatch({
    type: INPUT_CHANGE,
    value: value,
    isValid: validation.isValid,
    errorText: validation.errorText,
  });
};

const loseFocusHandler = (dispatch: (action: InputBlurAction) => void) => {
  dispatch({type: INPUT_BLUR, isTouched: false});
};

type Props = {
  id?: string,
  style?: ViewStyleProp,
  label: string,
  initialValue: string,
  initiallyValid: boolean,
  required?: boolean,
  min?: number,
  max?: number,
  minLength?: number,
  maxLength?: number,
  alphanumeric?: boolean,
  numeric?: boolean,
  onInputChange: (
    id: ?string,
    value: string,
    isValid: boolean,
    errorText: string,
  ) => void,
};

const Input = (props: Props): React.Node => {
  const {
    id,
    style,
    label,
    initialValue,
    initiallyValid,
    required,
    min,
    max,
    minLength,
    maxLength,
    alphanumeric,
    numeric,
    onInputChange,
  } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initiallyValid,
    isTouched: false,
    errorText: '',
  });

  const {value, isValid, isTouched, errorText} = inputState;

  useEffect(() => {
    onInputChange(id, value, isValid, errorText);
  }, [onInputChange, id, value, isValid, errorText]);

  const validationParams: ValidationParams = {
    required,
    min,
    max,
    minLength,
    maxLength,
    alphanumeric,
    numeric,
  };

  return (
    <View style={[styles.container, style]}>
      <Text
        style={[styles.label, !isValid && isTouched && styles.invalidLabel]}
      >
        {label}
      </Text>
      <TextInput
        style={[styles.input, !isValid && isTouched && styles.invalidInput]}
        value={value}
        onChangeText={text =>
          textChangeHandler(text, validationParams, dispatch)
        }
        onBlur={() => loseFocusHandler(dispatch)}
      />
      {!isValid && isTouched && (
        <DefaultText style={styles.errorText}>{errorText}</DefaultText>
      )}
    </View>
  );
};

export default Input;
