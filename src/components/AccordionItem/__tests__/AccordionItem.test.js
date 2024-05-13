import React from 'react';
import { axe, cleanup, jssRender } from 'test-utils';
import AccordionItem from '..';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/accordion-item/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/accordion-item/empty_en.json');

describe('<AccordionItem>', () => {
  test('should render correctly', () => {
    const { container } = jssRender(<AccordionItem {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<AccordionItem fields={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should return null if the data is empty', () => {
    const { container } = jssRender(<AccordionItem {...emptyMockData} />);
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const renderingMock = {
      fields: {
        title: {
          value: 'Western and Pacific Canada',
        },
      },
    };
    const { container } = jssRender(<AccordionItem {...mockData} rendering={renderingMock} />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
