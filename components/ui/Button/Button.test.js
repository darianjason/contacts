import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import Button from './Button';

describe('Button component', () => {
  test('can be pressed if not disabled', () => {
    const onPress = jest.fn();

    const {getByText} = render(<Button onPress={onPress}>Test</Button>);

    fireEvent.press(getByText('Test'));
    expect(onPress).toHaveReturnedTimes(1);
  });

  test('cannot be pressed if disabled', () => {
    const onPress = jest.fn();

    const {getByText} = render(
      <Button onPress={onPress} disabled={true}>
        Test
      </Button>,
    );

    fireEvent.press(getByText('Test'));
    expect(onPress).not.toHaveReturned();
  });

  test('renders icon if name is passed', () => {
    const button = renderer.create(<Button name="react" />);
    const icon = button.toJSON().children[0];

    expect(icon).toHaveProperty(
      'props.style[2].fontFamily',
      'FontAwesome5Brands-Regular',
    );
  });

  test('renders text if children is passed', () => {
    const {getByText} = render(<Button>Test</Button>);

    expect(getByText('Test')).toBeTruthy();
  });

  test('renders correctly', () => {
    const tree = renderer
      .create(<Button name="hand-pointer">Button</Button>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
