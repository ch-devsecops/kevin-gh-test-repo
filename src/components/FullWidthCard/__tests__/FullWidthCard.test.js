import React from 'react';
import 'jest-styled-components';
import { jssRender, cleanup, MockRendering, MockFields, axe } from 'test-utils';
import FullWidthCard from '../index';

afterEach(cleanup);

const mockFields = new MockFields();
mockFields.add('mediaImage', { value: { src: 'mock.png', alt: 'mock alt' } });
const mockRendering = new MockRendering('FullWidthCard');

describe('<FullWidthCard>', () => {
  const renderMock = () => jssRender(<FullWidthCard fields={mockFields} rendering={mockRendering} />);

  it('should have no accessibility violations', async () => {
    const { container } = renderMock();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = renderMock();
    expect(container).toMatchSnapshot();
  });
});

/* clarification concerning v3.1.0-develop.145:

  at the time of writing this test, the video URL was not utilized
  in any of the FullWidthCard items, thus it was unnecessary to
  test of having it in the mock fields. Should this change in future
  use `add(key,value)` method in MockFields test utility class.
*/
