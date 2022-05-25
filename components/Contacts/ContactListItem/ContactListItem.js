import React from 'react';
import {View, Pressable} from 'react-native';

import {Card, DefaultText, ProfilePicture} from '../../ui';
import styles from './ContactListItem.styles';

const NameContainer = ({firstName, lastName}) => (
  <View style={styles.nameContainer}>
    <DefaultText style={styles.name}>
      {firstName} {lastName}
    </DefaultText>
  </View>
);

const ContactListItem = ({firstName, lastName, age, photo, onSelect}) => (
  <Pressable
    onPress={onSelect}
    style={({pressed}) => pressed && styles.pressed}
    accessibilityLabel="Contact list item"
  >
    <Card style={styles.itemContainer}>
      <ProfilePicture photo={photo} firstName={firstName} lastName={lastName} />
      <NameContainer firstName={firstName} lastName={lastName} />
    </Card>
  </Pressable>
);

export default ContactListItem;
