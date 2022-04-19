import React, {useState, useLayoutEffect} from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';
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

const cancelHandler = navigation => {
  navigation.goBack();
};

const saveHandler = async saveParams => {
  const {isEditing, navigation, inputValues, id, dispatch, setIsSaving} =
    saveParams;
  const {firstName, lastName, age, photo} = inputValues;

  const contact = {
    firstName: firstName,
    lastName: lastName,
    age: +age,
    photo: photo,
  };

  setIsSaving(true);

  try {
    if (!isEditing) {
      await dispatch(addContact(contact));
    } else {
      await dispatch(editContact(id, contact));
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
    inputValues,
    id,
    dispatch,
    isSaving,
    setIsSaving,
  } = navParams;
  const saveParams = {
    isEditing,
    navigation,
    inputValues,
    id,
    dispatch,
    setIsSaving,
  };

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
        <Button name="save" onPress={() => saveHandler(saveParams)} />
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

  const [inputValues, setInputValues] = useState({
    firstName: isEditing ? selectedContact.firstName : '',
    lastName: isEditing ? selectedContact.lastName : '',
    age: isEditing ? selectedContact.age.toString() : '',
    photo: isEditing ? selectedContact.photo : '',
  });

  useLayoutEffect(() => {
    const navParams = {
      navigation,
      isEditing,
      inputValues,
      id,
      dispatch,
      isSaving,
      setIsSaving,
    };
    setNavOptions(navParams);
  }, [navigation, isEditing, inputValues, id, dispatch, isSaving, setIsSaving]);

  return (
    <View style={styles.screen}>
      <ContactForm inputValues={inputValues} setInputValues={setInputValues} />
      {isEditing && (
        <Button
          name="trash-alt"
          color={Colors.red}
          onPress={() =>
            confirmDelete(
              dispatch,
              id,
              selectedContact.firstName + selectedContact.lastName,
              navigation,
            )
          }>
          Delete Contact
        </Button>
      )}
    </View>
  );
};

export default ManageContact;
