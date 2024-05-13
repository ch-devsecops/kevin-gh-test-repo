import React from 'react';
import { Copy, Markdown } from '@honda-canada/design-system-react';
import styled from 'styled-components';
import css from '@styled-system/css';

const StyledMarkdown = ({ children, forceInline = false, ...rest }) => (
  <Markdown
    textAlign="center"
    size="small"
    options={{
      forceInline,
      overrides: {
        div: {
          component: styled(Copy)(
            css({
              width: '100%',
              sup: {
                fontSize: 'min(13px,75%)',
                fontFamily: 'inherit',
              },
              a: {
                fontSize: 'inherit',
              },
            }),
          ),
        },
      },
    }}
    {...rest}
  >
    {children}
  </Markdown>
);

export default StyledMarkdown;
