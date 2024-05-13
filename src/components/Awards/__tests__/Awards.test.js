import React from 'react';
import { jssRender, cleanup, within, MockFields } from 'test-utils';
import Awards from '..';

const awardNoImage = {
  name: 'award1',
  displayName: 'award1',
};

const award = {
  name: 'award1',
  displayName: 'award1',
  fields: {
    image: {
      value: {
        src: '/data/media/img/awards/2021-TSPplus_box.png?h=97&w=180&hash=D9DE0E3BF911E40249ADE4CF8DAC40E3',
        alt: '',
        width: '140',
        height: '75',
      },
    },
    description: {
      value: 'Top Safety Pick<br> Small Cars<br> 4 Door Hatchbacks',
    },
  },
};

afterEach(cleanup);

describe('<Awards>', () => {
  it('should render title when provided', () => {
    const mockFields = new MockFields();
    mockFields.add('items', [award, award, award, award]);

    const renderMock = () => jssRender(<Awards fields={mockFields} />);

    const { container } = renderMock();
    const H4 = container.querySelector('h4');
    const title = within(H4).queryByText(mockFields.contentTitle.value);

    expect(title).toBeInTheDocument();
  });

  it('should render no title when null', () => {
    const mockFields = new MockFields();
    const titleValue = mockFields.contentTitle.value;
    mockFields.add('items', [award, award, award, award]);
    mockFields.contentTitle.value = '';

    const { queryByText } = jssRender(<Awards fields={mockFields} />);

    expect(queryByText(titleValue)).not.toBeInTheDocument();
  });

  it('should render 4 awards', () => {
    const mockFields = new MockFields();
    mockFields.add('items', [award, award, award, award]);

    const renderMock = () => jssRender(<Awards fields={mockFields} />);

    const { container } = renderMock();
    const lastImage = container.querySelectorAll('img')[3];

    expect(lastImage.src).not.toBeNull();
  });

  it('should render 3 awards', () => {
    const mockFields = new MockFields();
    mockFields.add('items', [award, award, award]);

    const renderMock = () => jssRender(<Awards fields={mockFields} />);

    const { container } = renderMock();
    const lastImage = container.querySelectorAll('img')[2];
    expect(lastImage.src).not.toBeNull();
  });

  it('should render no awards when no images are provided', () => {
    const mockFields = new MockFields();
    mockFields.add('items', [awardNoImage, awardNoImage, awardNoImage]);
    const renderMock = () => jssRender(<Awards fields={mockFields} />);

    const { container } = renderMock();
    const image = container.querySelectorAll('img')[0];
    expect(image).toBeUndefined();
  });
});
