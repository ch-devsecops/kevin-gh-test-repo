import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import InfoCard from '../InfoCard';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/carousel-with-modal-container/en.json');

const mockFields = mockData?.fields?.items[0];

describe('<InfoCard>', () => {
  it('should render correctly', () => {
    const { container } = jssRender(<InfoCard fields={mockFields?.fields} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  it('should return null if there is no fields', () => {
    const { container } = jssRender(<InfoCard fields={null} />);

    expect(container).toMatchSnapshot();
    expect(container.firstChild).toBeNull();
  });

  it('should have no accessibility violations', async () => {
    const { container } = jssRender(<InfoCard fields={mockFields?.fields} />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
