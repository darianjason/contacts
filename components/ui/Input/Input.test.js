import React from 'react';
import renderer from 'react-test-renderer';

import Input, {validate} from './Input';

describe('Input component', () => {
  const validation = {
    isValid: false,
    errorText: '',
  };

  test('invalid and error text is "Required" if required is set but no value', () => {
    const value = '';
    const validationParams = {required: true};

    validate(value, validationParams, validation);

    expect(validation.isValid).toBe(false);
    expect(validation.errorText).toBe('Required');
  });

  test('invalid and error text is "Must be alphanumeric" if alphanumeric is set but input is not alphanumeric', () => {
    const value = '!@#';
    const validationParams = {alphanumeric: true};

    validate(value, validationParams, validation);

    expect(validation.isValid).toBe(false);
    expect(validation.errorText).toBe('Must be alphanumeric');
  });

  test('invalid and error text is "Must be larger than ..." if minimum value is set but input is smaller', () => {
    const value = 5;
    const validationParams = {min: 10};

    validate(value, validationParams, validation);

    expect(validation.isValid).toBe(false);
    expect(validation.errorText).toBe('Must be larger than 9');
  });

  test('invalid and error text is "Must be smaller than ..." if maximum value is set but input is larger', () => {
    const value = 2;
    const validationParams = {max: 1};

    validate(value, validationParams, validation);

    expect(validation.isValid).toBe(false);
    expect(validation.errorText).toBe('Must be smaller than 2');
  });

  test('invalid and error text is "Must be longer than ... characters" if minimum length is set but input is shorter', () => {
    const value = 'asd';
    const validationParams = {minLength: 5};

    validate(value, validationParams, validation);

    expect(validation.isValid).toBe(false);
    expect(validation.errorText).toBe('Must be longer than 4 characters');
  });

  test('invalid and error text is "Must be shorter than ... characters" if maximum length is set but input is longer', () => {
    const value = 'hello';
    const validationParams = {maxLength: 3};

    validate(value, validationParams, validation);

    expect(validation.isValid).toBe(false);
    expect(validation.errorText).toBe('Must be shorter than 4 characters');
  });

  test('renders correctly', () => {
    const tree = renderer.create(<Input onInputChange={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
