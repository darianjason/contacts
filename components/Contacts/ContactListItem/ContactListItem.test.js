import React from 'react';
import {render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import ContactListItem from './ContactListItem';

describe('ContactListItem component', () => {
  test('renders full name', () => {
    const firstName = 'John';
    const lastName = 'Doe';

    const {getByText} = render(
      <ContactListItem firstName={firstName} lastName={lastName} />,
    );

    expect(getByText('John Doe')).toBeTruthy();
  });

  test('renders correctly', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const age = 25;
    const photo = 'uri';
    const onSelect = jest.fn();

    const tree = renderer
      .create(
        <ContactListItem
          firstName={firstName}
          lastName={lastName}
          age={age}
          photo={photo}
          onSelect={onSelect}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
