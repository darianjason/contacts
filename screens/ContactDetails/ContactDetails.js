import React, {useLayoutEffect} from 'react';
import {ScrollView, View, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';

import {DefaultText, IconButton, ProfilePicture} from '../../components/ui';
import styles from './ContactDetails.styles';

const setNavOptions = (navigation, id, fullName) => {
  navigation.setOptions({
    headerTitle: fullName,
    headerRight: () => (
      <IconButton
        name="pencil"
        onPress={() => navigation.navigate('ManageContact', {id})}
      />
    ),
  });
};

const ContactDetails = ({navigation, route}) => {
  const {id} = route.params;

  const contacts = useSelector(state => state.contacts.contacts);
  const selectedContact = contacts.find(contact => contact.id === id);

  const {photo, firstName, lastName, age} = selectedContact;
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
