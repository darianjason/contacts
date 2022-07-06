// @flow

import * as React from 'react';
import {useLayoutEffect} from 'react';
import {View} from 'react-native';

import {ContactList} from '../../components/Contacts';
import {Button} from '../../components/ui';
import styles from './Contacts.styles';

type Navigation = {
  navigate: (routeName: string) => void,
  setOptions: ({headerRight: () => React.Node}) => void,
};

const setNavOptions = (navigation: Navigation): void => {
  navigation.setOptions({
    headerRight: () => (
      <Button
        icon="plus-circle"
        onPress={() => navigation.navigate('ManageContact')}
      />
    ),
  });
};

type NavigationProps = {
  navigation: Navigation,
};

const Contacts = ({navigation}: NavigationProps): React.Node => {
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
