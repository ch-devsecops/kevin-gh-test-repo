import React from 'react';
import { axe, cleanup, fireEvent, jssRender } from 'test-utils';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react';
import ProductDetailsCard from '..';
import { ENGINE_SITE_NAME } from '../../../utils/constants';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/product-details-card/en.json');

const sitecoreContextMock = { site: { name: ENGINE_SITE_NAME } };

describe('<ProductDetailsCard>', () => {
  it('should render correctly', () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ProductDetailsCard {...mockData} />
      </SitecoreContext>,
    );

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    const { container } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ProductDetailsCard {...mockData} />
      </SitecoreContext>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render buttons with correct attributes and correct functionality', async () => {
    const { getAllByTestId, getAllByRole } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ProductDetailsCard {...mockData} />
      </SitecoreContext>,
    );

    const findDistributor = getAllByRole('link')[0];
    let compareEngine = getAllByTestId('secondary-button')[0];

    expect(findDistributor).not.toHaveAttribute('disabled');
    expect(findDistributor).toHaveAttribute('href', 'Shared.Common.dealersPageUrl');

    expect(compareEngine).not.toHaveAttribute('disabled');
    expect(compareEngine).toHaveTextContent('Shared.Common.addToCompareButton');
    await fireEvent.click(compareEngine);
    compareEngine = getAllByTestId('secondary-button')[0];
    expect(compareEngine).toHaveTextContent('Shared.Common.removeFromCompareButton');
  });

  it('should render with correct margins coming from sitecore', () => {
    const { queryByTestId } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ProductDetailsCard {...mockData} />
      </SitecoreContext>,
    );
    const container = queryByTestId('container');
    expect(container).toHaveStyle('margin-top:20px');
    expect(container).toHaveStyle('margin-bottom:30px');
    expect(container).toHaveStyle('margin-left:40px');
    expect(container).toHaveStyle('margin-right:40px');
  });

  it('should render with default margins when no margins coming from sitecore', () => {
    const { queryByTestId } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ProductDetailsCard {...{ ...mockData, margins: {} }} />
      </SitecoreContext>,
    );
    const container = queryByTestId('container');
    expect(container).toHaveStyle('margin-top:l');
    expect(container).toHaveStyle('margin-bottom:l');
    expect(container).toHaveStyle('margin-left:10px');
    expect(container).toHaveStyle('margin-right:10px');
  });

  it('should have gtm tags with correct data', async () => {
    const { container, getAllByTestId, getAllByRole } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ProductDetailsCard {...mockData} />
      </SitecoreContext>,
    );

    const findDistributor = getAllByRole('link')[0];
    const compareEngine = getAllByTestId('secondary-button')[0];

    expect(container.firstChild).toHaveAttribute('data-gtm-component-type', 'EngineDetailsCard');
    expect(findDistributor).toHaveAttribute('data-gtm-interaction-type', 'find distributor');
    expect(findDistributor).toHaveAttribute('data-gtm-title', 'Find a distributor');
    expect(findDistributor).toHaveAttribute('data-gtm-body-style', 'HorizontalCrankshaft');
    expect(findDistributor).toHaveAttribute('data-gtm-model', 'GX Series');
    expect(findDistributor).toHaveAttribute('data-gtm-trim', 'GX100');

    expect(compareEngine).toHaveAttribute('data-gtm-interaction-type', 'comparison results');
    expect(compareEngine).toHaveAttribute('data-gtm-title', 'item added');
    expect(compareEngine).toHaveAttribute('data-gtm-body-style', 'HorizontalCrankshaft');
    expect(compareEngine).toHaveAttribute('data-gtm-model', 'GX Series');
    expect(compareEngine).toHaveAttribute('data-gtm-trim', 'GX100');
  });

  it('should not have tags when no tags data provided', async () => {
    const { container, getAllByTestId, getAllByRole } = jssRender(
      <SitecoreContext context={sitecoreContextMock} componentFactory={{}}>
        <ProductDetailsCard {...{ ...mockData, gtmTags: {} }} />
      </SitecoreContext>,
    );

    const findDistributor = getAllByRole('link')[0];
    const compareEngine = getAllByTestId('secondary-button')[0];

    expect(container.firstChild).not.toHaveAttribute('data-gtm-component-type', 'EngineDetailsCard');
    expect(findDistributor).not.toHaveAttribute('data-gtm-interaction-type');
    expect(findDistributor).not.toHaveAttribute('data-gtm-title');
    expect(findDistributor).not.toHaveAttribute('data-gtm-body-style');
    expect(findDistributor).not.toHaveAttribute('data-gtm-model');
    expect(findDistributor).not.toHaveAttribute('data-gtm-trim');

    expect(compareEngine).not.toHaveAttribute('data-gtm-interaction-type');
    expect(compareEngine).not.toHaveAttribute('data-gtm-title');
    expect(compareEngine).not.toHaveAttribute('data-gtm-body-style');
    expect(compareEngine).not.toHaveAttribute('data-gtm-model');
    expect(compareEngine).not.toHaveAttribute('data-gtm-trim');
  });
});
