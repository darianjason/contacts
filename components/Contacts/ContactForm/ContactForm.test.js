import React from 'react';
import renderer from 'react-test-renderer';

import ContactForm from './ContactForm';

describe('Contact Form component', () => {
  test('renders correctly', () => {
    const formState = {
      inputValues: {
        firstName: 'Hello',
        lastName: 'World',
        age: '50',
        photo: 'uri',
      },
    };
    const dispatchFormState = jest.fn();
    const isEditing = jest.fn();

    const tree = renderer
      .create(
        <ContactForm
          formState={formState}
          dispatchFormState={dispatchFormState}
          isEditing={isEditing}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
