import React from 'react';
import { axe, cleanup, render, MockRendering, MockFields } from '../../../test-utils';
import HoverCard from '../HoverCard';
import { base, DesktopHoverMock, MobileHoverMock } from '../__mocks__/mockHoverCard';

afterEach(cleanup);

const mockFields = new MockFields();
const mockRendering = new MockRendering('HoverCard');

describe('<HoverCard>', () => {
  it('should render correctly with all props', async () => {
    const { container } = render(
      <HoverCard fields={mockFields} rendering={mockRendering} title="My title" bodyText="My body text" />,
    );

    expect(await axe(container)).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  it('It renders WithMarkdownTitle', async () => {
    const { container } = render(<HoverCard HoverCard {...base} title="## Schedule A Service" />);

    expect(container).toMatchSnapshot();
  });

  it('It renders Desktop HoverCard', async () => {
    const { container } = render(<HoverCard title="My HoveCard Title" desktopImage={<DesktopHoverMock />} />);

    expect(container).toMatchSnapshot();
  });

  it('It renders Mobile HoverCard', async () => {
    const { container } = render(<HoverCard title="My HoveCard Title" mobileImage={<MobileHoverMock />} />);

    expect(container).toMatchSnapshot();
  });
});
