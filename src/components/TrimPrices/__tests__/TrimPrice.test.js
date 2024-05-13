import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import TrimPrice from '../TrimPrice';

afterEach(cleanup);

describe('<TrimPrice>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<TrimPrice price={100} label="msrp price" />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('it should have no accessibility violations', async () => {
    const { container } = jssRender(<TrimPrice price={100} label="msrp price" />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
