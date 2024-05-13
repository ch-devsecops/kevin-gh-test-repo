import React from 'react';
import { jssRender } from 'test-utils';
import Title from '..';

const routeData = require('../../../../sample-mock-data/routes/title/en.json');

describe('Title snapshots', () => {
  it('renders correct colours with blue background', () => {
    const { container } = jssRender(<Title {...routeData.placeholders['jss-main'][0]} />);

    expect(container).toMatchSnapshot();
  });

  it('renders correct colours with black background', () => {
    const { container } = jssRender(<Title {...routeData.placeholders['jss-main'][1]} />);

    expect(container).toMatchSnapshot();
  });

  it('renders correct colours with red background', () => {
    const { container } = jssRender(<Title {...routeData.placeholders['jss-main'][2]} />);

    expect(container).toMatchSnapshot();
  });

  it('renders correct colours with white background', () => {
    const { container } = jssRender(<Title {...routeData.placeholders['jss-main'][3]} />);

    expect(container).toMatchSnapshot();
  });

  it('renders correct colours with honda black background', () => {
    const { container } = jssRender(<Title {...routeData.placeholders['jss-main'][4]} />);

    expect(container).toMatchSnapshot();
  });

  it('renders with one CTA', () => {
    const { container } = jssRender(<Title {...routeData.placeholders['jss-main'][5]} />);

    expect(container).toMatchSnapshot();
  });

  it('renders with the specified bottomPadding and topPadding', () => {
    const { container } = jssRender(<Title {...routeData.placeholders['jss-main'][6]} />);

    expect(container).toMatchSnapshot();
  });

  it('renders with tertiary CTAs with cta icons', () => {
    const { container } = jssRender(<Title {...routeData.placeholders['jss-main'][7]} />);

    expect(container).toMatchSnapshot();
  });

  it('renders white tertiary CTAs when the background color is dark', () => {
    const { container } = jssRender(<Title {...routeData.placeholders['jss-main'][8]} />);

    expect(container).toMatchSnapshot();
  });
});
