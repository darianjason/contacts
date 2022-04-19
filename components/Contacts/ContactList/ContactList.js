import {useNavigation} from '@react-navigation/native';
import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ContactListItem} from '..';
import {fetchContacts} from '../../../store/contactsSlice';
import {DefaultText} from '../../ui';
import {Colors} from '../../../constants';
import styles from './ContactList.styles';

const loadContactsHandler = async dispatch => {
  try {
    await dispatch(fetchContacts());
  } catch (error) {
    console.error(error);
  }
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

const EmptyMessage = () => (
  <View style={styles.altContainer}>
    <DefaultText style={styles.emptyMessage}>No contacts.</DefaultText>
  </View>
);

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const loadContacts = useCallback(async () => {
    await loadContactsHandler(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadContacts().then(() => setIsLoading(false));
  }, [dispatch, loadContacts]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!contacts || contacts.length === 0) {
    return <EmptyMessage />;
  }

  return (
    <FlatList
      data={[...contacts].sort(sortByName)}
      renderItem={itemData => renderListItem(navigation, itemData)}
      onRefresh={loadContacts}
      refreshing={isLoading}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ContactList;
