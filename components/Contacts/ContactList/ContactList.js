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
import {DefaultText} from '../../ui';
import {Colors} from '../../../constants';
import styles from './ContactList.styles';

const loadContacts = async (dispatch, setIsLoading) => {
  setIsLoading(true);
  try {
    await dispatch(fetchContacts());
  } catch (error) {
    console.error(error);
  }
  setIsLoading(false);
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

  useEffect(() => {
    loadContacts(dispatch, setIsLoading);
  }, [dispatch, setIsLoading]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (contacts.length === 0) {
    return (
      <EmptyMessage
        dispatch={dispatch}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    );
  }

  return (
    <FlatList
      data={[...contacts].sort(sortByName)}
      renderItem={itemData => renderListItem(navigation, itemData)}
      onRefresh={() => loadContacts(dispatch, setIsLoading)}
      refreshing={isLoading}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default ContactList;
