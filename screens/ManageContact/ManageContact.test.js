import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';

import {store} from '../../store/store';
import ManageContact, {saveHandler, deleteHandler} from './ManageContact';

describe('Manage Contact screen', () => {
  test('saves correct contact data', async () => {
    const contact = {
      firstName: 'Hello',
      lastName: 'World',
      age: 25,
      photo: 'uri',
    };

    const isEditing = false;
    const navigation = {
      reset: jest.fn(),
    };
    const formState = {
      inputValues: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        age: contact.age,
        photo: contact.photo,
      },
      inputValidities: {
        firstName: true,
        lastName: true,
        age: true,
        photo: true,
      },
      formIsValid: true,
    };
    const dispatch = jest.fn();
    const setIsSaving = jest.fn();
    const setError = jest.fn();

    const saveParams = {
      isEditing,
      navigation,
      formState,
      dispatch,
      setIsSaving,
      setError,
    };

    const response = {message: 'contact saved'};

    global.fetch = jest.fn();
    fetch.mockResolvedValueOnce({
      status: 201,
      ok: true,
      json: async () => response,
    });

    const savedContact = await saveHandler(saveParams);

    expect(savedContact).toEqual(contact);
  });

  test('deletes contact with correct ID', async () => {
    const dispatch = jest.fn();
    const selectedContact = {
      id: 'test',
      firstName: 'Hello',
      lastName: 'World',
      age: 25,
      photo: 'uri',
    };
    const navigation = {
      reset: jest.fn(),
    };
    const setIsDeleting = jest.fn();
    const setError = jest.fn();

    const deleteParams = {
      dispatch,
      selectedContact,
      navigation,
      setIsDeleting,
      setError,
    };

    const response = {message: 'contact deleted'};

    global.fetch = jest.fn();
    fetch.mockResolvedValueOnce({
      status: 202,
      ok: true,
      json: async () => response,
    });

    const deletedContactId = await deleteHandler(deleteParams);

    expect(deletedContactId).toEqual(selectedContact.id);
  });

  test('renders correctly', async () => {
    const route = {
      params: {},
    };

    const tree = render(
      <Provider store={store}>
        <ManageContact route={route} />
      </Provider>,
    );

    expect(tree).toMatchSnapshot();
  });
});
