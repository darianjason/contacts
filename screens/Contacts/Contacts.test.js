import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';

import {store} from '../../store/store';
import Contacts from './Contacts';

describe('Contacts screen', () => {
  test('renders correctly', async () => {
    const navigation = {
      navigate: jest.fn(),
      setOptions: jest.fn(),
    };

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

    const tree = render(
      <Provider store={store}>
        <Contacts navigation={navigation} />
      </Provider>,
    );

    await waitFor(() => {
      tree.getByText('Luke Skywalker');
    });

    expect(tree).toMatchSnapshot();
  });
});
