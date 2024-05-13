import React from 'react';
import { jssRender, cleanup, MockTheme } from 'test-utils';
import UnOrderedList from '../index';

const mockData = require('./mockData.test.json');

afterEach(cleanup);

describe('<UnOrderedList>', () => {
  const { colors } = MockTheme;

  test('should render correctly', () => {
    const { container } = jssRender(<UnOrderedList fields={mockData.fields} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should render as center aligned', () => {
    const { container } = jssRender(<UnOrderedList fields={mockData.fields} params={{ contentAlignment: 'Center' }} />);
    const title = container.querySelector('h4');

    expect(title).toHaveStyle({ 'text-align': 'Center' });
  });

  test('should render blue background colour', () => {
    const { container } = jssRender(<UnOrderedList fields={mockData.fields} params={{ bgColour: 'Blue' }} />);
    const wrapper = container.querySelectorAll('div')[0];

    expect(wrapper).toHaveStyle({ 'background-color': colors.blue });
  });

  test('should render as null without fields', () => {
    const { container } = jssRender(<UnOrderedList />);

    expect(container.firstChild).toBeNull();
  });
});
