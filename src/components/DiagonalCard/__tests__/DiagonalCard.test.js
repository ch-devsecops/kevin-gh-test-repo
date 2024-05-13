import 'jest-styled-components';
import React from 'react';
import { jssRender, cleanup, MockRendering, MockFields, axe } from 'test-utils';
import DiagonalCard from '../DiagonalCard';

afterEach(cleanup);

const mockFields = new MockFields();
const mockRendering = new MockRendering('DiagonalCard');

describe('<DiagonalCard>', () => {
  const renderMock = () =>
    jssRender(
      <DiagonalCard fields={mockFields} rendering={mockRendering} title="mock-title" bodyText="mock-body-text" />,
    );

  it('should have no accessibility violations', async () => {
    const { container } = renderMock();

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = renderMock();

    expect(container).toMatchSnapshot();
  });

  it('should render provided body text', () => {
    const { container } = renderMock();
    const body = container.querySelector('div:nth-child(2)');

    expect(body).toHaveTextContent('mock-body-text');
  });
});
