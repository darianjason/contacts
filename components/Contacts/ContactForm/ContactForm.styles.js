// @flow

import {StyleSheet} from 'react-native';
import type {ViewStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Styles = {
  form: ViewStyleProp,
  profilePictureContainer: ViewStyleProp,
  row: ViewStyleProp,
  ageInput: ViewStyleProp,
  photoInput: ViewStyleProp,
};

const styles: Styles = StyleSheet.create({
  form: {
    marginBottom: 16,
  },
  profilePictureContainer: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ageInput: {
    flex: 1,
    marginRight: 24,
  },
  photoInput: {
    flex: 4,
  },
});

export default styles;
