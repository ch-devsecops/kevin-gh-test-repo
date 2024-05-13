import 'jest-styled-components';
import React from 'react';
import { jssRender, cleanup, within, MockFields, MockRendering, MockTheme } from 'test-utils';
import SectionContainer from '../index';

const mockFields = new MockFields();

const mockRendering = new MockRendering('SectionContainer');
mockRendering.add('placeholders', { 'section-content': [] });

const mockParams = { bgColour: 'Grey' };

afterEach(cleanup);

describe('<SectionContainer>', () => {
  const renderMock = () =>
    jssRender(<SectionContainer fields={mockFields} rendering={mockRendering} params={mockParams} />);

  it('should render title and subtitle', () => {
    const { container, queryByText } = renderMock();

    const h2 = container.querySelector('h2');
    const title = within(h2).queryByText(mockFields.contentTitle.value);
    expect(title).toBeInTheDocument();
    expect(queryByText(mockFields.subtitle.value)).toBeInTheDocument();
  });

  it('should render title as seoH1', () => {
    mockFields.seoH1.value = 'Title';
    const { container } = renderMock();

    const h1 = container.querySelector('h1');
    const title = within(h1).queryByText(mockFields.contentTitle.value);
    expect(title).toBeInTheDocument();
  });

  it('should render subtitle as seoH1', () => {
    mockFields.seoH1.value = 'Subtitle';
    const { container } = renderMock();

    const h1 = container.querySelector('h1');
    const subtitle = within(h1).queryByText(mockFields.subtitle.value);
    expect(subtitle).toBeInTheDocument();

    const h2 = container.querySelector('h2');
    const title = within(h2).queryByText(mockFields.contentTitle.value);
    expect(title).toBeInTheDocument();
  });

  it('should render default title heading', () => {
    mockFields.seoH1.value = '';
    const { container } = renderMock();

    const h2 = container.querySelector('h2');
    const title = within(h2).queryByText(mockFields.contentTitle.value);
    expect(title).toBeInTheDocument();
  });

  it('should render grey background', () => {
    const { colors } = MockTheme;
    const { container } = jssRender(
      <SectionContainer fields={mockFields} rendering={mockRendering} params={mockParams} />,
    );

    const section = container.querySelector('section');
    expect(section).toHaveStyleRule('background-color', colors.grey[5]);
  });
});
