import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

import {store} from '../../store/store';
import ContactDetails from './ContactDetails';

describe('Contact Details screen', () => {
  test('renders correctly', () => {
    const navigation = {setOptions: jest.fn()};
    const route = {
      params: {
        contact: {
          id: 'test',
          firstName: 'Hello',
          lastName: 'World',
          age: '99',
          photo: 'N/A',
        },
      },
    };

    const tree = renderer.create(
      <Provider store={store}>
        <ContactDetails navigation={navigation} route={route} />
      </Provider>,
    );

    expect(tree).toMatchSnapshot();
  });
});
