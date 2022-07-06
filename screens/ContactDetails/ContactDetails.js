// @flow

import * as React from 'react';
import {useLayoutEffect} from 'react';
import {ScrollView, View, Dimensions} from 'react-native';

import {DefaultText, Button, ProfilePicture} from '../../components/ui';
import styles from './ContactDetails.styles';

type NavigationParams = {
  id: string,
};

type Navigation = {
  navigate: (routeName: string, params: NavigationParams) => void,
  setOptions: ({
    headerTitle: string,
    headerRight: () => React.Node,
  }) => void,
};

const setNavOptions = (
  navigation: Navigation,
  id: string,
  fullName: string,
): void => {
  navigation.setOptions({
    headerTitle: fullName,
    headerRight: () => (
      <Button
        icon="edit"
        onPress={() => navigation.navigate('ManageContact', {id})}
      />
    ),
  });
};

type Contact = {
  id: string,
  photo: string,
  firstName: string,
  lastName: string,
  age: number,
};

type NavigationProps = {
  navigation: Navigation,
  route: {
    params: {
      contact: Contact,
    },
  },
};

const ContactDetails = ({navigation, route}: NavigationProps): React.Node => {
  const {contact} = route.params;

  const {id, photo, firstName, lastName, age} = contact;
  const fullName = `${firstName} ${lastName}`;

  useLayoutEffect(() => {
    setNavOptions(navigation, id, fullName);
  }, [navigation, id, fullName]);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View>
        <ProfilePicture
          photo={photo}
          firstName={firstName}
          lastName={lastName}
          pictureSize={Dimensions.get('window').height / 4}
          initialsSize={36}
        />
        <DefaultText style={styles.name}>{fullName}</DefaultText>
      </View>

      <View style={styles.infoContainer}>
        <DefaultText>{age} years old</DefaultText>
      </View>
    </ScrollView>
  );
};

export default ContactDetails;
