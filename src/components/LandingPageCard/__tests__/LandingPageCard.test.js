import 'jest-styled-components';
import React from 'react';
import { jssRender, cleanup, within, MockRendering, MockFields, axe } from 'test-utils';
import LandingPageCard from '../index';

afterEach(cleanup);

const mockFields = new MockFields();
const mockRendering = new MockRendering('LandingPageCard');

describe('<LandingPageCard>', () => {
  const renderMock = () => jssRender(<LandingPageCard fields={mockFields} rendering={mockRendering} />);

  it('should have no accessibility violations', async () => {
    const { container } = renderMock();

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should map title and bodyText', () => {
    const { container, queryByText } = renderMock();
    const H3 = container.querySelector('h3');
    const title = within(H3).queryByText(mockFields.title.value);

    expect(title).toBeInTheDocument();
    expect(queryByText(mockFields.bodyText.value)).toBeInTheDocument();
  });

  it('should map image', () => {
    const { container } = renderMock();
    const image = container.querySelector('img');

    expect(image).toHaveAttribute('src', 'mock.png');
    expect(image).toHaveAttribute('alt', 'mock alt');
  });

  it('should map gtm fields and anchor id', () => {
    const { queryAllByTestId, container } = renderMock();
    const component = queryAllByTestId(mockRendering.componentName)[0];
    const cta = container.querySelector('a');

    expect(cta).toHaveAttribute('data-gtm-title', 'gtm title');
    expect(component).toHaveAttribute('data-gtm-component-type', 'LandingPageCard');
    expect(component).toHaveAttribute('data-gtm-category', 'Others');
    expect(component).toHaveAttribute('id', 'anchor-id');
  });

  it('should map cta fields', () => {
    const { queryByText } = renderMock();
    const cta = queryByText('CTA Text');

    expect(cta).toHaveAttribute('href', 'www.source.ca');
    expect(cta).toHaveAttribute('title', 'cta aria label');
  });
});
