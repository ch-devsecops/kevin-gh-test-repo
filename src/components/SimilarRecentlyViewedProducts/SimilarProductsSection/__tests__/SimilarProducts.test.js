import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import SimilarProducts from '..';
import getValueByKey from '../../../../utils/getValueByKey';

afterEach(cleanup);

const mockData = require('../../../../../sample-mock-data/routes/similar-products/en.json');

const models = getValueByKey(mockData, 'item');

describe('<SimilarProducts>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<SimilarProducts models={models} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return nulll if there is no  fields', () => {
    const { container } = jssRender(<SimilarProducts models={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<SimilarProducts models={models} />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
