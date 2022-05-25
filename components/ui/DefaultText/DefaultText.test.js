import React from 'react';
import {render} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import DefaultText from './DefaultText';

describe('Default Text component', () => {
  test('renders text', () => {
    const {getByText} = render(<DefaultText>Test</DefaultText>);

    expect(getByText('Test')).toBeTruthy();
  });

  test('renders correctly', () => {
    const tree = renderer.create(<DefaultText>Test</DefaultText>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
