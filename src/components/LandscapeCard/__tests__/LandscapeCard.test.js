import React from 'react';
import { axe, cleanup, render, MockRendering, MockFields } from '../../../test-utils';
import LandscapeCard from '../LandscapeCard';

afterEach(cleanup);

const mockFields = new MockFields();
const mockRendering = new MockRendering('LandscapeCard');

describe('<LandscapeCard>', () => {
  it('should render without accessibility violations', async () => {
    const { container } = render(
      <LandscapeCard fields={mockFields} rendering={mockRendering} title="My title" bodyText="My body text" />,
    );
    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
