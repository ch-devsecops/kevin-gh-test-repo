import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import FAQ from '../index';

afterEach(cleanup);

const mockData = require('../__mocks__/mockData.test.json');

describe('<FAQ>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<FAQ fields={mockData.fields} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should render as null without fields', () => {
    const { container } = jssRender(<FAQ />);

    expect(container.firstChild).toBeNull();
  });

  test('should not initially contain collapse all button', () => {
    const { queryByText } = jssRender(<FAQ fields={mockData.fields} />);
    const { fields } = mockData;

    expect(queryByText(fields.collapseText.value)).not.toBeInTheDocument();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<FAQ fields={mockData.fields} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
