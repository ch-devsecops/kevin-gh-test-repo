import React from 'react';
import { jssRender } from 'test-utils';
import FutureVehicleCard from './index';

const routeData = require('../../../sample-mock-data/routes/future-vehicle-card/en.json');

const props = routeData.placeholders['jss-main'][0];

describe('<FutureVehicleCard>', () => {
  it('should render without errors', () => {
    const { container } = jssRender(<FutureVehicleCard {...props} />);

    expect(container).toMatchSnapshot();
  });
});
