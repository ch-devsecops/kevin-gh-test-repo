import React from 'react';
import { jssRender, cleanup, axe } from 'test-utils';

import mockData from '../../../../sample-mock-data/routes/table-style-2/en.json';
import emptyMock from '../../../../sample-mock-data/routes/table-style-2/emptyMock.json';
import TableJSS from '../index';

afterEach(cleanup);

describe('<TableJSS>', () => {
  it('should render correctly', async () => {
    const { container } = jssRender(<TableJSS {...mockData} />);
    expect(container).toMatchSnapshot();
  });

  it('should return null if the content fields is empty', () => {
    const { container } = jssRender(<TableJSS {...emptyMock} />);
    expect(container).toMatchSnapshot();
  });

  it('should have no accessibility violations', async () => {
    const { container } = jssRender(<TableJSS {...mockData} />);
    expect(container).toMatchSnapshot();
    expect(await axe(container)).toHaveNoViolations();
  });
});
