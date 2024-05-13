import React from 'react';
import { jssRender, cleanup, fireEvent } from 'test-utils';
import ColorDisplay from '..';

const mockData = require('./mockData.test.json');
const routeData = require('../../../../sample-mock-data/routes/color-display/en.json');

const sideNavLayoutData = routeData.placeholders['jss-main'].find(c => c.componentName === 'SideNavLayout');

afterEach(cleanup);

describe('ColorDisplay functionality', () => {
  it('should render unique colours from all trims', () => {
    const { getAllByText } = jssRender(<ColorDisplay fields={mockData.fields} params={{}} />);
    const colourName = getAllByText('Blue');

    expect(colourName.length).toEqual(1);
  });

  it('should render the base trims images for the selected colour, if they exist', () => {
    const { getByAltText } = jssRender(<ColorDisplay fields={mockData.fields} params={{}} />);
    const primaryImage = getByAltText('primary image for base trim blue');
    const secondaryImage = getByAltText('primary image for base trim blue');

    expect(primaryImage).toBeInTheDocument();
    expect(secondaryImage).toBeInTheDocument();
  });

  it('should not render a swatch for a colour with no images', () => {
    const { queryByText } = jssRender(<ColorDisplay fields={mockData.withMissingImages} params={{}} />);
    const colourName = queryByText('Pink');

    expect(colourName).not.toBeInTheDocument();
  });

  it('should render the first available images for the selected colour, if the base trim has no images', () => {
    const { getByAltText } = jssRender(<ColorDisplay fields={mockData.withMissingBaseTrimImages} params={{}} />);
    const primaryImage = getByAltText('primary image for another trim pink');
    const secondaryImage = getByAltText('secondary image for another trim pink');

    expect(primaryImage).toBeInTheDocument();
    expect(secondaryImage).toBeInTheDocument();
  });
});

describe('ColorDisplay snapshots', () => {
  it('renders exterior colour images by default', () => {
    const { container } = jssRender(
      <ColorDisplay {...sideNavLayoutData.placeholders['side-nav-column-right'][0]} params={{}} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders interior colour images on interior tab', () => {
    const { container, getAllByRole } = jssRender(
      <ColorDisplay {...sideNavLayoutData.placeholders['side-nav-column-right'][0]} />,
    );
    const buttons = getAllByRole('button');
    const interiorButton = buttons[1];

    fireEvent.click(interiorButton);

    expect(container).toMatchSnapshot();
  });

  it('renders image for selected swatch', () => {
    const { container, getAllByRole } = jssRender(
      <ColorDisplay {...sideNavLayoutData.placeholders['side-nav-column-right'][0]} params={{}} />,
    );
    const buttons = getAllByRole('button');
    const swatchButton = buttons[2];

    fireEvent.click(swatchButton);

    expect(container).toMatchSnapshot();
  });

  it('renders with empty fields without errors', () => {
    const { container } = jssRender(<ColorDisplay fields={{}} params={{}} />);

    expect(container).toMatchSnapshot();
  });

  it('renders image with max-height for short style type', () => {
    const { container } = jssRender(
      <ColorDisplay {...sideNavLayoutData.placeholders['side-nav-column-right'][0]} params={{ styleType: 'Short' }} />,
    );
    expect(container).toMatchSnapshot();
  });
});
