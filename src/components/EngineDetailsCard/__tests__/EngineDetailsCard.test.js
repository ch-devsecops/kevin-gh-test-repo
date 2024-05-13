import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import EngineDetailsCard from '..';
import { ENGINE_SITE_NAME } from '../../../utils/constants';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/engine-details-card/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/engine-details-card/empty_en.json');

const mockParams = {
  topMargin: '64',
  bottomMargin: '32',
  horizontalMargin: '16',
};

const sitecoreContextMock = { site: { name: ENGINE_SITE_NAME } };

describe('<EngineDetailsCard>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <EngineDetailsCard {...mockData} />
      </SitecoreContext>,
    );
    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if there is no  fields', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <EngineDetailsCard fields={null} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with no errors when fields props has empty values', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <EngineDetailsCard {...emptyMockData} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
    expect(container.children).toBeTruthy();
  });

  it('should render with no errors when params are present', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <EngineDetailsCard fields={mockData?.fields} params={mockParams} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('it should have no accessibility violations', async () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <EngineDetailsCard {...mockData} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
