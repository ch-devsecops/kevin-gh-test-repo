import { axe, cleanup, jssRender } from 'test-utils';

import React from 'react';
import RoutableSitecoreLink from '../index';

const mockFields = [
  {
    value: {
      linktype: '',
      href: 'hello',
      title: 'test link',
      text: 'Click me',
    },
  },
  {
    editable: false,
    value: {
      linktype: 'internal',
      href: 'hello',
      title: 'test link',
      text: 'Click me',
    },
  },
];

afterEach(cleanup);

describe('<JssLink>', () => {
  const renderMock = field => jssRender(<RoutableSitecoreLink field={field} />);

  mockFields.forEach(field => {
    test('should render correctly', () => {
      const { container } = renderMock(field);

      expect(container).toMatchSnapshot();
    });

    test('should have no accessibility violations', async () => {
      const { container } = renderMock(field);

      expect(await axe(container)).toHaveNoViolations();
      expect(container).toMatchSnapshot();
    });

    test('should render <a> element with href and Click me text', async () => {
      const { getByText, getByRole } = renderMock(field);

      expect(getByText('Click me')).toBeInTheDocument();
      expect(getByRole('link', { current: false }));
    });
  });

  test('should return null if there is no fields', () => {
    const { container } = jssRender(<RoutableSitecoreLink field={null} />);

    expect(container).toMatchSnapshot();
  });

  test('should render even if there are empty fields', () => {
    const { container } = jssRender(<RoutableSitecoreLink field={{ value: {} }} />);

    expect(container).toMatchSnapshot();
  });
});
