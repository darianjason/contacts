import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import Card from './Card';

describe('Card component', () => {
  test('renders children', () => {
    const {getByText} = render(
      <Card>
        <Text>Test</Text>
      </Card>,
    );

    expect(getByText('Test')).toBeTruthy();
  });

  test('renders correctly', () => {
    const tree = renderer
      .create(
        <Card>
          <Text>Test</Text>
        </Card>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
