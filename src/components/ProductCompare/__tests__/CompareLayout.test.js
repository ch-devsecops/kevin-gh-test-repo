import 'jest-styled-components';
import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import CompareLayout from '../CompareLayout';
import mockData from '../../../../sample-mock-data/routes/engine-compare/en.json';

afterEach(cleanup);

const engineSeries = mockData?.fields?.data?.item?.series;


describe.skip('<CompareLayout>', () => {
  const renderMock = () => jssRender(<CompareLayout catalogData={engineSeries} selectedModels={[]} />);

  it('should render without errors if there is no data', () => {
    const { container } = jssRender(<CompareLayout catalogData={{}} selectedModels={[]} />);

    expect(container).toMatchSnapshot();
  });

  it('should have no accessibility violations', async () => {
    const { container } = renderMock();

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders without errors', async () => {
    const { container } = renderMock();

    expect(container).toMatchSnapshot();
  });
});
