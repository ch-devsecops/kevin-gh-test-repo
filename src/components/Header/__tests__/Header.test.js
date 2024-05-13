import React from 'react';
import { axe, cleanup, jssRender, MockRendering } from '../../../test-utils';
import Header from '../index';

import { emptyMockData, varian1MockData, mockSitecoreContext } from '../../../stories/Header/componentProps';

afterEach(cleanup);

const mockRendering = new MockRendering('Header');
describe('<Header>', () => {
  it('should return null if there is no fields', () => {
    const { container } = jssRender(<Header fields={null} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly for empty fields', () => {
    const { container } = jssRender(<Header {...emptyMockData} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with all props', async () => {
    const { container } = jssRender(<Header fields={varian1MockData.fields} rendering={mockRendering} />, {
      context: { mockSitecoreContext },
    });

    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<Header fields={varian1MockData.fields} rendering={mockRendering} />, {
      context: { mockSitecoreContext },
    });

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
