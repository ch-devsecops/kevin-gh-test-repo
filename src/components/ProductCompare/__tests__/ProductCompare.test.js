import 'jest-styled-components';
import React from 'react';
import { axe, cleanup, jssRender, MockRendering } from 'test-utils';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import engineMockData from '../../../../sample-mock-data/routes/engine-compare/en.json';
import pspMockData from '../../../../sample-mock-data/routes/psp-compare-product/en.json';
import { ENGINE_SITE_NAME, PSP_SITE_NAME } from '../../../utils/constants';
import CompareProducts from '../../CompareProducts';

afterEach(cleanup);

describe('<ProductCompare>', () => {
  const renderMock = (siteName, componentName, mockFields) => {
    const mockRendering = new MockRendering(componentName);
    const contextMock = {
      language: 'en',
      site: {
        name: siteName,
      },
      pageState: 'normal',
      hondaRestApiHost: 'uat-api.honda.ca',
    };
    return jssRender(
      <SitecoreContext context={contextMock} componentFactory={{}}>
        <CompareProducts fields={mockFields} rendering={mockRendering} />
      </SitecoreContext>,
    );
  };

  it('should render Engine product compare without errors', async () => {
    const { container } = renderMock(ENGINE_SITE_NAME, 'EngineCompare', engineMockData?.fields);

    expect(container).toMatchSnapshot();
  });

  it('Engine product compare should have no accessibility violations', async () => {
    const { container } = renderMock(ENGINE_SITE_NAME, 'EngineCompare', engineMockData?.fields);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render PSP product compare without errors', async () => {
    const { container } = renderMock(PSP_SITE_NAME, 'PSPCompare', pspMockData?.fields);

    expect(container).toMatchSnapshot();
  });

  it('PSP product compare should have no accessibility violations', async () => {
    const { container } = renderMock(PSP_SITE_NAME, 'PSPCompare', pspMockData?.fields);
    expect(await axe(container)).toHaveNoViolations();
  });
});
