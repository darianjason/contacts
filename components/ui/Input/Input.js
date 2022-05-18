import React, {useReducer, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import DefaultText from '../DefaultText/DefaultText';

import styles from './Input.styles';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
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

export const validate = (value, validationParams, validation) => {
  const {required, min, max, minLength, maxLength, alphanumeric, numeric} =
    validationParams;

  const alphanumericRegex = /^[a-z0-9]+$/i;

  if (required && !value.trim()) {
    validation.errorText = 'Required';
  } else if (alphanumeric && !alphanumericRegex.test(value)) {
    validation.errorText = 'Must be alphanumeric';
  } else if (numeric && isNaN(+value)) {
    validation.errorText = 'Must be numeric';
  } else if (min && +value < min) {
    validation.errorText = `Must be larger than ${min - 1}`;
  } else if (max && +value > max) {
    validation.errorText = `Must be smaller than ${max + 1}`;
  } else if (minLength && value.length < minLength) {
    validation.errorText = `Must be longer than ${minLength - 1} characters`;
  } else if (maxLength && value.length > maxLength) {
    validation.errorText = `Must be shorter than ${maxLength + 1} characters`;
  } else {
    validation.isValid = true;
  }
};

const textChangeHandler = (value, validationParams, dispatch) => {
  const validation = {
    isValid: false,
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

const loseFocusHandler = dispatch => {
  dispatch({type: INPUT_BLUR});
};

const Input = props => {
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

  const validationParams = {
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
        style={[styles.label, !isValid && isTouched && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        {...props}
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
