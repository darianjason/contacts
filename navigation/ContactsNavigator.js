// @flow

import * as React from 'react';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Colors} from '../constants';
import {ContactDetails, Contacts, ManageContact} from '../screens';

type StackParamList = {
  Contacts: null,
  ManageContact: ?{id: string},
  ContactDetails: {
    contact: {
      id: string,
      photo: string,
      firstName: string,
      lastName: string,
      age: number,
    },
  },
};

const Stack = createNativeStackNavigator<StackParamList>();

type Styles = {
  headerStyle: ViewStyleProp,
  headerTitleStyle: TextStyleProp,
  headerBackTitleStyle: TextStyleProp,
  headerTintColor: string,
};

const defaultHeaderOptions: Styles = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: Colors.accent,
  },
  headerBackTitleStyle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
  },
  headerTintColor: Colors.accent,
};

const ContactsNavigator = (): React.Node => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={defaultHeaderOptions}>
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen
        name="ManageContact"
        component={ManageContact}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="ContactDetails" component={ContactDetails} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default ContactsNavigator;
