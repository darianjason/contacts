// @flow

import {createSlice} from '@reduxjs/toolkit';

import {Links} from '../constants';

type Contact = {
  id?: string,
  firstName: string,
  lastName: string,
  age: number | string,
  photo: string,
};

type State = {
  +contacts: Array<Contact>,
};

type ContactsSlice = {
  name: string,
  initialState: State,
  reducers: {
    setContacts: (state: State, action?: {payload: Array<Contact>}) => void,
    insertContact: (state: State, action?: {payload: Contact}) => void,
    updateContact: (state: State, action?: {payload: Contact}) => void,
    deleteContact: (state: State, action?: {payload: Contact}) => void,
  },
  actions: {
    setContacts: (data: Array<Contact>) => () => void,
    insertContact: (contact: Contact) => () => void,
    updateContact: (id: string, data: Contact) => () => void,
    deleteContact: (id: string) => () => void,
  },
  reducer: (state: State, action: {type: string, payload: any}) => State,
};

const contactsSlice: ContactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
  },
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    insertContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    updateContact: (state, action) => {
      const {id, data} = action.payload;
      const updatedContactIndex = state.contacts.findIndex(
        contact => contact.id === id,
      );
      state.contacts[updatedContactIndex] = data;
    },
    deleteContact: (state, action) => {
      const {id} = action.payload;
      const index = state.contacts.findIndex(contact => contact.id === id);
      state.contacts.splice(index, 1);
    },
  },
});

const {actions, reducer} = contactsSlice;
export const {setContacts, insertContact, updateContact, deleteContact} =
  actions;
export default reducer;

const {BASE_URL} = Links;

type Dispatch = (action: () => void) => void;

type FetchContactsResponseData = {
  data: Array<Contact>,
  message: string,
};

export const fetchContacts =
  (): ((dispatch: Dispatch) => Promise<void>) =>
  async (dispatch): Promise<void> => {
    const response: any = await fetch(`${BASE_URL}/contact`);
    const responseData: FetchContactsResponseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to fetch contacts: ${responseData.message} (${response.status})`,
      );
    }

    dispatch(setContacts(responseData.data));
  };

type ResponseData = {
  message: string,
};

export const addContact =
  (contact: Contact): ((dispatch: Dispatch) => Promise<void>) =>
  async (dispatch): Promise<void> => {
    try {
      const response: any = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      const responseData: ResponseData = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to add contact: ${responseData.message} (${response.status})`,
        );
      }

      dispatch(insertContact(contact));
    } catch (error) {
      throw error;
    }
  };

export const editContact =
  (id: string, data: Contact): ((dispatch: Dispatch) => Promise<void>) =>
  async dispatch => {
    try {
      const response = await fetch(`${BASE_URL}/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData: ResponseData = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to edit contact: ${responseData.message} (${response.status})`,
        );
      }

      dispatch(updateContact(id, data));
    } catch (error) {
      throw error;
    }
  };

export const removeContact =
  (id: string): ((dispatch: Dispatch) => Promise<void>) =>
  async dispatch => {
    try {
      const response = await fetch(`${BASE_URL}/contact/${id}`, {
        method: 'DELETE',
      });
      const responseData: ResponseData = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to delete contact: ${responseData.message} (${response.status})`,
        );
      }

      dispatch(deleteContact(id));
    } catch (error) {
      throw error;
    }
  };
