import React from 'react';
import { axe, cleanup, render, MockRendering, MockFields } from '../../../test-utils';
import AppCard from '../AppCard';

afterEach(cleanup);

const mockFields = new MockFields();
const mockRendering = new MockRendering('AppCard');

describe('<AppCard>', () => {
  it('should render correctly with all props', async () => {
    const { container } = render(
      <AppCard fields={mockFields} rendering={mockRendering} title="My title" bodyText="My body text" />,
    );

    expect(await axe(container)).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });
});
