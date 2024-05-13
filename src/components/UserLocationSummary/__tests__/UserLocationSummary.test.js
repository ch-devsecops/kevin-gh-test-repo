import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import UserLocationSummary from '..';

afterEach(cleanup);

describe('<UserLocationSummary>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<UserLocationSummary />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<UserLocationSummary />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
