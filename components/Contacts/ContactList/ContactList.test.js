import React from 'react';
import {render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

import {store} from '../../../store/store';
import ContactList, {sortByName} from './ContactList';

describe('Contact List component', () => {
  test('renders empty message if no contacts', async () => {
    const contacts = [];
    const response = {data: contacts};

    global.fetch = jest.fn();
    fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => response,
    });

    const {findByText} = render(
      <Provider store={store}>
        <ContactList />
      </Provider>,
    );

    const emptyMessage = await findByText('No contacts');

    expect(emptyMessage).toBeTruthy();
  });

  test('renders contacts if request succeeds', async () => {
    const contacts = [
      {
        id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
        firstName: 'Bilbo',
        lastName: 'Baggins',
        age: 111,
        photo:
          'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      },
      {
        id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
        firstName: 'Luke',
        lastName: 'Skywalker',
        age: 20,
        photo: 'N/A',
      },
    ];
    const response = {data: contacts};

    global.fetch = jest.fn();
    fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => response,
    });

    const {findAllByA11yLabel} = render(
      <Provider store={store}>
        <ContactList />
      </Provider>,
    );

    const contactList = await findAllByA11yLabel('Contact list item');

    expect(contactList).toHaveLength(2);
  });

  test('renders error message if request fails', async () => {
    const contacts = [
      {
        id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
        firstName: 'Bilbo',
        lastName: 'Baggins',
        age: 111,
        photo:
          'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      },
      {
        id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
        firstName: 'Luke',
        lastName: 'Skywalker',
        age: 20,
        photo: 'N/A',
      },
    ];
    const response = {message: 'Error message', data: contacts};

    global.fetch = jest.fn();
    fetch.mockResolvedValueOnce({
      status: 400,
      ok: false,
      json: async () => response,
    });

    const {findByText} = render(
      <Provider store={store}>
        <ContactList />
      </Provider>,
    );

    const errorMessage = await findByText(
      'Failed to fetch contacts: Error message (400)',
    );

    expect(errorMessage).toBeTruthy();
  });

  test('sorts alphabetically by full name', () => {
    const names = [
      {
        firstName: 'Zoe',
        lastName: 'Smith',
      },
      {
        firstName: 'A',
        lastName: 'Name',
      },
      {
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        firstName: 'Hello',
        lastName: 'World',
      },
    ];
    const sortedNames = names.sort(sortByName);

    expect(sortedNames).toEqual([
      {
        firstName: 'A',
        lastName: 'Name',
      },
      {
        firstName: 'Hello',
        lastName: 'World',
      },
      {
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        firstName: 'Zoe',
        lastName: 'Smith',
      },
    ]);
  });

  test('renders correctly', () => {
    const contacts = [
      {
        id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
        firstName: 'Bilbo',
        lastName: 'Baggins',
        age: 111,
        photo:
          'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
      },
      {
        id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
        firstName: 'Luke',
        lastName: 'Skywalker',
        age: 20,
        photo: 'N/A',
      },
    ];
    const response = {data: contacts};

    global.fetch = jest.fn();
    fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => response,
    });

    const tree = renderer
      .create(
        <Provider store={store}>
          <ContactList />
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
