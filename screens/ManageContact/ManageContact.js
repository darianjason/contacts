// @flow

import * as React from 'react';
import {useReducer, useState, useLayoutEffect} from 'react';
import {ScrollView, ActivityIndicator, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {ContactForm} from '../../components/Contacts';
import {Button, ErrorOverlay} from '../../components/ui';
import {
  addContact,
  editContact,
  removeContact,
} from '../../store/contactsSlice';
import {Colors, INPUT_UPDATE} from '../../constants';
import styles from './ManageContact.styles';

type State = {
  +formIsValid: boolean,
  +inputValues: {
    +firstName: string,
    +lastName: string,
    +age: string,
    +photo: string,
  },
  +inputValidities: {
    +firstName: boolean,
    +lastName: boolean,
    +age: boolean,
    +photo: boolean,
  },
  +inputErrors: {
    +firstName: string,
    +lastName: string,
    +age: string,
    +photo: string,
  },
};

type InputUpdateAction = {
  type: 'INPUT_UPDATE',
  input: string,
  value: string,
  isValid: boolean,
  errorText: string,
};

const formReducer = (state: State, action: InputUpdateAction): State => {
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

type Contact = {
  id?: string,
  firstName: string,
  lastName: string,
  age: number | string,
  photo: string,
};

type NavigationParams = {
  contact: Contact,
};

type Route = {
  name: string,
  params?: NavigationParams,
};

type Navigation = {
  navigate: (routeName: string, params: NavigationParams) => void,
  goBack: () => void,
  setOptions: ({
    title: string,
    headerLeft: () => React.Node,
    headerRight: () => React.Node,
  }) => void,
  reset: ({index: number, routes: Array<Route>}) => void,
};

const cancelHandler = (navigation: Navigation): void => {
  navigation.goBack();
};

type Dispatch = (action: () => void) => void;

type SaveParams = {
  isEditing: boolean,
  navigation: Navigation,
  formState: State,
  id?: string,
  dispatch: (action: (dispatch: Dispatch) => Promise<void>) => void,
  setIsSaving: (isSaving: boolean) => void,
  setError: (error: string) => void,
};

export const saveHandler = async (
  saveParams: SaveParams,
): Promise<Contact | string | typeof undefined> => {
  const {
    isEditing,
    navigation,
    formState,
    id,
    dispatch,
    setIsSaving,
    setError,
  }: SaveParams = saveParams;
  const {inputValues, formIsValid} = formState;
  const {firstName, lastName, age, photo} = inputValues;

  const contact: Contact = {
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
      navigation.reset({
        index: 0,
        routes: [{name: 'Contacts'}],
      });
    } else {
      if (id) {
        await dispatch(editContact(id, contact));
        contact.id = id;
        navigation.reset({
          index: 1,
          routes: [
            {name: 'Contacts'},
            {name: 'ContactDetails', params: {contact}},
          ],
        });
      }
    }

    return contact;
  } catch (error) {
    setError(error.message);
    setIsSaving(false);
    return error.message;
  }
};

type SelectedContact = {
  id: string,
  firstName: string,
  lastName: string,
  age: number,
  photo: string,
};

type DeleteParams = {
  dispatch: (action: (dispatch: Dispatch) => Promise<void>) => void,
  selectedContact: SelectedContact,
  navigation: Navigation,
  setIsDeleting: (isDeleting: boolean) => void,
  setError: (error: string) => void,
};

export const deleteHandler = async (
  deleteParams: DeleteParams,
): Promise<string> => {
  const {dispatch, selectedContact, navigation, setIsDeleting, setError} =
    deleteParams;
  const {id} = selectedContact;

  setIsDeleting(true);

  // if (id !== undefined) {
  try {
    await dispatch(removeContact(id));
    navigation.reset({
      index: 0,
      routes: [{name: 'Contacts'}],
    });

    return id;
  } catch (error) {
    setError(error.message);
    setIsDeleting(false);
    return error.message;
  }
  // }
};

const confirmDelete = (deleteParams: DeleteParams): void => {
  const {selectedContact} = deleteParams;
  const {firstName, lastName} = selectedContact;

  Alert.alert(
    'Are you sure?',
    `Do you want to delete ${firstName} ${lastName}?`,
    [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => deleteHandler(deleteParams),
      },
    ],
  );
};

type NavParams = {
  ...SaveParams,
  isSaving: boolean,
};

const setNavOptions = (navParams: NavParams): void => {
  const {
    navigation,
    isEditing,
    formState,
    id,
    dispatch,
    isSaving,
    setIsSaving,
    setError,
  } = navParams;
  const saveParams: SaveParams = {
    isEditing,
    navigation,
    formState,
    id,
    dispatch,
    setIsSaving,
    setError,
  };

  const {formIsValid} = formState;

  navigation.setOptions({
    title: isEditing ? 'Edit Contact' : 'Add Contact',
    headerLeft: () => (
      <Button
        icon="times-circle"
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
          icon="save"
          onPress={() => saveHandler(saveParams)}
          disabled={!formIsValid}
          style={!formIsValid && styles.disabled}
        />
      ),
  });
};

const errorHandler = (setError: (?string) => void) => {
  setError(null);
};

type NavigationProps = {
  route: {
    params: {
      id?: string,
    },
  },
};

const ManageContact = ({route}: NavigationProps): React.Node => {
  const id = route.params?.id;
  const isEditing = !!id;

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState();

  const placeholderContact: SelectedContact = {
    id: '',
    firstName: '',
    lastName: '',
    age: 1,
    photo: '',
  };

  const contacts: Array<Contact> = useSelector(
    state => state.contacts.contacts,
  );

  const selectedContact: any = isDeleting
    ? placeholderContact
    : contacts.find(contact => contact.id === id);

  const dispatch: (action: (dispatch: Dispatch) => Promise<void>) => void =
    useDispatch();
  const navigation: Navigation = useNavigation();

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
      setError,
    };
    setNavOptions(navParams);
  }, [
    navigation,
    isEditing,
    formState,
    id,
    dispatch,
    isSaving,
    setIsSaving,
    setError,
  ]);

  const deleteParams: DeleteParams = {
    dispatch,
    selectedContact,
    navigation,
    setIsDeleting,
    setError,
  };

  if (error && (!isDeleting || !isSaving)) {
    return (
      <ErrorOverlay message={error} onConfirm={() => errorHandler(setError)} />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <ContactForm
        formState={formState}
        dispatchFormState={dispatchFormState}
        isEditing={isEditing}
      />
      {isEditing &&
        (!isDeleting ? (
          <Button
            icon="trash-alt"
            color={Colors.red}
            onPress={() => confirmDelete(deleteParams)}
          >
            Delete Contact
          </Button>
        ) : (
          <ActivityIndicator size="small" color={Colors.red} />
        ))}
    </ScrollView>
  );
};

export default ManageContact;
