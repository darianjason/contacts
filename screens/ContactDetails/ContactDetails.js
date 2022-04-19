import React, {useLayoutEffect} from 'react';
import {ScrollView, View, Dimensions} from 'react-native';

import {DefaultText, Button, ProfilePicture} from '../../components/ui';
import styles from './ContactDetails.styles';

const setNavOptions = (navigation, id, fullName) => {
  navigation.setOptions({
    headerTitle: fullName,
    headerRight: () => (
      <Button
        name="edit"
        onPress={() => navigation.navigate('ManageContact', {id})}
      />
    ),
  });
};

const ContactDetails = ({navigation, route}) => {
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
