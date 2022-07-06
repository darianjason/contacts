// @flow

import {configureStore} from '@reduxjs/toolkit';

import contactsReducer from './contactsSlice';

type Contact = {
  id?: string,
  firstName: string,
  lastName: string,
  age: number | string,
  photo: string,
};

type Store = {
  contacts: Array<Contact>,
};

export const store: Store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});
