import React from 'react';
import { jssRender } from '../../../test-utils';
import CTA from '..';

describe('CTA snapshots', () => {
  it('renders a relative path', () => {
    const fields = {
      typeField: { value: 'Primary' },
      linkField: {
        href: '/relative-path',
        linktype: 'internal',
        text: 'Relative path',
      },
    };

    const { container } = jssRender(<CTA {...fields} />);

    expect(container).toMatchSnapshot();
  });

  it('renders an absolute path', () => {
    const fields = {
      typeField: { value: 'Primary' },
      linkField: {
        href: 'https://example.com',
        linktype: 'external',
        text: 'Absolute path',
      },
    };

    const { container } = jssRender(<CTA {...fields} />);

    expect(container).toMatchSnapshot();
  });

  it('renders a secondary CTA', () => {
    const fields = {
      typeField: { value: 'Secondary' },
      linkField: {
        href: 'https://example.com',
        linktype: 'external',
        text: 'Secondary',
      },
    };

    const { container } = jssRender(<CTA {...fields} />);

    expect(container).toMatchSnapshot();
  });

  it('renders a tertiary CTA', () => {
    const fields = {
      typeField: { value: 'Tertiary' },
      linkField: {
        href: '/relative-path',
        linktype: 'internal',
        text: 'Tertiary',
      },
    };

    const { container } = jssRender(<CTA {...fields} />);

    expect(container).toMatchSnapshot();
  });

  it('renders a tertiary CTA with a named icon', () => {
    const fields = {
      typeField: { value: 'Tertiary' },
      iconName: 'arrowRight',
      linkField: {
        href: '/relative-path',
        linktype: 'internal',
        text: 'Tertiary',
      },
    };

    const { container } = jssRender(<CTA {...fields} />);

    expect(container).toMatchSnapshot();
  });

  it('renders a tertiary CTA with an icon field', () => {
    const fields = {
      typeField: { value: 'Tertiary' },
      iconField: { fields: { value: { value: 'arrowRight' } } },
      linkField: {
        href: '/relative-path',
        linktype: 'internal',
        text: 'Tertiary',
      },
    };

    const { container } = jssRender(<CTA {...fields} />);

    expect(container).toMatchSnapshot();
  });

  it('renders a TertiaryWhite CTA', () => {
    const fields = {
      typeField: { value: 'TertiaryWhite' },
      linkField: {
        href: '/relative-path',
        linktype: 'internal',
        text: 'Tertiary White',
      },
    };

    const { container } = jssRender(<CTA {...fields} />);

    expect(container).toMatchSnapshot();
  });

  it('renders a CTA with other props', () => {
    const fields = {
      typeField: { value: 'Primary' },
      linkField: {
        href: '/relative-path',
        linktype: 'internal',
        text: 'Tertiary',
      },
    };

    const { container } = jssRender(<CTA {...fields} ariaLabel="my aria label" disabled />);

    expect(container).toMatchSnapshot();
  });
});
