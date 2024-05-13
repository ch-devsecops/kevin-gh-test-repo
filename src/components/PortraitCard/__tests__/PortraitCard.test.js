import React from 'react';
import { axe, cleanup, render } from '../../../test-utils';
import PortraitCard from '../PortraitCard';

afterEach(cleanup);

describe('<PortraitCard>', () => {
  it('should render correctly with basic props', async () => {
    const { container } = render(
      <PortraitCard
        title="The title"
        bodyText="My body text"
        // eslint-disable-next-line react/jsx-key
        ctas={[<a href="https://example.com">CTA</a>]}
        image={<img src="https://via.placeholder.com/294x195" alt="mock alt" />}
        toolTip="The tool tip"
      />,
    );

    expect(await axe(container)).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });
});
