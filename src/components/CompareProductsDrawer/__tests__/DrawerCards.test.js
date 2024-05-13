import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import DrawerCards from '../DrawerCards';

afterEach(cleanup);

describe('<DrawerCards>', () => {
  const renderMock = children => jssRender(<DrawerCards>{children}</DrawerCards>);

  test('should render correctly', () => {
    const { container } = renderMock();
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = renderMock();
    expect(await axe(container)).toHaveNoViolations();
  });
});
