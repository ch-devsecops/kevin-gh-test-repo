import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import CarouselWithModalContainer from '..';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/carousel-with-modal-container/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/carousel-with-modal-container/empty_en.json');

const mockParams = { containerBottomMargin: '32', containerTopMargin: '32', cntnrHorizontalMargin: '12' };

describe('<CarouselWithModalContainer>', () => {
  it('should render correctly', () => {
    const { container } = jssRender(<CarouselWithModalContainer fields={mockData?.fields} params={mockData?.params} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  it('should return null if there is no fields', () => {
    const { container } = jssRender(
      <CarouselWithModalContainer fields={emptyMockData?.fields} params={emptyMockData?.params} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with no errors when params are present', () => {
    const { container } = jssRender(<CarouselWithModalContainer fields={mockData?.fields} params={mockParams} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    const { container } = jssRender(<CarouselWithModalContainer fields={mockData?.fields} params={mockData?.params} />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
