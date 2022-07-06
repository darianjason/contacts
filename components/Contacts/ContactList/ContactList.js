// @flow

import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import type {RenderItemProps} from 'react-native/Libraries/Lists/VirtualizedList';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchContacts} from '../../../store/contactsSlice';
import {Colors} from '../../../constants';
import {DefaultText, ErrorOverlay} from '../../ui';
import {ContactListItem} from '..';
import styles from './ContactList.styles';

type Dispatch = (action: () => void) => void;

const loadContacts = async (
  dispatch: (action: (dispatch: Dispatch) => Promise<void>) => void,
  setIsLoading: (isLoading: boolean) => void,
  setError: (error: string) => void,
): Promise<void> => {
  setIsLoading(true);
  try {
    await dispatch(fetchContacts());
  } catch (error) {
    setError(error.message);
  }
  setIsLoading(false);
};

const loadContactsListener = (
  dispatch: (action: (dispatch: Dispatch) => Promise<void>) => void,
  setIsLoading: (isLoading: boolean) => void,
  setError: (error: string) => void,
): void => {
  loadContacts(dispatch, setIsLoading, setError);
};

const errorHandler = (
  dispatch: (action: (dispatch: Dispatch) => Promise<void>) => void,
  setIsLoading: (isLoading: boolean) => void,
  setError: (error: string | null) => void,
): void => {
  setError(null);
  loadContacts(dispatch, setIsLoading, setError);
};

type Contact = {
  id: string,
  photo: string,
  firstName: string,
  lastName: string,
  age: number,
};

type Navigation = {
  navigate: (
    routeName: string,
    params: {
      contact: Contact,
    },
  ) => void,
};

const selectHandler = (navigation: Navigation, contact: Contact): void => {
  navigation.navigate('ContactDetails', {contact});
};

export const sortByName = (a: Contact, b: Contact): number => {
  const nameA: string = a.firstName.toUpperCase() + a.lastName.toUpperCase();
  const nameB: string = b.firstName.toUpperCase() + b.lastName.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

const sortContacts = (contacts: Array<Contact>): Array<Contact> => {
  return [...contacts].sort(sortByName);
};

const renderListItem = (
  navigation: Navigation,
  itemData: RenderItemProps<Contact>,
): React.Node => {
  const {firstName, lastName, age, photo} = itemData.item;

  return (
    <ContactListItem
      firstName={firstName}
      lastName={lastName}
      age={age}
      photo={photo}
      onSelect={() => selectHandler(navigation, itemData.item)}
    />
  );
};

const LoadingIndicator = (): React.Node => (
  <View style={styles.altContainer}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
);

type EmptyMessageProps = {
  dispatch: (action: (dispatch: Dispatch) => Promise<void>) => void,
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void,
  setError: (error: string | null) => void,
};

const EmptyMessage = ({
  dispatch,
  isLoading,
  setIsLoading,
  setError,
}: EmptyMessageProps): React.Node => (
  <ScrollView
    contentContainerStyle={styles.altContainer}
    refreshControl={
      <RefreshControl
        refreshing={isLoading}
        onRefresh={() => loadContacts(dispatch, setIsLoading, setError)}
      />
    }
  >
    <DefaultText style={styles.emptyMessage}>No contacts</DefaultText>
  </ScrollView>
);

const ContactList = (): React.Node => {
  const contacts: Array<Contact> = useSelector(
    state => state.contacts.contacts,
  );
  const dispatch: ((dispatch: Dispatch) => Promise<void>) => void =
    useDispatch();
  const navigation: Navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    loadContacts(dispatch, setIsLoading, setError);
  }, [dispatch, setIsLoading, setError]);

  if (error && !isLoading) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={() => errorHandler(dispatch, setIsLoading, setError)}
      />
    );
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (contacts.length === 0) {
    return (
      <EmptyMessage
        dispatch={dispatch}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setError={setError}
      />
    );
  }

  const sortedContacts: Array<Contact> = sortContacts(contacts);

  return (
    <FlatList
      data={sortedContacts}
      renderItem={itemData => renderListItem(navigation, itemData)}
      onRefresh={() => loadContactsListener(dispatch, setIsLoading, setError)}
      refreshing={isLoading}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ContactList;
