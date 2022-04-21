import React, {useReducer, useState, useLayoutEffect} from 'react';
import {ScrollView, ActivityIndicator, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {ContactForm} from '../../components/Contacts';
import {Button} from '../../components/ui';
import {
  addContact,
  editContact,
  removeContact,
} from '../../store/contactsSlice';
import {Colors} from '../../constants';
import styles from './ManageContact.styles';

const INPUT_UPDATE = 'INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === INPUT_UPDATE) {
    const values = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const validities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };

    const errors = {
      ...state.inputErrors,
      [action.input]: action.errorText,
    };

    let formIsValid = true;
    for (const key in validities) {
      formIsValid = formIsValid && validities[key];
    }

    return {
      formIsValid: formIsValid,
      inputValues: values,
      inputValidities: validities,
      inputErrors: errors,
    };
  }

  return state;
};

const cancelHandler = navigation => {
  navigation.goBack();
};

const saveHandler = async saveParams => {
  const {isEditing, navigation, formState, id, dispatch, setIsSaving} =
    saveParams;
  const {inputValues, formIsValid} = formState;
  const {firstName, lastName, age, photo} = inputValues;

  const contact = {
    firstName: firstName,
    lastName: lastName,
    age: +age,
    photo: photo ? photo : 'N/A',
  };

  if (!formIsValid) {
    Alert.alert('Invalid data', 'Please check your inputs.');
    return;
  }

  setIsSaving(true);

  try {
    if (!isEditing) {
      await dispatch(addContact(contact));
    } else {
      await dispatch(editContact(id, contact));
      contact.id = id;
    }

    setIsSaving(false);
    navigation.reset({
      index: 1,
      routes: [{name: 'Contacts'}, {name: 'ContactDetails', params: {contact}}],
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteHandler = async (dispatch, id, name, navigation) => {
  try {
    navigation.reset({
      index: 0,
      routes: [{name: 'Contacts'}],
    });
    await dispatch(removeContact(id));
  } catch (error) {
    console.error(error);
  }
};

const confirmDelete = (dispatch, id, name, navigation) => {
  Alert.alert('Are you sure?', `Do you want to delete ${name}?`, [
    {text: 'No', style: 'default'},
    {
      text: 'Yes',
      style: 'destructive',
      onPress: () => deleteHandler(dispatch, id, name, navigation),
    },
  ]);
};

const setNavOptions = navParams => {
  const {
    navigation,
    isEditing,
    formState,
    id,
    dispatch,
    isSaving,
    setIsSaving,
  } = navParams;
  const saveParams = {
    isEditing,
    navigation,
    formState,
    id,
    dispatch,
    setIsSaving,
  };

  const {formIsValid} = formState;

  navigation.setOptions({
    title: isEditing ? 'Edit Contact' : 'Add Contact',
    headerLeft: () => (
      <Button
        name="times-circle"
        color={Colors.red}
        onPress={() => cancelHandler(navigation)}
        style={styles.cancelButton}
      />
    ),
    headerRight: () =>
      isSaving ? (
        <ActivityIndicator size="small" color={Colors.accent} />
      ) : (
        <Button
          name="save"
          onPress={() => saveHandler(saveParams)}
          disabled={!formIsValid}
          style={!formIsValid && styles.disabled}
        />
      ),
  });
};

const ManageContact = ({route}) => {
  const id = route.params?.id;
  const isEditing = !!id;

  const contacts = useSelector(state => state.contacts.contacts);
  const selectedContact = contacts.find(contact => contact.id === id);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isSaving, setIsSaving] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      firstName: isEditing ? selectedContact.firstName : '',
      lastName: isEditing ? selectedContact.lastName : '',
      age: isEditing ? selectedContact.age.toString() : '',
      photo: isEditing ? selectedContact.photo : 'N/A',
    },
    inputValidities: {
      firstName: !!isEditing,
      lastName: !!isEditing,
      age: !!isEditing,
      photo: !!isEditing,
    },
    inputErrors: {
      firstName: '',
      lastName: '',
      age: '',
      photo: '',
    },
    formIsValid: !!isEditing,
  });

  useLayoutEffect(() => {
    const navParams = {
      navigation,
      isEditing,
      formState,
      id,
      dispatch,
      isSaving,
      setIsSaving,
    };
    setNavOptions(navParams);
  }, [navigation, isEditing, formState, id, dispatch, isSaving, setIsSaving]);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <ContactForm
        formState={formState}
        dispatchFormState={dispatchFormState}
        isEditing={isEditing}
      />
      {isEditing && (
        <Button
          name="trash-alt"
          color={Colors.red}
          onPress={() =>
            confirmDelete(
              dispatch,
              id,
              `${selectedContact.firstName} ${selectedContact.lastName}`,
              navigation,
            )
          }>
          Delete Contact
        </Button>
      )}
    </ScrollView>
  );
};

export default ManageContact;
