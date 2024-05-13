import React from 'react';
import { jssRender } from 'test-utils';
import FreeFormText from './index';

const routeData = require('../../../sample-mock-data/routes/free-form-text/en.json');

const props = routeData.placeholders['jss-main'][0];

describe('<FreeFormText>', () => {
  it('should render without errors', () => {
    const { container } = jssRender(<FreeFormText {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should render with center-aligned content', () => {
    const { container } = jssRender(<FreeFormText {...props} params={{ contentAlignment: 'Center' }} />);

    expect(container).toMatchSnapshot();
  });

  it('should render with an seoH1 value of "Description"', () => {
    const { container } = jssRender(
      <FreeFormText {...props} fields={{ ...props.fields, seoH1: { value: 'Description' } }} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with an seoH1 value of "Subtitle"', () => {
    const { container } = jssRender(
      <FreeFormText {...props} fields={{ ...props.fields, seoH1: { value: 'Subtitle' } }} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should apply topMargin and bottomMargin params', () => {
    const { container } = jssRender(<FreeFormText {...props} params={{ topMargin: 96, bottomMargin: 10 }} />);

    expect(container).toMatchSnapshot();
  });

  it('should apply 3/4 width params', () => {
    const { container } = jssRender(<FreeFormText {...props} params={{ isReducedWidth: true }} />);

    expect(container).toMatchSnapshot();
  });
});
