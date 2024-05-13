import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import CompareDrawerToggle from '../CompareDrawerToggle';

afterEach(cleanup);

describe('<CompareDrawerToggle>', () => {
  const renderMock = (isDrawerOpen, cta, children) =>
    jssRender(
      <CompareDrawerToggle isVisible={isDrawerOpen} cta={cta}>
        {children}
      </CompareDrawerToggle>,
    );

  test('should render correctly', () => {
    const { container } = renderMock();
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = renderMock(true, { title: 'title' }, undefined);
    expect(await axe(container)).toHaveNoViolations();
  });
});
