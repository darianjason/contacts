import React from 'react';
import {Image, View, Dimensions} from 'react-native';

import {DefaultText} from '../../ui';
import styles from './ProfilePicture.styles';

const ProfilePicture = ({
  photo,
  firstName,
  lastName,
  pictureSize,
  initialsSize,
}) => (
  <View
    style={{
      ...styles.container,
      width: pictureSize ? pictureSize : Dimensions.get('window').height / 12,
      height: pictureSize ? pictureSize : Dimensions.get('window').height / 12,
    }}>
    {photo !== 'N/A' ? (
      <Image source={{uri: photo}} style={styles.image} />
    ) : (
      <DefaultText
        style={{...styles.initials, fontSize: initialsSize ? initialsSize : 16}}
        numberOfLines={1}>
        {firstName[0]}
        {lastName[0]}
      </DefaultText>
    )}
  </View>
);

export default ProfilePicture;
