import React from 'react';
import { axe, cleanup, render, MockRendering, MockFields } from '../../../test-utils';
import LandscapeBoxCard from '../LandscapeBoxCard';

afterEach(cleanup);

const mockFields = new MockFields();
const mockRendering = new MockRendering('LandscapeBoxCard');

describe('<LandscapeBoxCard>', () => {
  it('should render correctly with all props', async () => {
    const { container } = render(
      <LandscapeBoxCard fields={mockFields} rendering={mockRendering} title="My title" bodyText="My body text" />,
    );

    expect(await axe(container)).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });
});
