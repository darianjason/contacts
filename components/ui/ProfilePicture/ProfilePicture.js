// @flow

import * as React from 'react';
import {Image, View, Dimensions} from 'react-native';
import type {ColorValue} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {Colors} from '../../../constants';
import {DefaultText} from '../../ui';
import styles from './ProfilePicture.styles';

type Props = {
  photo: string,
  firstName: string,
  lastName: string,
  pictureSize: number,
  initialsSize: number,
  backgroundColor: ColorValue,
};

const ProfilePicture = ({
  photo,
  firstName,
  lastName,
  pictureSize,
  initialsSize,
  backgroundColor,
}: Props): React.Node => {
  if (!photo) {
    photo = 'N/A';
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: pictureSize ?? Dimensions.get('window').height / 12,
          height: pictureSize ?? Dimensions.get('window').height / 12,
          backgroundColor: backgroundColor ?? Colors.accent,
        },
      ]}
    >
      {photo !== 'N/A' ? (
        <Image
          source={{uri: photo}}
          style={styles.image}
          accessibilityRole="image"
        />
      ) : (
        <DefaultText
          style={[
            styles.initials,
            {
              fontSize: initialsSize ?? 16,
            },
          ]}
          numberOfLines={1}
        >
          {firstName[0]}
          {lastName[0]}
        </DefaultText>
      )}
    </View>
  );
};

export default ProfilePicture;
