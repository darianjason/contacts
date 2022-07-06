// @flow

import * as React from 'react';
import {useCallback} from 'react';
import {View, Pressable, Dimensions} from 'react-native';

import {Colors, INPUT_UPDATE} from '../../../constants';
import {Input, ProfilePicture} from '../../ui';
import styles from './ContactForm.styles';

type State = {
  +type: string,
  +input: string,
  +value: string,
  +isValid: boolean,
  +errorText: string,
};

type Props = {
  formState: {
    inputValues: {
      firstName: string,
      lastName: string,
      age: number,
      photo: String,
    },
  },
  dispatchFormState: (state: State) => void,
  isEditing: boolean,
};

const ContactForm = ({
  formState,
  dispatchFormState,
  isEditing,
}: Props): React.Node => {
  const {inputValues} = formState;
  const {firstName, lastName, age, photo} = inputValues;

  const inputChangeHandler = useCallback(
    (input, value, isValid, errorText) => {
      dispatchFormState({
        type: INPUT_UPDATE,
        input: input,
        value: value,
        isValid: isValid,
        errorText: errorText,
      });
    },
    [dispatchFormState],
  );

  return (
    <View style={styles.form}>
      <Pressable style={styles.profilePictureContainer}>
        <ProfilePicture
          photo={photo}
          firstName={firstName}
          lastName={lastName}
          pictureSize={Dimensions.get('window').height / 8}
          initialsSize={24}
          backgroundColor={Colors.white}
        />
      </Pressable>

      <Input
        id="firstName"
        label="First Name"
        autoCapitalize="words"
        initialValue={firstName}
        initiallyValid={!!isEditing}
        onInputChange={inputChangeHandler}
        required
        alphanumeric
        minLength={3}
        maxLength={30}
      />
      <Input
        id="lastName"
        label="Last Name"
        autoCapitalize="words"
        initialValue={lastName}
        initiallyValid={!!isEditing}
        onInputChange={inputChangeHandler}
        required
        alphanumeric
        minLength={3}
        maxLength={30}
      />

      <View style={styles.row}>
        <Input
          id="age"
          label="Age"
          keyboardType="number-pad"
          onInputChange={inputChangeHandler}
          initialValue={age}
          initiallyValid={!!isEditing}
          required
          numeric
          min={1}
          max={100}
          style={styles.ageInput}
        />
        <Input
          id="photo"
          label="Photo URL"
          keyboardType="url"
          autoCapitalize="none"
          initialValue={photo}
          initiallyValid={true}
          onInputChange={inputChangeHandler}
          style={styles.photoInput}
        />
      </View>
    </View>
  );
};

export default ContactForm;
