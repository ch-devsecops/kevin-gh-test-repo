import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import ProductFeaturesContainer from '../ProductFeaturesContainer';
import featuresStrToArray from '../utils';
import { inputRequest, outputObject, outputObjectWithAccordion } from '../__mocks__/mockData';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/product-features/en.json');

describe('Test function featuresStrToArray', () => {
  test('transpiles TextFeatures string w/o Accordion', () => {
    const value = featuresStrToArray(inputRequest());
    expect(value).toEqual(outputObject);
  });
  test('transpiles TextFeatures string with Accordion', () => {
    const value = featuresStrToArray(inputRequest(true));
    expect(value).toEqual(outputObjectWithAccordion);
  });
});

describe('<ProductFeaturesContainer>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<ProductFeaturesContainer features={mockData.fields.mappedFeat} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<ProductFeaturesContainer features={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should render even if there are empty fields', () => {
    const { container } = jssRender(<ProductFeaturesContainer features={[]} />);

    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<ProductFeaturesContainer features={mockData.fields.mappedFeat} />);

    expect(await axe(container)).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });
});
