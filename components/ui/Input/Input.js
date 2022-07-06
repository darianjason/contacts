import React, {useReducer, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';

import {INPUT_CHANGE, INPUT_BLUR} from '../../../constants';
import DefaultText from '../DefaultText/DefaultText';
import styles from './Input.styles';

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

const validateRequired = (value, required, validation) => {
  if (required && !value.trim()) {
    validation.isValid = false;
    validation.errorText = 'Required';
  }
};

const validateType = (value, alphanumeric, numeric, validation) => {
  const alphanumericRegex = /^[a-z0-9]+$/i;

  if (alphanumeric && !alphanumericRegex.test(value)) {
    validation.isValid = false;
    validation.errorText = 'Must be alphanumeric';
  } else if (numeric && isNaN(+value)) {
    validation.isValid = false;
    validation.errorText = 'Must be numeric';
  }
};

const validateAmount = (value, min, max, validation) => {
  if (min && +value < min) {
    validation.isValid = false;
    validation.errorText = `Must be larger than ${min - 1}`;
  } else if (max && +value > max) {
    validation.isValid = false;
    validation.errorText = `Must be smaller than ${max + 1}`;
  }
};

const validateLength = (value, minLength, maxLength, validation) => {
  if (minLength && value.length < minLength) {
    validation.isValid = false;
    validation.errorText = `Must be longer than ${minLength - 1} characters`;
  } else if (maxLength && value.length > maxLength) {
    validation.isValid = false;
    validation.errorText = `Must be shorter than ${maxLength + 1} characters`;
  }
};

export const validate = (value, validationParams, validation) => {
  const {
    required, min, max, minLength,
    maxLength, alphanumeric, numeric
  } = validationParams;

  validateLength(value, minLength, maxLength, validation);
  validateAmount(value, min, max, validation);
  validateType(value, alphanumeric, numeric, validation);
  validateRequired(value, required, validation);
};

const textChangeHandler = (value, validationParams, dispatch) => {
  const validation = {
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
        style={[styles.label, !isValid && isTouched && styles.invalidLabel]}
      >
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
