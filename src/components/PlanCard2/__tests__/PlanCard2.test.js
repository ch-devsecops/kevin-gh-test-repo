import React from 'react';
import { cleanup } from '@testing-library/react';
import { jssRender } from 'test-utils';
import PlanCard2Wrapper from '..';

afterEach(cleanup);

const mockFields = {
  anchorId: 'something',
  title: 'Regular heading',
  bodyText:
    'Markdown enabled - Sed a maximus tellus. Ut vel ullamcorper tellus. Nulla ut mi vitae nunc pellentesque **mattis**. Lorem ip sum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque ex at felis condimentum imperdiet.',
  items: [
    {
      title: 'Regular item heading 1',
      bodyText:
        'Markdown enabled - Sed a maximus tellus. Ut vel ullamcorper tellus. Nulla ut mi vitae nunc pellentesque **mattis*',
    },
    {
      title: 'Regular item heading 2',
      bodyText:
        'Markdown enabled - Sed a maximus tellus. Ut vel ullamcorper tellus. Nulla ut mi vitae nunc pellentesque **mattis*.Ut vel ullamcorper tellus. Nulla ut mi vitae nunc pellentesque **mattis*. Lorem ip sum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque ex at felis condimentum imperdiet.',
    },
    {
      title: 'Regular item heading 3',
      bodyText:
        'Markdown enabled - Sed a maximus tellus. Ut vel ullamcorper tellus. Nulla ut mi vitae nunc pellentesque **mattis*.Ut vel ullamcorper tellus. Nulla ut mi vitae nunc pellentesque **mattis*',
    },
  ],
  gtmTags: {
    type: 'PlanCard2',
    category: 'Others',
  },
};

describe('PlanCard2 snapshot', () => {
  it('renders correctly', () => {
    const { container } = jssRender(<PlanCard2Wrapper fields={mockFields} />);

    expect(container).toMatchSnapshot();
    expect(container.children[0]).toBeTruthy();
  });
});
