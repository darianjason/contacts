import {createSlice} from '@reduxjs/toolkit';

import {Links} from '../constants';

const contactsSlice = createSlice({
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

export const fetchContacts = () => async dispatch => {
  const response = await fetch(`${BASE_URL}/contact`);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      `Failed to fetch contacts: ${responseData.message} (${response.status})`,
    );
  }

  dispatch(setContacts(responseData.data));
};

export const addContact = contact => async dispatch => {
  try {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    const responseData = await response.json();

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

export const editContact = (id, data) => async dispatch => {
  try {
    const response = await fetch(`${BASE_URL}/contact/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

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

export const removeContact = id => async dispatch => {
  try {
    const response = await fetch(`${BASE_URL}/contact/${id}`, {
      method: 'DELETE',
    });
    const responseData = await response.json();

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
