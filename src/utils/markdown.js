import { Copy, H1, H2, H3, H4, H5, H6, Link } from '@honda-canada/design-system-react';
import { compiler } from 'markdown-to-jsx';

export const stripMarkdownHeading = (str = '') => {
  if (typeof str !== 'string') return str;

  const ALL_HASHES_BUT_QUOTED_PATTERN = /#(?=(?:[^"']*["'][^"']*["'])*[^"']*$)/g;
  return str.replace(ALL_HASHES_BUT_QUOTED_PATTERN, '');
};

export const getTitleComponent = (str = '', defaultHeader) => {
  if (str.match(/^#######/)) {
    console.warn(`No heading component available for "${str}"`);
    return defaultHeader || Copy;
  }

  if (str.match(/^######/)) return H6;
  if (str.match(/^#####/)) return H5;
  if (str.match(/^####/)) return H4;
  if (str.match(/^###/)) return H3;
  if (str.match(/^##/)) return H2;
  if ((str.indexOf('#') < 0 && !defaultHeader) || str.match(/^#/)) return H1;

  return defaultHeader || Copy;
};

export const styledCompiler = (children, overrides = {}) =>
  compiler(children, {
    overrides: {
      a: {
        component: Link,
        props: {
          color: 'primary',
          disableHover: true,
          fontSize: 'inherit',
        },
      },
      p: {
        component: Copy,
        props: {
          fontSize: 'inherit',
        },
      },
      ...overrides,
    },
  });

export const stripMarkdown = text => {
  const regex = /(<([^>]+)>)/gi;
  if (typeof text !== 'string') return text;
  return text.replace(regex, '');
};
