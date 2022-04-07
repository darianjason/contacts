import {createSlice} from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
  },
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
  },
});

const BASE_URL = 'https://simple-contact-crud.herokuapp.com';

export const fetchContacts = () => async dispatch => {
  try {
    const response = await fetch(`${BASE_URL}/contact`);
    const responseJson = await response.json();
    dispatch(setContacts(responseJson.data));
  } catch (error) {
    throw error;
  }
};

const {actions, reducer} = contactsSlice;
export const {setContacts} = actions;
export default reducer;
