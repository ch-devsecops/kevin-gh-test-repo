import React from 'react';
import { jssRender, cleanup, axe, fireEvent } from 'test-utils';
import Accordion from '../index';
import Panel from '../../AccordionItem/Panel';

afterEach(cleanup);

const mockData = require('../../../../sample-mock-data/routes/generic-accordion/en.json');
const emptyMockData = require('../../../../sample-mock-data/routes/generic-accordion/empty_en.json');

const mockActivateTab = jest.fn();

describe('<Accordion>', () => {
  const renderMock = (title, id, activeTabs, children) =>
    jssRender(
      <Panel
        activeTabs={activeTabs}
        setActiveTabs={mockActivateTab}
        title={title}
        activateTab={mockActivateTab}
        id={id}
      >
        {children}
      </Panel>,
    );

  const renderMockAcc = (rendering, params) =>
    jssRender(
      <Accordion
        rendering={rendering}
        params={params}
        fields={mockData.fields?.showExpandCollapseControl?.value}
        {...mockData}
      />,
    );

  test('should render with params', () => {
    const { container } = jssRender(<Accordion params={mockData.params} {...mockData} />);
    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });

  test('should return null if the content array is empty', () => {
    const { container } = jssRender(<Accordion rendering={emptyMockData} />);
    expect(container).toMatchSnapshot();
  });

  test('should have no accessibility violations', async () => {
    const { container } = jssRender(<Accordion {...mockData} />);
    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });

  test('should expand and show accordion item', () => {
    const { getByTestId } = renderMock();
    const accordionItem = getByTestId('accordion');
    fireEvent.click(accordionItem);
    expect(mockActivateTab).toBeCalled();
  });

  test('should render Expand All button', () => {
    const { getByTestId } = renderMockAcc();
    const ExpandTitle = getByTestId('expand-all');
    expect(ExpandTitle).toBeInTheDocument();
  });

  test('should expand all accordion item', () => {
    const { getByTestId, getAllByTestId } = renderMockAcc();
    const ExpandTitle = getByTestId('expand-all');
    fireEvent.click(ExpandTitle);
    const ExpandedItems = getAllByTestId('accordion-content');
    expect(ExpandedItems).toHaveLength(3);
  });
});
