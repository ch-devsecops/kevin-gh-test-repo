import React from 'react';
import { jssRender, cleanup } from 'test-utils';
import Gallery from '../index';

window.scrollTo = jest.fn();

const mockData = require('./mockData.test.json');

afterEach(cleanup);

describe('<Gallery>', () => {
  test('should render correctly', () => {
    window.HTMLElement.prototype.scrollTo = () => {};
    const { container } = jssRender(<Gallery fields={mockData.fields} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });
});

describe('Gallery Short Variant', () => {
  test('should render short variant correctly', () => {
    window.HTMLElement.prototype.scrollTo = () => {};
    const { container } = jssRender(<Gallery fields={mockData.fields} params={{ styleType: 'Short' }} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });
});
