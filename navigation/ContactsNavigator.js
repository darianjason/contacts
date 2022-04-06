import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Colors} from '../constants';
import {ContactDetails, Contacts, EditContact} from '../screens';

const Stack = createNativeStackNavigator();

const defaultHeaderOptions = {
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

const ContactsNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={defaultHeaderOptions}>
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="EditContact" component={EditContact} />
      <Stack.Screen name="ContactDetails" component={ContactDetails} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default ContactsNavigator;
