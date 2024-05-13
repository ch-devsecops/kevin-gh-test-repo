import 'jest-styled-components';
import React from 'react';
import { jssRender, fireEvent, cleanup, MockRendering, MockFields } from 'test-utils';
import CollapsibleContainer from '../index';

afterEach(cleanup);

const mockFields = new MockFields();
mockFields.add('expandLabel', { value: 'Expand' });
mockFields.add('collapseLabel', { value: 'Collapse' });

const { expandLabel, collapseLabel } = mockFields;

const mockRendering = new MockRendering('CollapsibleContainer');
mockRendering.add('placeholders', { 'collapsible-container-content': [] });

describe('<CollapsibleContainer> functionality', () => {
  test('should change cta label when clicked', () => {
    const { queryByText } = jssRender(
      <CollapsibleContainer rendering={mockRendering} fields={mockFields} params={{}} />,
    );

    // expand to collapse
    fireEvent.click(queryByText(expandLabel.value));
    expect(queryByText(expandLabel.value)).not.toBeInTheDocument();
    expect(queryByText(collapseLabel.value)).toBeInTheDocument();

    // collapse to expand
    fireEvent.click(queryByText(collapseLabel.value));
    expect(queryByText(expandLabel.value)).toBeInTheDocument();
    expect(queryByText(collapseLabel.value)).not.toBeInTheDocument();
  });
});
