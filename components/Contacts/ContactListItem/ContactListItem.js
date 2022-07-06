// @flow

import * as React from 'react';
import {View, Pressable} from 'react-native';

import {Card, DefaultText, ProfilePicture} from '../../ui';
import styles from './ContactListItem.styles';

type NameContainerProps = {
  firstName: string,
  lastName: string,
};

const NameContainer = ({
  firstName,
  lastName,
}: NameContainerProps): React.Node => (
  <View style={styles.nameContainer}>
    <DefaultText>
      {firstName} {lastName}
    </DefaultText>
  </View>
);

type ContactListItemProps = {
  firstName: string,
  lastName: string,
  age: number,
  photo: string,
  onSelect: () => void,
};

const ContactListItem = ({
  firstName,
  lastName,
  age,
  photo,
  onSelect,
}: ContactListItemProps): React.Node => (
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
