import React from 'react';
import {Image, View, Pressable} from 'react-native';

import {Card, DefaultText} from '../../ui';
import styles from './ContactListItem.styles';

const ImageContainer = ({photo, firstName, lastName}) => (
  <View style={styles.imageContainer}>
    {photo !== 'N/A' ? (
      <Image source={{uri: photo}} style={styles.image} />
    ) : (
      <DefaultText style={styles.initials} numberOfLines={1}>
        {firstName[0]}
        {lastName[0]}
      </DefaultText>
    )}
  </View>
);

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
    style={({pressed}) => pressed && styles.pressed}>
    <Card style={styles.itemContainer}>
      <ImageContainer photo={photo} firstName={firstName} lastName={lastName} />
      <NameContainer firstName={firstName} lastName={lastName} />
    </Card>
  </Pressable>
);

export default ContactListItem;
