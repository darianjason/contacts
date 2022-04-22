import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {ContactListItem} from '..';
import {fetchContacts} from '../../../store/contactsSlice';
import {DefaultText, ErrorOverlay} from '../../ui';
import {Colors} from '../../../constants';
import styles from './ContactList.styles';

const loadContacts = async (dispatch, setIsLoading, setError) => {
  setIsLoading(true);
  try {
    await dispatch(fetchContacts());
  } catch (error) {
    setError(error.message);
  }
  setIsLoading(false);
};

const errorHandler = (dispatch, setIsLoading, setError) => {
  setError(null);
  loadContacts(dispatch, setIsLoading, setError);
};

const selectHandler = (navigation, contact) => {
  navigation.navigate('ContactDetails', {contact});
};

const sortByName = (a, b) => {
  const nameA = a.firstName.toUpperCase() + a.lastName.toUpperCase();
  const nameB = b.firstName.toUpperCase() + b.lastName.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

const renderListItem = (navigation, itemData) => {
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

const LoadingIndicator = () => (
  <View style={styles.altContainer}>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
);

const EmptyMessage = ({dispatch, isLoading, setIsLoading, setError}) => (
  <ScrollView
    contentContainerStyle={styles.altContainer}
    refreshControl={
      <RefreshControl
        refreshing={isLoading}
        onRefresh={() => loadContacts(dispatch, setIsLoading, setError)}
      />
    }>
    <DefaultText style={styles.emptyMessage}>No contacts</DefaultText>
  </ScrollView>
);

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  return (
    <FlatList
      data={[...contacts].sort(sortByName)}
      renderItem={itemData => renderListItem(navigation, itemData)}
      onRefresh={() => loadContacts(dispatch, setIsLoading, setError)}
      refreshing={isLoading}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ContactList;
