import React from 'react';
import { axe, cleanup, render, MockRendering, MockFields } from '../../../test-utils';
import { ImageMock, CTAMocks } from '../__mocks__/mockIconCard';
import IconCard from '../IconCard';

afterEach(cleanup);

const mockFields = new MockFields();
const mockRendering = new MockRendering('DiagonalCard');

describe('<IconCard>', () => {
  it('should render correctly with all props', async () => {
    const { container } = render(
      <IconCard fields={mockFields} rendering={mockRendering} title="My title" bodyText="My body text" />,
    );

    expect(await axe(container)).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  it('It renders body text without Icon', async () => {
    const { container } = render(
      <IconCard
        title="Quick Start Guide"
        backgroundColor="grey.5"
        hasDivider
        bodyText="Stop and exchange information."
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('It renders body text without CTA', async () => {
    const { container } = render(
      <IconCard
        title="Quick Start Guide"
        backgroundColor="grey.5"
        bodyText="Stop and exchange information."
        icon={<ImageMock />}
        hasDivider
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('It renders CTAs without body text', async () => {
    const { container } = render(
      <IconCard title="Quick Start Guide" backgroundColor="grey.5" icon={<ImageMock />} ctas={CTAMocks} />,
    );

    expect(container).toMatchSnapshot();
  });
});
