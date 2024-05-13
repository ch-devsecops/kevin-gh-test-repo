import React from 'react';
import { jssRender, axe } from 'test-utils';
import Footer from '../index';

const routeData = require('../../../../sample-mock-data/routes/footer/en.json');
const emptyData = require('../../../../sample-mock-data/routes/footer/empty_en.json');

describe('<Footer>', () => {
  it('should render correctly', () => {
    const { container } = jssRender(<Footer {...routeData.placeholders['jss-footer'][0]} />);

    expect(container).toMatchSnapshot();
    expect(container.children).toBeTruthy();
  });

  test('should return null if there is no  fields', () => {
    const { container } = jssRender(<Footer fields={null} />);

    expect(container).toMatchSnapshot();
  });

  it('should render even if there are empty values', () => {
    const { container } = jssRender(<Footer {...emptyData.placeholders['jss-footer'][0]} />);

    expect(container).toMatchSnapshot();
    expect(container.children).toBeTruthy();
  });

  it('should not have accessibility violations', async () => {
    const { container } = jssRender(<Footer {...routeData.placeholders['jss-footer'][0]} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
