import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import ModelCardTrimSpecialPrice from '../ModelCardTrimSpecialPrice';

afterEach(cleanup);

describe('<ModelCardTrimSpecialPrice>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(
      <ModelCardTrimSpecialPrice price={100} label="msrp price" tooltipLabel="value does include" language="en" />,
    );

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('it should have no accessibility violations', async () => {
    const { container } = jssRender(
      <ModelCardTrimSpecialPrice price={100} label="msrp price" tooltipLabel="value does include" language="en" />,
    );

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
