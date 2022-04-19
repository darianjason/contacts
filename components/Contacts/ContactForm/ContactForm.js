import React from 'react';
import {View, Dimensions} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Colors} from '../../../constants';

import {Input, ProfilePicture} from '../../ui';
import styles from './ContactForm.styles';

const inputChangeHandler = (input, setInputValues, value) => {
  setInputValues(currentInputValues => {
    return {
      ...currentInputValues,
      [input]: value,
    };
  });
};

const ContactForm = ({inputValues, setInputValues}) => {
  const {firstName, lastName, age, photo} = inputValues;

  return (
    <View style={styles.form}>
      <Pressable>
        <ProfilePicture
          photo={photo}
          firstName={inputValues.firstName}
          lastName={inputValues.lastName}
          pictureSize={Dimensions.get('window').height / 8}
          initialsSize={24}
          backgroundColor={Colors.white}
        />
      </Pressable>

      <Input
        label="First Name"
        textInputOptions={{
          autoCapitalize: 'words',
          autoCorrect: false,
          onChangeText: value =>
            inputChangeHandler('firstName', setInputValues, value),
          value: firstName,
        }}
      />
      <Input
        label="Last Name"
        textInputOptions={{
          autoCapitalize: 'words',
          autoCorrect: false,
          onChangeText: value =>
            inputChangeHandler('lastName', setInputValues, value),
          value: lastName,
        }}
      />

      <View style={styles.row}>
        <Input
          label="Age"
          textInputOptions={{
            keyboardType: 'number-pad',
            onChangeText: value =>
              inputChangeHandler('age', setInputValues, value),
            value: age,
          }}
          style={styles.ageInput}
        />
        <Input
          label="Photo URL"
          textInputOptions={{
            keyboardType: 'url',
            autoCapitalize: 'none',
            autoCorrect: false,
            onChangeText: value =>
              inputChangeHandler('photo', setInputValues, value),
            value: photo,
          }}
          style={styles.photoInput}
        />
      </View>
    </View>
  );
};

export default ContactForm;
