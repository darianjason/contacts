import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import ErrorOverlay from './ErrorOverlay';

describe('Error Overlay component', () => {
  test('renders error message', () => {
    const errorMessage = 'Error message';

    const {getByText} = render(<ErrorOverlay message={errorMessage} />);

    expect(getByText('Error message')).toBeTruthy();
  });

  test('retry button can be pressed', () => {
    const onConfirm = jest.fn();

    const {getByText} = render(<ErrorOverlay onConfirm={onConfirm} />);

    fireEvent.press(getByText('Retry'));
    expect(onConfirm).toHaveReturnedTimes(1);
  });

  test('renders correctly', () => {
    const errorMessage = 'Error message';
    const onConfirm = jest.fn();

    const tree = renderer
      .create(<ErrorOverlay message={errorMessage} onConfirm={onConfirm} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
