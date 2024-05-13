import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';
import ModalCard from '../ModalCard';

afterEach(cleanup);

const mockData = {
  title: 'Modal Title',
  bodyText: 'Modal body text',
  image: {
    src: './sample-mock-data/media/img/placeholders/placeholder-landscape.png',
    alt: 'Unsplash image',
  },
};

describe('<ModalCard>', () => {
  it('should render correctly', () => {
    const { container } = jssRender(<ModalCard {...mockData} />);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with empty props', () => {
    const { container } = jssRender(<ModalCard />);

    expect(container).toMatchSnapshot();
  });

  it('should have no accessibility violations', async () => {
    const { container } = jssRender(<ModalCard {...mockData} />);

    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
