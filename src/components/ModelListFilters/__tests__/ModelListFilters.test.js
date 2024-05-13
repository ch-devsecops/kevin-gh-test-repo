import React from 'react';
import { cleanup } from '@testing-library/react';
import { jssRender } from 'test-utils';
import ModelListFilters from '..';

const routeData = require('../../../../sample-mock-data/routes/model-list-filters/en.json');

afterEach(cleanup);

describe('ModelListFilters snapshots', () => {
  it('renders provided filter categories based on route data', () => {
    const { container } = jssRender(
      <ModelListFilters {...routeData.placeholders['jss-main'][0].placeholders['side-nav-column-left'][0]} />,
    );

    expect(container).toMatchSnapshot();
  });
});
