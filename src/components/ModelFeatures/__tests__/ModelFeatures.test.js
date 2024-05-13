import React from 'react';
import { axe, cleanup, jssRender, MockRendering } from '../../../test-utils';
import ModelFeatures from '../index';

import { emptyMockData, mockData, mockSitecoreContext } from '../../../stories/ModelFeatures/componentProps';

afterEach(cleanup);

const mockRendering = new MockRendering('ModelFeatures');

describe('<ModelFeatures>', () => {
  it('should return null if there is no fields', () => {
    const { container } = jssRender(<ModelFeatures fields={null} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly for empty fields', () => {
    const { container } = jssRender(<ModelFeatures {...emptyMockData} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with all props', async () => {
    const { container } = jssRender(<ModelFeatures fields={mockData.fields} rendering={mockRendering} />, {
      context: { mockSitecoreContext },
    });

    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<ModelFeatures fields={mockData.fields} rendering={mockRendering} />, {
      context: { mockSitecoreContext },
    });

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
