import React from 'react';
import {render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import ProfilePicture from './ProfilePicture';

describe('Profile Picture component', () => {
  test('renders photo if photo is set', () => {
    const photo = 'uri';
    const firstName = 'John';
    const lastName = 'Doe';

    const {getByRole} = render(
      <ProfilePicture
        photo={photo}
        firstName={firstName}
        lastName={lastName}
      />,
    );

    expect(getByRole('image')).toBeTruthy();
  });

  test('renders initials if no photo is set', () => {
    const firstName = 'John';
    const lastName = 'Doe';

    const {getByText} = render(
      <ProfilePicture firstName={firstName} lastName={lastName} />,
    );

    expect(getByText('JD')).toBeTruthy();
  });

  test('renders correctly', () => {
    const photo = 'uri';
    const firstName = 'John';
    const lastName = 'Doe';

    const tree = renderer
      .create(
        <ProfilePicture
          photo={photo}
          firstName={firstName}
          lastName={lastName}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
