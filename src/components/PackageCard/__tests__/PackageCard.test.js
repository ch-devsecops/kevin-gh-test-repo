import React from 'react';
import { axe, cleanup, render, MockRendering, MockFields } from '../../../test-utils';
import PackageCard from '../PackageCard';

afterEach(cleanup);

const mockFields = new MockFields();
const mockRendering = new MockRendering('PackageCard');

describe('<PackageCard>', () => {
  it('should render correctly with all props', async () => {
    const { container } = render(
      <PackageCard fields={mockFields} rendering={mockRendering} title="My title" bodyText="My body text" />,
    );

    expect(await axe(container)).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });
});
