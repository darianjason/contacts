import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';

import {ContactList} from '../../components/Contacts';
import {IconButton} from '../../components/ui';
import styles from './Contacts.styles';

const setNavOptions = navigation => {
  navigation.setOptions({
    headerRight: () => (
      <IconButton
        name="add"
        onPress={() => navigation.navigate('ManageContact')}
      />
    ),
  });
};

const Contacts = ({navigation}) => {
  useLayoutEffect(() => {
    setNavOptions(navigation);
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <ContactList />
    </View>
  );
};

export default Contacts;
